/* eslint-disable no-console */
import { NextApiRequest, NextApiResponse } from 'next'
// import { Passport } from '@gitcoinco/passport-sdk-types'
// import { PassportReader } from '@gitcoinco/passport-sdk-reader'

import { db, TABLE, TABLES, getUserId } from 'utils/db'
import { GENERIC_ERROR_MESSAGE } from 'constants/index'
import { NUMBER_OF_STAMP_REQUIRED, PASSPORT_COMMUNITY_ID } from 'constants/passport'
// import { filterValidStamps } from 'utils/passport'
import { trackBE } from 'utils/mixpanel'
// import axios from 'axios'
import { PassportResponseSchema, fetchPassport, submitPassport } from 'utils/passport_lib'

// const reader = new PassportReader(CERAMIC_PASSPORT, '1')

const REQUIRED_PASSPORT_SCORE = 20

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  const DEV_SECRET = process.env.DEV_SECRET
  const param =
    DEV_SECRET && req.query?.dev === DEV_SECRET ? req.query : req.body
  const { address, embed, isProfile } = param

  if (!address || typeof address === 'object')
    return res.status(400).json({ error: 'Wrong params' })

  console.log('address', address)

  const isBot =
    req.headers['user-agent'].includes('python') ||
    req.headers['user-agent'].includes('curl') ||
    false
  console.log('isBot', isBot)

  const userId = await getUserId(address, embed, isBot)
  console.log(userId)
  if (!(userId && Number.isInteger(userId)))
    return res.status(403).json({ error: 'userId not found' })

  const [user] = await db(TABLES.users)
    .select('sybil_user_id')
    .where('address', 'ilike', `%${address}%`)

  // TODO: make this dynamic
  type SybilCheckTypes = 'GITCOIN_PASSPORT' | '35kBANK'
  const SYBIL_CHECK: SybilCheckTypes = 'GITCOIN_PASSPORT'

  const requirement = `At least ${NUMBER_OF_STAMP_REQUIRED} Gitcoin Passport stamps`
  let gitcoinPassportScore = 0
  // TEMP: bypass passport check (accounts having issues with Ceramic API)
  const TEMP_PASSPORT_WHITELIST = [
    // '0xda1d8a345Fc6934Da60E81b392F485cbfd350eaE'.toLowerCase(),
    '0x1EC1CcEF3e1735bdA3F4BA698e8a524AA7c93274'.toLowerCase(),
    '0x5B1899D88b4Ff0Cf5A34651e7CE7164398211C66'.toLowerCase(),
    '0xd9c1570148E36FF9657b67AcE540052341DDF7de'.toLowerCase(),
    '0xBDe4CB8d858adFaDDc5517bd54479a066559E575'.toLowerCase(),
    '0xda1d8a345Fc6934Da60E81b392F485cbfd350eaE'.toLowerCase(),
    '0xB30dD1198Feed1e22EC969f61EEd04cB75937adf'.toLowerCase(),
    '0xb749A586080436e616f097f193Ba9CB6A25E7Ea6'.toLowerCase(),
  ]
  if (TEMP_PASSPORT_WHITELIST.includes(address.toLowerCase())) {
    return res.status(200).json({
      verified: true,
      score: 99,
      requirement,
      validStampsCount: 99,
    })
  }

  if (SYBIL_CHECK === 'GITCOIN_PASSPORT') {
    try {
      // read passport
      // const passportReader: Passport = await reader.getPassport(address)
      // console.log(passportReader)
      // const gitcoinConfig = {
      //   headers: {
      //     accept: 'application/json',
      //     'X-API-Key': process.env.GITCOIN_PASSPORT_API_KEY,
      //   },
      // }

      let score
      if (!isProfile) {
        const submit = await submitPassport(address, PASSPORT_COMMUNITY_ID)
        // console.log(submit)
        if (submit.status === 200) {
          score = await fetchPassport(address, PASSPORT_COMMUNITY_ID)
        }
        if (score.ok) {
          const res = PassportResponseSchema.parse(await score.json())
          console.log(res)
          if (res?.score) {
            gitcoinPassportScore = parseInt(res.score)
          }
        } else {
          console.log('score not found ...')
        }
      }
      // const passportRes = await axios.get(
      //   `https://api.scorer.gitcoin.co/registry/stamps/${address}?limit=1000`,
      //   // `https://api.scorer.gitcoin.co/registry/v2/score/6651/${address}`,
      //   gitcoinConfig
      // )
      // const passport: any = passportRes.data
      // // console.log('** passport **', passport)
      const validStamps = []
      const stampHashes = {}
      // const stampProviders = {}
      const stampHashesSearch = []
      let whereCondition = 'ba_stamps @> ?'
      let sybil = []
      // if (passport?.items?.length) {
      //   // eslint-disable-next-line no-unsafe-optional-chaining
      //   for (const stamp of passport?.items) {
      //     const provider = stamp.credential?.credentialSubject?.provider
      //     // console.log(stamp)
      //     if (stamp.credential?.credentialSubject?.hash && ALLOWED_PROVIDERS.includes(provider))
      //       stampHashes[provider] = stamp.credential?.credentialSubject?.hash
      //   }
      //   console.log('stampHashes', stampHashes)
      //   // eslint-disable-next-line no-unsafe-optional-chaining
      //   for (const stamp of passport?.items) {
      //     const provider = stamp.credential?.credentialSubject?.provider
      //     stampProviders[provider] = { provider, stamp: stamp.credential }
      //   }
      //   // console.log('stampHashes', stampHashes)
      //   validStamps = filterValidStamps(Object.values(stampProviders))
      //   // console.log('validStamps', validStamps)
      //   // merge previous data without deleting other keys
      //   const updated = await db.raw(
      //     `update "users" set "gitcoin_stamps" = gitcoin_stamps || ? where "users"."id" = ?`,
      //     [stampHashes, userId]
      //   )
      //   // console.log('updated', updated)
      //   if (updated) console.log('stamps updated:', updated?.rowCount)
      const [{ ba_stamps }] = await db(TABLES.users)
        .select('ba_stamps')
        .where(TABLE.users.id, userId)
      console.log('ba_stamps', ba_stamps)
      for (const provider of Object.keys(ba_stamps)) {
        stampHashes[provider] = ba_stamps[provider]
      }
      console.log('stampHashes', stampHashes)
      Object.keys(stampHashes).map((key, index) => {
        const stampHash = {}
        stampHash[key] = stampHashes[key]
        stampHashesSearch.push(stampHash)
        validStamps.push(key)
        if (index > 0) whereCondition += ' OR gitcoin_stamps @> ?'
      })
      if (stampHashesSearch.length) {
        const sybilQuery = db(TABLES.users)
          .select('id', 'address')
          .whereNot(TABLE.users.id, userId)
          .whereNull(TABLE.users.sybil_user_id)
          // query for json instead of jsonb: .where(db.raw('gitcoin_stamps::TEXT LIKE ANY(?)', [stampHashesSearch]))
          .where(db.raw(`(${whereCondition})`, stampHashesSearch))
          .orWhereNot(TABLE.users.id, userId)
          .where(TABLE.users.sybil_user_id, '=', 12)
          .where(db.raw(`(${whereCondition})`, stampHashesSearch))
        // console.log(sybilQuery.toString())
        sybil = await sybilQuery
        console.log('sybil', sybil)
      }
      console.log('validStamps', validStamps)
      // }
      if (isBot) {
        // HACK: bot
        console.log('bot detected:', address)
        trackBE(address, 'bot_detected', {
          ua: req.headers['user-agent'],
          embed,
        })
        await db(TABLES.users)
          .where(TABLE.users.id, userId)
          .update({ sybil_user_id: 12 })
        res.status(403).json({
          verified: false,
          score: gitcoinPassportScore,
          requirement,
          validStampsCount: 0,
        })
      }
      if (sybil?.length) {
        // mark this user as a sybil attacker
        console.log('fraud detected:', sybil)
        trackBE(address, 'duplicate_stamps', {
          sybil_id: sybil[0]?.id,
          sybil_address: sybil[0]?.address,
          embed,
        })
        await db(TABLES.users)
          .where(TABLE.users.id, userId)
          .update({ sybil_user_id: sybil[0]?.id })
        return res.status(200).json({
          verified: false,
          score: gitcoinPassportScore,
          requirement,
          fraud: sybil[0]?.address,
          validStampsCount: Object.keys(stampHashes)?.length,
          stamps: stampHashes,
        })
      }
      if (validStamps?.length >= NUMBER_OF_STAMP_REQUIRED) {
        // console.log('verified:', validStamps?.length)
      } else {
        console.log('not verified')
      }
      return res.status(200).json({
        verified: validStamps?.length >= NUMBER_OF_STAMP_REQUIRED || gitcoinPassportScore >= REQUIRED_PASSPORT_SCORE,
        score: gitcoinPassportScore,
        fraud:
          user?.sybil_user_id === 12
            ? '0x0000000000000000000000000000000000000000'
            : null,
        requirement,
        validStampsCount: Object.keys(stampHashes)?.length,
        stamps: stampHashes,
      })
    } catch (error) {
      console.error(error)
      res.status(500).json({
        verified: false,
        score: gitcoinPassportScore,
        requirement,
        validStampsCount: 0,
        error: `error ${error?.code}: ${GENERIC_ERROR_MESSAGE}`,
      })
    }
  } else if (SYBIL_CHECK === '35kBANK') {
    // not implemented yet
    const NUMBER_OF_BANK_REQUIRED = 35000
    const requirement = `Hold a minimum of ${NUMBER_OF_BANK_REQUIRED} BANK tokens for at least 1 month˝`
    return res.status(200).json({ verified: 'TODO', requirement })
  }
}

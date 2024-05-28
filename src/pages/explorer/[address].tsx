/* eslint-disable no-console */
import { useEffect, useState } from 'react'
import {
  Box,
  Button,
  Container,
  Heading,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightAddon,
  Select,
  Text,
  useClipboard,
  useMediaQuery,
  useToast,
} from '@chakra-ui/react'
import { CopySimple, Envelope } from '@phosphor-icons/react'
import router from 'next/router'
import { useAccount } from 'wagmi'
import { t } from 'i18next'
import { useLocalStorage } from 'usehooks-ts'

import Badges from 'components/Badges'
import Card from 'components/Card'
import { MetaData } from 'components/Head'
import { DOMAIN_URL, MAX_COLLECTIBLES } from 'constants/index'
import { UserType } from 'entities/user'
import {
  emailRegex,
  generateFarcasterLink,
  generateTwitterLink,
  shortenAddress,
  api,
  Mixpanel,
} from 'utils/index'
import ProgressTitle from 'components/ProgressTitle'
import ExternalLink from 'components/ExternalLink'
import { MAX_DONATIONS } from 'constants/donations'
import { MAX_BADGES } from 'constants/badges'
import { EMPTY_PASSPORT, MAX_STAMPS } from 'constants/passport'
import Layout from 'layout/Layout'

export async function getServerSideProps({ query }) {
  const { address, badge } = query

  let preloadError = ''
  if (!address) preloadError = 'missing address'
  if (preloadError) return { props: { preloadError } }
  const badgeToHighlight = parseInt(badge)
  const data = {
    profileAddress: address,
    badgeToHighlight,
  }
  // console.log(data)

  const random = Math.floor(Math.random() * 100000)

  const pageMeta: MetaData = {
    title: `${address?.includes('.') ? address : shortenAddress(address)}`,
    description: `${
      badge ? 'Bankless Explorer Badge' : 'Bankless Explorer Profile'
    }`,
    image: `${DOMAIN_URL}/api/og/social?address=${address}${
      badge ? `&badge=${badge}` : ''
    }&r=${random}`,
  }

  return { props: { ...data, pageMeta } }
}

const COMMUNITIES = [
  'Boys Club',
  'DAO Punk',
  'FWB',
  'Gitcoin',
  'Optimism Collective',
  'SheFi',
  'Zerion',
].sort()

export default function Page({
  profileAddress,
  badgeToHighlight,
  preloadError,
}: {
  profileAddress: string
  badgeToHighlight?: number
  preloadError?: string
}) {
  const profileUrl =
    typeof window !== 'undefined' ? `${window.location.href}` : ''
  const [isSmallScreen] = useMediaQuery(['(max-width: 1200px)'])
  const { referral } = router.query
  const [user, setUser] = useState<UserType | null>(null)
  const [error, setError] = useState(preloadError)
  const [fullProfileAddress, setFullProfileAddress] = useState('')
  const [isMyProfile, setIsMyProfile] = useState(false)
  const { address } = useAccount()
  const { onCopy, hasCopied } = useClipboard(profileUrl)
  const [passportLS] = useLocalStorage('passport', EMPTY_PASSPORT)
  const [community, setCommunity] = useLocalStorage(`community`, '')
  const [addCommunity, setAddCommunity] = useState(false)
  const [email, setEmail] = useState(localStorage.getItem('email'))
  const [initialEmail] = useState(localStorage.getItem('email'))
  const toast = useToast()
  const [ens] = useLocalStorage(`ens-cache`, {})

  const wallets = localStorage.getItem('wallets')
    ? JSON.parse(localStorage.getItem('wallets'))
    : []

  const updateCommunity = async (community) => {
    try {
      const result = await api('/api/update-community', {
        address,
        community,
      })
      if (result && result.status === 200) {
        setCommunity(community)
      } else {
        // TODO: handle errors
        console.log(result)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    const loadUser = async () => {
      try {
        const res = await fetch(`/api/user/${profileAddress}?profile=true`)
        if (!res.ok) setError('Failed to fetch user data.')
        const user: UserType = await res.json()
        if (user?.error) {
          setError(user?.error)
        } else if (user) {
          setIsMyProfile(false)
          console.log(user)
          if (
            typeof window !== 'undefined' &&
            wallets.includes(user.address) &&
            referral !== 'true'
          ) {
            const redirect = `/explorer/${profileAddress}?referral=true`
            window.history.replaceState(null, null, redirect)
          }
          if (user?.stats?.referrals?.length) {
            user?.stats?.referrals.map((r) => {
              console.log(
                'Explorer onboarded: ',
                `https://app.banklessacademy.com/explorer/${r}`
              )
            })
          }
          setFullProfileAddress(user.address)
          if (address?.toLowerCase() === user.address) {
            setIsMyProfile(true)
          }
          setUser(user)
        }
      } catch (error) {
        console.log(error)
        setError(
          'Failed to fetch user data from API. Please refresh the page manually.'
        )
      }
    }
    loadUser()
  }, [profileAddress, address])

  useEffect(() => {
    if (isMyProfile && passportLS?.stamps && passportLS?.version) {
      // update user stamps without requiring to refresh
      const valid_stamps = Object.keys(passportLS.stamps)
      if (valid_stamps?.length) {
        const updatedUser: any = {
          stats: {
            ...user.stats,
            valid_stamps,
            score:
              user.stats.score -
              user.stats.valid_stamps?.length +
              valid_stamps.length,
          },
        }
        setUser({ ...user, ...updatedUser })
      }
    }
  }, [passportLS, isMyProfile])

  const collectibles = []
  for (let i = 0; i < user?.stats.datadisks?.length; i++) {
    collectibles.push(user?.stats.datadisks[i])
  }
  for (let i = 0; i < user?.stats.handbooks?.length; i++) {
    collectibles.push(user?.stats.handbooks[i])
  }

  const shareLink = typeof window !== 'undefined' ? window.location.href : ''
  const share = `Check out my Bankless Explorer Score, and track my journey at @BanklessAcademy.

Join me! Discover the knowledge and tools to #OwnYourFuture 👨🏻‍🚀🚀`

  const twitterLink = generateTwitterLink(share, shareLink)

  const farcasterLink = generateFarcasterLink(share, shareLink)

  if (
    referral?.length &&
    !isMyProfile &&
    !localStorage.getItem('referrer')?.length &&
    fullProfileAddress
  ) {
    localStorage.setItem('referrer', fullProfileAddress?.toLowerCase())
    console.log('referrer added', localStorage.getItem('referrer'))
  }
  if (address && localStorage.getItem('referrer') === address?.toLowerCase()) {
    localStorage.setItem('referrer', '')
    console.log('reset referrer')
  }

  if (user)
    // TODO: create Profile component
    return (
      <Layout page={isMyProfile ? 'PROFILE' : ''}>
        <Container maxW="container.lg">
          <Card mt="180px" borderRadius="2xl !important">
            <Box
              margin="auto"
              mt="-130px"
              pt="12px"
              w="284px"
              h="284px"
              borderRadius="50%"
              backgroundImage="linear-gradient(180deg, #A379BD 0%, #5B5198 100%)"
            >
              <Image
                w="260px"
                h="260px"
                margin="auto"
                borderRadius="50%"
                backgroundColor="black"
                src={user.avatar}
              />
            </Box>
            <Text
              as="h2"
              fontSize="4xl"
              fontWeight="bold"
              textAlign="center"
              textTransform="uppercase"
              mt="40px"
              mb="8"
            >
              {user.ensName?.includes('.')
                ? user.ensName
                : profileAddress?.includes('.')
                ? profileAddress
                : shortenAddress(profileAddress)}
            </Text>
            {isMyProfile ? (
              <>
                {addCommunity ? (
                  <Box my="8" mx="4" display="flex" placeContent="center">
                    <InputGroup maxW="400px">
                      <Input
                        value={community}
                        placeholder={'Your community...'}
                        onChange={(e): void => {
                          const customCommunity = e.target.value
                          setCommunity(customCommunity)
                        }}
                      />
                      <InputRightAddon padding="0">
                        <Button
                          variant="primary"
                          width="100%"
                          borderRadius="6px"
                          borderLeftRadius="0"
                          onClick={async () => {
                            updateCommunity(community)
                            setAddCommunity(false)
                          }}
                        >
                          Save
                        </Button>
                      </InputRightAddon>
                    </InputGroup>
                  </Box>
                ) : (
                  <Box mb="8" textAlign="center">
                    <Select
                      placeholder="Select Community"
                      size="lg"
                      w="100%"
                      maxW="300px"
                      m="auto"
                      value={community}
                      onChange={async (e) => {
                        const selectedCommunity = e.target.value
                        if (selectedCommunity === 'new') {
                          setCommunity('')
                          setAddCommunity(true)
                        } else {
                          await updateCommunity(selectedCommunity)
                        }
                      }}
                    >
                      <option value="new">&gt; Suggest new community</option>
                      {COMMUNITIES.map((community) => {
                        return (
                          <option key={community} value={community}>
                            {community}
                          </option>
                        )
                      })}
                      {community && !COMMUNITIES.includes(community) && (
                        <option value={community}>{community}</option>
                      )}
                    </Select>
                  </Box>
                )}
              </>
            ) : (
              user.community && (
                <Box my="8" mx="4" display="flex" placeContent="center">
                  <Text
                    as="h2"
                    fontSize="3xl"
                    fontWeight="bold"
                    textAlign="center"
                    textTransform="uppercase"
                    color="#ffffff70"
                  >
                    <Box display="flex" justifyContent="center">
                      <Box>-[&nbsp;</Box>
                      <Box mt="2.5px">{user.community}</Box>
                      <Box>&nbsp;]-</Box>
                    </Box>
                  </Text>
                </Box>
              )
            )}
            {isMyProfile && (
              <Box justifyContent="center" w="256px" m="auto" mb="8">
                <Box pb="2">
                  <ExternalLink href={twitterLink} mr="2">
                    <Button
                      variant="primary"
                      w="100%"
                      borderBottomRadius="0"
                      leftIcon={
                        <Image width="24px" src="/images/TwitterX.svg" />
                      }
                    >
                      {t('Share on Twitter / X')}
                    </Button>
                  </ExternalLink>
                </Box>
                <Box pb="2">
                  <ExternalLink href={farcasterLink} mr="2">
                    <Button
                      variant="primary"
                      w="100%"
                      borderRadius="0"
                      leftIcon={
                        <Image width="24px" src="/images/Farcaster.svg" />
                      }
                    >
                      {t('Share on Farcaster')}
                    </Button>
                  </ExternalLink>
                </Box>
                <Button
                  variant="primary"
                  w="100%"
                  borderTopRadius="0"
                  leftIcon={<CopySimple size="30px" />}
                  onClick={() => onCopy()}
                  isActive={hasCopied}
                >
                  {hasCopied
                    ? t('Profile Link Copied')
                    : t('Copy Profile Link')}
                </Button>
              </Box>
            )}
          </Card>
          {isMyProfile && (
            <Card
              my="8"
              borderRadius="2xl !important"
              background="black !important"
            >
              <Box m="8" textAlign="center">
                <Box fontSize="3xl" fontWeight="bold" m="auto">
                  Newsletter
                </Box>
                <Box my="8" display="flex" placeContent="center">
                  <InputGroup maxW="400px">
                    <InputLeftElement pointerEvents="none">
                      <Envelope size="32" />
                    </InputLeftElement>
                    <Input
                      value={email}
                      placeholder={'Enter your email address...'}
                      type="email"
                      onChange={(e): void => {
                        setEmail(e.target.value)
                      }}
                    />
                  </InputGroup>
                </Box>
                <Box textAlign="right" mb="6">
                  <Button
                    size="lg"
                    variant="primaryBig"
                    onClick={async () => {
                      toast.closeAll()
                      if (!email)
                        toast({
                          title: t('Email missing'),
                          description: t('Provide an email.'),
                          status: 'warning',
                          duration: 10000,
                          isClosable: true,
                        })
                      else if (emailRegex.test(email) === false)
                        toast({
                          title: t('Wrong email format'),
                          description: t('Please check your email.'),
                          status: 'warning',
                          duration: 10000,
                          isClosable: true,
                        })
                      else {
                        const result = await api('/api/subscribe-newsletter', {
                          email,
                          wallet: address,
                          ens:
                            address && address in ens
                              ? ens[address]?.name
                              : undefined,
                        })
                        if (result && result.status === 200) {
                          localStorage.setItem('email', email)
                          localStorage.setItem(`newsletter`, 'true')
                          Mixpanel.track(
                            initialEmail?.length
                              ? 'subscribe_newsletter'
                              : 'update_newsletter',
                            {
                              email: email,
                            }
                          )
                          toast({
                            title: t('Thanks for subscribing Explorer 🧑‍🚀'),
                            description: t(`You'll hear from us soon!`),
                            status: 'success',
                            duration: 10000,
                            isClosable: true,
                          })
                        } else {
                          toast({
                            title: t(
                              `Something went wrong... we couldn't add your subscription.`
                            ),
                            description: t('Please try again later.'),
                            status: 'warning',
                            duration: 10000,
                            isClosable: true,
                          })
                        }
                      }
                    }}
                  >
                    Save
                  </Button>
                </Box>
              </Box>
            </Card>
          )}
          <Card my="8" borderRadius="2xl !important">
            <Box m="auto" maxW={isSmallScreen ? '600px' : '100%'}>
              <Box m="auto" position="relative" w="300px" mt={4}>
                <Image w="300px" src="/images/explorer-score.png" />
                <Box
                  position="absolute"
                  top="52.9px"
                  width="72px"
                  textAlign="center"
                  left="212px"
                  fontSize="4xl"
                  fontWeight="bold"
                >
                  {user.stats.score || 0}
                </Box>
              </Box>
              <Box display={isSmallScreen ? 'block' : 'flex'} m="8">
                <Box
                  w={isSmallScreen ? '100%' : '50%'}
                  mr={isSmallScreen ? '0' : '50px'}
                >
                  <ProgressTitle
                    title={t('Badges')}
                    score={user.stats.badges || 0}
                    max={MAX_BADGES}
                    description={t(
                      `Each lesson badge increases your score by 1 point.`
                    )}
                  />
                  <Badges
                    badges={user.badgeTokenIds}
                    badgeToHighlight={badgeToHighlight}
                    type="badges"
                    isMyProfile={isMyProfile}
                  />
                </Box>
                <Box w={isSmallScreen ? '100%' : '50%'}>
                  <ProgressTitle
                    title={t('Collectibles')}
                    score={
                      3 * (user.stats?.datadisks?.length || 0) +
                      (user.stats?.handbooks?.length || 0)
                    }
                    max={MAX_COLLECTIBLES}
                    description={t(
                      `Each Handbook increases your score by 1 point, and each DataDisk increases it by 3.`
                    )}
                  />
                  <Badges
                    badges={collectibles}
                    type="collectibles"
                    isMyProfile={isMyProfile}
                  />
                </Box>
              </Box>
              <Box
                display={isSmallScreen ? 'block' : 'flex'}
                m="8"
                maxW={isSmallScreen ? '600px' : '100%'}
              >
                <Box
                  w={isSmallScreen ? '100%' : '50%'}
                  mr={isSmallScreen ? '0' : '50px'}
                >
                  <ProgressTitle
                    title={t('Donations')}
                    score={
                      user.stats?.donations
                        ? Object.keys(user.stats?.donations)?.length || 0
                        : 0
                    }
                    max={MAX_DONATIONS}
                    description={t(
                      `Each round you donate to Bankless Academy on Gitcoin increases your score by 1 point. Points are updated at the end of a round.`
                    )}
                  />
                  <Badges
                    badges={Object.keys(user.stats?.donations || {})}
                    type="donations"
                    isMyProfile={isMyProfile}
                  />
                </Box>
                <Box w={isSmallScreen ? '100%' : '50%'}>
                  <ProgressTitle
                    title={t('Stamps')}
                    score={user.stats?.valid_stamps?.length || 0}
                    max={MAX_STAMPS}
                    description={t(
                      `Each stamp you collect by connecting an account increases your score by 1 point.`
                    )}
                  />
                  <Badges
                    badges={user.stats?.valid_stamps || []}
                    type="stamps"
                    isMyProfile={address && isMyProfile}
                  />
                </Box>
              </Box>
            </Box>
          </Card>
        </Container>
      </Layout>
    )
  else
    return (
      <Layout page="">
        <Container maxW="container.xl" minH="calc(100vh - 73px)">
          <Heading as="h2" size="xl" m="8" textAlign="center">
            Loading Explorer Profile
          </Heading>
          {error || (
            <Image
              margin="auto"
              paddingTop="200px"
              width="250px"
              src="/loading_purple.svg"
            />
          )}
        </Container>
      </Layout>
    )
}

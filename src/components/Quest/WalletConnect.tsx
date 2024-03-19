import React from 'react'
import { Box, Button, Spinner, Image } from '@chakra-ui/react'
import { CheckIcon } from '@chakra-ui/icons'

import { theme } from 'theme/index'
import { useSmallScreen } from 'hooks/index'
import { LESSONS } from 'constants/index'
import InternalLink from 'components/InternalLink'

export const ConnectFirst = (
  isSmallScreen: boolean,
  address: string
): React.ReactElement => {
  const lesson = LESSONS.find(
    (lesson) => lesson.slug === 'creating-a-crypto-wallet'
  )
  return (
    <Box display={isSmallScreen ? 'block' : 'flex'}>
      <div className="bloc1" style={{ alignSelf: 'center' }}>
        <Box fontSize="20px" fontWeight="bold" m="4">
          {`You'll need a crypto wallet for this quest.`}
        </Box>
        <Box display="flex" justifyContent="normal" mt="4">
          <Button
            variant="outlined"
            leftIcon={address ? <CheckIcon /> : <Spinner speed="1s" />}
            color={address ? theme.colors.correct : 'orange'}
            cursor="default"
            boxShadow="none !important"
          >
            {address
              ? 'Wallet connected!'
              : 'Waiting to detect your wallet ...'}
          </Button>
        </Box>
        <Box m="4">
          {address ? null : (
            <>
              <Box fontSize="20px" fontWeight="bold">
                {`If you don't have one, let's set one up!`}
              </Box>
              <Box mt="2">
                {`Our onchain quests and rewards only work with a wallet connected.`}
              </Box>
              <Box mt="2">
                {`Wallets are like blockchain accounts. You'll need one to interact with blockchain apps, or to buy, hold and send cryptocurrency.`}
              </Box>
              <Box mt="2">
                {`Follow this quick instructional video to create your first wallet!`}
              </Box>
            </>
          )}
        </Box>
      </div>
      {!address && (
        <div className="bloc2">
          <InternalLink
            href={`/lessons/${lesson.slug}`}
            alt={lesson.englishName}
            target="_blank"
          >
            <Image borderRadius={12} src={lesson.socialImageLink} />
          </InternalLink>
        </div>
      )}
    </Box>
  )
}

const WalletConnect = (
  address: string
): {
  isQuestCompleted: boolean
  questComponent: React.ReactElement
} => {
  const [isSmallScreen] = useSmallScreen()

  return {
    isQuestCompleted: !!address,
    questComponent: ConnectFirst(isSmallScreen, address),
  }
}

export default WalletConnect

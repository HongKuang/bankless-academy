import NextLink, { LinkProps } from 'next/link'
import {
  Link as ChakraLink,
  LinkProps as ChakraLinkProps,
} from '@chakra-ui/react'

import { Mixpanel, getNodeText } from 'utils'

type ChakraLinkAndNextProps = ChakraLinkProps & LinkProps & any

const ExternalLink = ({
  href,
  children,
  alt,
  ...props
}: ChakraLinkAndNextProps): JSX.Element => {
  const whiteProps =
    props.color === 'white'
      ? {
          style: {
            color: 'white',
            textDecoration: 'underline',
            textUnderlinePosition: 'under',
          },
          _hover: {
            textDecoration: 'underline !important',
          },
        }
      : {}
  return (
    <NextLink href={href} passHref>
      <ChakraLink
        {...props}
        {...whiteProps}
        isExternal
        onClick={() => {
          const link = href || 'NO_LINK'
          const name = alt || getNodeText(children) || 'NO_NAME'
          Mixpanel.track('click_external_link', { link, name })
        }}
      >
        {children}
      </ChakraLink>
    </NextLink>
  )
}

export default ExternalLink

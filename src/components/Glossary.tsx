import React from 'react'
import { Box } from '@chakra-ui/react'

import { StyledHeading } from 'components/LessonCards'

interface Term {
  id: string
  name: string
  definition: string
}

interface GlossaryProps {
  terms: Term[]
}

const Glossary: React.FC<GlossaryProps> = ({ terms }) => {
  const groupedTerms: { [key: string]: Term[] } = {}
  terms.forEach((term) => {
    let firstLetter = term.name.charAt(0).toUpperCase()
    if (parseInt(firstLetter)) firstLetter = 'number'
    if (!groupedTerms[firstLetter]) {
      groupedTerms[firstLetter] = []
    }
    groupedTerms[firstLetter].push(term)
  })

  return (
    <Box position="relative">
      <Box
        position="fixed"
        top="80px"
        right="18px"
        h="calc(100% - 140px)"
        display="grid"
        overflow="scroll"
        w="30px"
      >
        {Object.keys(groupedTerms).map((letter) => (
          <a key={letter} href={`#section-${letter}`}>
            <Box minH="30px">{letter.replace('number', '#')}</Box>
          </a>
        ))}
      </Box>
      <Box m="10" pr="2" maxW="1024px">
        <StyledHeading as="h1" size="2xl" textAlign="center" my={8}>
          Glossary
        </StyledHeading>
        {Object.keys(groupedTerms).map((letter) => (
          <Box key={letter} id={`section-${letter}`}>
            <Box
              as="h2"
              fontSize="3xl"
              fontWeight="bold"
              pt="12"
              mb="8"
              mt={8}
              borderTop="2px solid #B85FF1"
              w="50px"
            >
              {letter.replace('number', '#')}
            </Box>
            {groupedTerms[letter].map((term) => (
              <>
                <Box
                  as="h3"
                  fontSize="2xl"
                  fontWeight="bold"
                  key={term.id}
                  id={term.id}
                  mt={8}
                  mb={6}
                >
                  {term.name}
                </Box>
                <Box mb={8}>{term.definition}</Box>
              </>
            ))}
          </Box>
        ))}
      </Box>
    </Box>
  )
}

export default Glossary

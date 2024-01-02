import { GetStaticProps } from 'next'
import { SimpleGrid, Container, Heading } from '@chakra-ui/react'
import styled from '@emotion/styled'
import { useTranslation } from 'react-i18next'

import { MetaData } from 'components/Head'
import LessonCards from 'components/LessonCards'

export const pageMeta: MetaData = {
  // TODO: add module name
  title: 'Lesson Selection',
}

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: { pageMeta },
  }
}

const StyledHeading = styled(Heading)`
  @media only screen and (min-width: 801px) {
    display: flex;
    flex-basis: 100%;
    align-items: center;
    margin: 48px 0;

    &:before,
    &:after {
      content: '';
      flex-grow: 1;
      background: #989898;
      height: 1px;
      font-size: 0;
      line-height: 0;
    }
    &:before {
      margin: 0 36px 0 0;
    }
    &:after {
      margin: 0 0 0 36px;
    }
  }
`

function Lessons(): JSX.Element {
  const { t } = useTranslation()
  return (
    <Container maxW="container.xl">
      <StyledHeading as="h1" size="2xl" textAlign="center" my={8}>
        {t('Lesson Selection')}
      </StyledHeading>
      <SimpleGrid columns={{ sm: 1, md: 2, lg: 3 }} spacing={4} my={8} gap={6}>
        <LessonCards />
      </SimpleGrid>
    </Container>
  )
}

export default Lessons

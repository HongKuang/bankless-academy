import { GetStaticProps } from 'next'

import { MetaData } from 'components/Head'
import Layout from 'components/Layout'
import LessonCards from 'components/LessonCards'

export const pageMeta: MetaData = {
  title: 'Essentials',
}

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: { pageMeta },
  }
}

function Lessons(): JSX.Element {
  return (
    <Layout level="Essentials">
      <LessonCards level="Essentials" />
    </Layout>
  )
}

export default Lessons

import React from 'react'
import { Box, Button } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { useRouter } from 'next/router'

import { LessonType } from 'entities/lesson'
import { Mixpanel } from 'utils'

const LanguageSwitch = ({
  lesson,
}: {
  lesson: LessonType
}): React.ReactElement => {
  const { t, i18n } = useTranslation()
  const router = useRouter()

  const languages = lesson.languages

  const content = window.location.pathname?.endsWith('/content')
    ? '/content'
    : ''

  return (
    <Box>
      {languages?.length ? (
        <Box
          display="flex"
          flexWrap="wrap"
          justifyContent="center"
          alignItems="center"
          m="auto"
        >
          <Box>{t('Select language:')}</Box>
          <Button
            variant={
              i18n.language === 'en' ||
              !lesson.languages.includes(i18n.language as any)
                ? 'secondary'
                : 'outline'
            }
            m={3}
            onClick={() => {
              i18n.changeLanguage('en', () =>
                router.push(`/lessons/${lesson.slug}${content}`)
              )
              Mixpanel.track(
                lesson.isArticle ? 'open_lesson' : 'lesson_briefing',
                {
                  lesson: lesson?.englishName,
                  language: 'en',
                }
              )
              Mixpanel.track('change_language', {
                lesson: lesson?.englishName,
                language: 'en',
                link: `/lessons/${lesson.slug}`,
                name: 'en',
              })
            }}
          >
            EN
          </Button>
          {languages.map((l) => (
            <Button
              variant={i18n.language === l ? 'secondary' : 'outline'}
              key={`key-${l}`}
              onClick={() => {
                i18n.changeLanguage(l, () =>
                  router.push(`/lessons/${l}/${lesson.slug}${content}`)
                )
                Mixpanel.track(
                  lesson.isArticle ? 'open_lesson' : 'lesson_briefing',
                  {
                    lesson: lesson?.englishName,
                    language: l,
                  }
                )
                Mixpanel.track('change_language', {
                  lesson: lesson?.englishName,
                  language: l,
                  link: `/lessons/${l}/${lesson.slug}`,
                  name: l,
                })
              }}
              m={3}
            >
              {l.toUpperCase()}
            </Button>
          ))}
        </Box>
      ) : null}
    </Box>
  )
}

export default LanguageSwitch

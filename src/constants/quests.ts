import QuestType from 'entities/quest'

// TEMP
const MARKDOWN_CONTENT = `# header 1
## header 1.1

- learning 1
- learning 2

## header 1.2

- learning 3
- learning 4

# header 2

## header 2.1

- learning 5
- learning 6`

const QUIZ_TEST = {
  question: 'Quiz question',
  answer_1: 'Answer 1',
  answer_2: 'Answer 2',
  answer_3: 'Answer 3',
  answer_4: 'Answer 4',
  right_answer_number: 2,
}

const QUESTS: QuestType[] = [
  {
    name: 'Wallet Basics',
    slug: 'wallet-basics',
    description: 'Wallet Basics description',
    duration: 10,
    difficulty: '🙂 easy',
    poap_image: '/images/poap1.png',
    slides: [
      {
        type: 'LEARN',
        title: 'First slide',
        content: MARKDOWN_CONTENT,
      },
      {
        type: 'LEARN',
        title: 'Second slide',
        content: MARKDOWN_CONTENT,
      },
      {
        type: 'QUIZ',
        title: 'First quiz',
        quiz: { ...QUIZ_TEST, id: 'wallet-basics-1' },
      },
      {
        type: 'LEARN',
        title: 'Learn more',
        content: MARKDOWN_CONTENT,
      },
      {
        type: 'QUIZ',
        title: 'Second quiz',
        quiz: { ...QUIZ_TEST, id: 'wallet-basics-2' },
      },
      {
        type: 'QUEST',
        title: 'Quest title',
        component: 'quest1',
      },
    ],
  },
  {
    name: 'Borrow with Aave',
    slug: 'borrow-with-aave',
    description: 'Borrow with Aave description',
    duration: 30,
    difficulty: '🛠 expert',
    poap_image: '/images/poap2.png',
    slides: [
      {
        type: 'LEARN',
        title: 'First slide',
        content: MARKDOWN_CONTENT,
      },
      {
        type: 'LEARN',
        title: 'Second slide',
        content: MARKDOWN_CONTENT,
      },
      {
        type: 'QUIZ',
        title: 'First quiz',
        quiz: { ...QUIZ_TEST, id: 'borrow-with-aave-1' },
      },
      {
        type: 'QUEST',
        title: 'Quest title',
        component: 'quest1',
      },
    ],
  },
]

export default QUESTS

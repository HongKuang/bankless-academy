import { QuestType } from 'entities/quest'

const QUESTS: QuestType[] = [
  {
    poapImageLink:
      'https://storage.googleapis.com/poapmedia/onboard-wallet-basic-2021-logo-1627395940468.png',
    learningActions:
      'Create and manage your own wallet<br>Connect your wallet to a web3 website',
    knowledgeRequirements: 'No prior knowledge needed.',
    poapEventId: 4652,
    duration: 10,
    learnings:
      'Why do you need a wallet?<br>What is a wallet?<br>What are keys?<br>How do I protect your keys?<br>Wallet Security<br>Custodial vs non-custodial wallets',
    difficulty: 'Easy',
    description: 'Learn how to create and manage a wallet securely.',
    name: 'Wallet Basics',
    notionId: 'c66af125c38444bda4fee3af93cdfaa4',
    slug: 'wallet-basics',
    slides: [
      {
        type: 'LEARN',
        title: 'Why do you need a wallet?',
        content:
          "<iframe src='https://www.youtube.com/embed/YVgfHZMFFFQ?feature=oembed'></iframe><p>(demo video) TODO: create a similar video ourself</p>",
      },
      {
        type: 'LEARN',
        title: 'What is a wallet?',
        content:
          "<p>A wallet is an application or device used to store, send, and receive crypto assets.</p><iframe src='https://embed.lottiefiles.com/animation/70066'></iframe><p>When a wallet interacts with a blockchain, one can make purchases, transfer assets, interact with applications, and more!</p>",
      },
      {
        type: 'QUIZ',
        title: 'What is a wallet?',
        quiz: {
          rightAnswerNumber: 4,
          answer_1: 'A device equipped with RFID technology',
          answer_2: 'A bi-fold device',
          answer_3: 'An account that protects my assets',
          answer_4:
            'An app or device used to send, receive, or spend crypto assets',
          id: 'wallet-basics-1',
        },
      },
      {
        type: 'LEARN',
        title:
          'What are keys? (<span class="tooltip" definition="A public key is your address. It gives others a point of reference to send crypto assets to you." style="color:rgb(0, 120, 223, 1)">public key</span> & <span class="tooltip" definition="A private key allows access to your wallet in order for you to send crypto assets to other address." style="color:rgb(255, 0, 26, 1)">private key</span>)',
        content:
          '<p>A wallet has a unique pair of keys. There is one <span class="tooltip" definition="A public key is your address. It gives others a point of reference to send crypto assets to you." style="color:rgb(0, 120, 223, 1)">public key</span> and there is one <span class="tooltip" definition="A private key allows access to your wallet in order for you to send crypto assets to other address." style="color:rgb(255, 0, 26, 1)">private key</span>.</p><img src=\'https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F020c645b-001c-42d6-bc94-f47fe4e91074%2F16_0.png?table=block&id=73c18889-82df-4b49-aea0-42d468c92fcb\'><ul><li>The <span class="tooltip" definition="A public key is your address. It gives others a point of reference to send crypto assets to you." style="color:rgb(0, 120, 223, 1)">public key</span> is like your home address</li><li>The <span class="tooltip" definition="A private key allows access to your wallet in order for you to send crypto assets to other address." style="color:rgb(255, 0, 26, 1)">private key</span> is like your house key.</li></ul><p><span class="tooltip" definition="A public key is your address. It gives others a point of reference to send crypto assets to you." style="color:rgb(0, 120, 223, 1)">Public keys</span> allow others to identify you in order to send crypto assets to your address.</p><p><span class="tooltip" definition="A private key allows access to your wallet in order for you to send crypto assets to other address." style="color:rgb(255, 0, 26, 1)">Private keys</span> allow you access to your wallet in order for you to send crypto assets out to others.</p><p>When creating a wallet, <span class="tooltip" definition="A private key allows access to your wallet in order for you to send crypto assets to other address." style="color:rgb(255, 0, 26, 1)">private keys</span> are automatically generated.</p><p>The <span class="tooltip" definition="A private key allows access to your wallet in order for you to send crypto assets to other address." style="color:rgb(255, 0, 26, 1)">private key</span> number is then put through a complex mathematical algorithm used to generate your <span class="tooltip" definition="A public key is your address. It gives others a point of reference to send crypto assets to you." style="color:rgb(0, 120, 223, 1)">public key</span>.</p><p>Your <span class="tooltip" definition="A public key is your address. It gives others a point of reference to send crypto assets to you." style="color:rgb(0, 120, 223, 1)">public key</span> can be derived from your <span class="tooltip" definition="A private key allows access to your wallet in order for you to send crypto assets to other address." style="color:rgb(255, 0, 26, 1)">private key</span>, but your <span class="tooltip" definition="A private key allows access to your wallet in order for you to send crypto assets to other address." style="color:rgb(255, 0, 26, 1)">private key</span> can never be derived from your <span class="tooltip" definition="A public key is your address. It gives others a point of reference to send crypto assets to you." style="color:rgb(0, 120, 223, 1)">public key</span>.</p>',
      },
      {
        type: 'QUIZ',
        title:
          'In simple terms, you can think of the public key as your _____, and the private key as your _____',
        quiz: {
          rightAnswerNumber: 2,
          answer_1: 'Routing Number / Account Number',
          answer_2: 'Home address / House key',
          answer_3: 'Address / Zip code',
          answer_4: 'Phone Number / Social Security Number',
          id: 'wallet-basics-2',
        },
      },
      {
        type: 'LEARN',
        title: 'Not your keys, not your crypto!',
        content:
          '<p>Recall that private keys let you access your <span class="tooltip" definition="A wallet is an application or device used to send and receive crypto assets." style="color:rgb(0, 135, 107, 1)">wallet</span> to send crypto. In almost all cases, you want to own your wallet’s private key.</p><p>But not all wallets will let you do that. With a <span class="tooltip" definition="With a custodial wallet, another party controls the private keys, thus controlling access to your crypto assets." style="color:rgb(255, 0, 26, 1)">custodial wallet</span>, another party controls your private keys.</p><p>You’re trusting a third party to secure your funds and return them to you if you want to trade or send them somewhere else.</p><p>(Think of your account on Coinbase or Kraken wallet.)</p><img src=\'https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2Fabda02b7-850e-4f4b-9fcc-637330046e92%2F0_q_FQ4P0pA0PopIqx.png?table=block&id=53a6e5e5-bffe-4ac1-af09-c50f36f4f1d5\'><p>With a <span class="tooltip" definition="With a non-custodial wallet, you have sole control of your private keys, which in turn control your crypto assets." style="color:rgb(0, 135, 107, 1)">non-custodial wallet</span>, you have sole control of your private keys, which in turn control your crypto.</p><p>Remember, not your keys, not your crypto! That means that if you don’t control the keys of the wallet, you don’t control the crypto.</p><img src=\'https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F2ba92a8d-c83e-46ad-9807-f7f19c4bac4e%2Fproof-of-keys-bitcoin.png?table=block&id=1a170d97-4d45-4227-942b-ed72fc94f630\'>',
      },
      {
        type: 'QUIZ',
        title: 'I control my private keys with a custodial wallet',
        quiz: {
          rightAnswerNumber: 2,
          answer_1: 'True',
          answer_2: 'False',
          id: 'wallet-basics-3',
        },
      },
      {
        type: 'LEARN',
        title: 'Protect your keys, protect your crypto!',
        content:
          '<p>Since there is no third party involved in a <span class="tooltip" definition="With a non-custodial wallet, you have sole control of your private keys, which in turn control your crypto assets." style="color:rgb(0, 135, 107, 1)">non-custodial wallet</span>, you are solely responsible for your keys.</p><p>You must take your own precautions to protect your funds.</p><p>If you lose your private key, you can no longer access your wallet to spend, withdraw, or transfer your crypto. Your wallet is GONE FOREVER!!!</p><p>Therefore, it is imperative to save the private key in a secure location and on a durable material </p><p>(not paper).</p><img src=\'https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F559e242d-4fa2-4fe6-8bb5-06996c6326c2%2FCopy-of-9-security-Tips-Infographic-1_1-1-min.png?table=block&id=d1448a68-5c04-459f-9828-22492a127f89\'>',
      },
      {
        type: 'QUIZ',
        title:
          'I am solely responsible for my private keys with a non-custodial wallet',
        quiz: {
          rightAnswerNumber: 1,
          answer_1: 'True',
          answer_2: 'False',
          id: 'wallet-basics-4',
        },
      },
      {
        type: 'LEARN',
        title: 'How do I protect my keys?',
        content:
          '<h2>The 5 most effective ways to protect your keys:</h2><ol><li>Never share or reveal your private key to anyone.</li><li>Never save it online (such as OneDrive or Google Docs)</li><li>Write down your <span class="tooltip" definition="A recovery phrase is a list of 12 to 24 words which is used to generate your wallet\'s public key and private key." style="color:rgb(0, 120, 223, 1)">recovery phrase</span> and store it in a secure location (such as inside your safe or a bank’s safety deposit box).</li><li>Find a way to write <span class="tooltip" definition="A recovery phrase is a list of 12 to 24 words which is used to generate your wallet\'s public key and private key." style="color:rgb(0, 120, 223, 1)">recovery phrases</span> on indestructible material such as tungsten.</li><li>(Paper could get destroyed easily in case of floods or fire.)</li><li>Include your private key in your will.</li></ol>',
      },
      {
        type: 'QUIZ',
        title:
          'Which of this method is <strong>the only safe way</strong> to store your private keys?',
        quiz: {
          rightAnswerNumber: 4,
          answer_1: 'Save it on my computer and print it on piece of paper.',
          answer_2:
            'Take a screenshot or a picture of the private key on my phone.',
          answer_3:
            'Save it in my Dropbox account or any similar cloud service.',
          answer_4:
            'Write it on a piece of paper and store it in a safe place.',
          id: 'wallet-basics-5',
        },
      },
      {
        type: 'LEARN',
        title: 'What is a recovery phrase?',
        content:
          '<p>When you create a wallet, a recovery phrase is also created that is specific to that wallet.</p><p>It stores the information that can be used to recover your wallet and crypto if:</p><ul><li>your wallet fails unexpectedly or gets damaged;</li><li>you are unable to access it due to misplacement or theft;</li></ul><p>A recovery phrase is a list of 12 to 24 words and represents a single secret piece of data that is used to generate your wallet’s <span class="tooltip" definition="A public key is your address. It gives others a point of reference to send crypto assets to you." style="color:rgb(0, 120, 223, 1)">public key</span> and <span class="tooltip" definition="A private key allows access to your wallet in order for you to send crypto assets to other address." style="color:rgb(255, 0, 26, 1)">private key</span>.</p><p>This same recovery phrase can actually be used to access your wallet on different devices.</p>',
      },
      {
        type: 'QUIZ',
        title: 'I can use a recovery phrase to _____',
        quiz: {
          rightAnswerNumber: 3,
          answer_1: 'Recover my wallet if lost, stolen, or damaged',
          answer_2: 'Access my wallet on multiple devices',
          answer_3: 'Both [1] & [2]',
          answer_4: 'None of the above',
          id: 'wallet-basics-6',
        },
      },
      {
        type: 'LEARN',
        title: 'Types of non-custodial wallets',
        content:
          '<p>There are 2 major types of <span class="tooltip" definition="With a non-custodial wallet, you have sole control of your private keys, which in turn control your crypto assets." style="color:rgb(0, 135, 107, 1)">non-custodial wallets</span> : <span class="tooltip" definition="A type of non-custodial wallet that is perpetually connected to the internet." style="color:rgb(255, 0, 26, 1)">hot wallets</span> and <span class="tooltip" definition="A type of non-custodial wallet that is stored offline and does not require a perpetual internet connection." style="color:rgb(0, 120, 223, 1)">cold wallets</span></p><p>A <span class="tooltip" definition="A type of non-custodial wallet that is perpetually connected to the internet." style="color:rgb(255, 0, 26, 1)">hot wallet</span> (Online) can be connected to the internet.</p><ul><li>PROS 👍: They are usually free, simple to set up, and easy to use.</li><li>CONS 👎: They are less secure due to internet connection.</li></ul><p>A <span class="tooltip" definition="A type of non-custodial wallet that is stored offline and does not require a perpetual internet connection." style="color:rgb(0, 120, 223, 1)">cold wallet</span> (Offline) is <strong>never</strong> connected to the internet.</p><ul><li>PROS 👍: They are more secure.</li><li>CONS 👎: They aren\'t free, sometimes cumbersome to use, and are not ideal for quick transactions.</li></ul><img src=\'https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2Fab788f0c-0b84-4101-ac1d-3728d5d82385%2FWhat-is-a-hardware-wallet-1.jpg?table=block&id=677ff897-03f5-49e2-b123-171c1ef6dc27\'>',
      },
      {
        type: 'QUIZ',
        title: 'A cold wallet is more secure than a hot wallet',
        quiz: {
          rightAnswerNumber: 1,
          answer_1: 'True',
          answer_2: 'False',
          id: 'wallet-basics-7',
        },
      },
      {
        type: 'LEARN',
        title: 'MetaMask Wallet',
        content:
          '<h2>Why use MetaMask?</h2><ol><li>A <span class="tooltip" definition="Refers to dApps that run on the blockchain and allow anyone to participate without monetizing their personal data." style="color:rgb(0, 120, 223, 1)">Web3</span> <span class="tooltip" definition="With a non-custodial wallet, you have sole control of your private keys, which in turn control your crypto assets." style="color:rgb(0, 135, 107, 1)">non-custodial wallet</span>, enabling the usage of <span class="tooltip" definition="Digital applications or programs that exist and run on a blockchain, or P2P network of computers instead of a single computer, and are outside the purview and control of a single authority." style="color:rgb(0, 120, 223, 1)">dApps</span>. (Well cover Web3 and dApps more in a later course)</li><li>It is a widely used wallet with over 5 million monthly active users.</li><li>A browser extension is available on Chrome, Brave, Edge, and Firefox internet browsers.</li><li>Available for Mobile applications Android and IOS users.</li></ol>',
      },
      {
        type: 'QUIZ',
        title: 'MetaMask is a custodial wallet',
        quiz: {
          rightAnswerNumber: 2,
          answer_1: 'True',
          answer_2: 'False',
          id: 'wallet-basics-8',
        },
      },
      {
        type: 'LEARN',
        title: 'How to setup MetaMask',
        content:
          "<p>Download the browser extension from the official website: <a href='https://metamask.io/download'>https://metamask.io/download</a></p><iframe src='https://www.youtube.com/embed/7avBesBXH6A?feature=oembed'></iframe>",
      },
      {
        type: 'QUEST',
        title: 'Wallet Basics Quest',
        component: 'WalletBasics',
      },
      {
        type: 'POAP',
        title: 'Collect your POAP',
      },
    ],
  },
  {
    poapImageLink:
      'https://storage.googleapis.com/poapmedia/onboard-borrow-with-aave-2021-logo-1627580693589.png',
    learningActions:
      'Connect your wallet to Aave<br>Deposit collateral on Aave<br>Take a loan against your collateral',
    knowledgeRequirements: 'Manage a web3 wallet.',
    poapEventId: 4783,
    duration: 15,
    learnings: 'How to use Aave<br>How to take a loan without any intermediary',
    difficulty: 'Advanced',
    description: 'Learn how to borrow with Aave.',
    name: 'Borrow with Aave',
    notionId: 'fcf82a6b09fb456cb0e908d3403a1a8a',
    slug: 'borrow-with-aave',
    slides: [
      {
        type: 'LEARN',
        title: 'TODO',
        content: '<p>Add Aave content here ...</p>',
      },
      {
        type: 'QUEST',
        title: 'Borrow with Aave Quest',
        component: 'BorrowWithAave',
      },
      {
        type: 'POAP',
        title: 'Collect your POAP',
      },
    ],
  },
]

export default QUESTS
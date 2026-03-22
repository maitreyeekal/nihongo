// Grammar patterns data for Nihongo learning platform

export const grammar = [
  {
    id: 1,
    pattern: 'XはYです',
    meaning: 'X is Y (identity / description)',
    formation: 'Noun/Pronoun + は + Noun/Adjective + です',
    examples: [
      {
        japanese: '私は学生です。',
        reading: 'わたしはがくせいです。',
        english: 'I am a student.',
      },
      {
        japanese: 'これは本です。',
        reading: 'これはほんです。',
        english: 'This is a book.',
      },
      {
        japanese: '田中さんは先生です。',
        reading: 'たなかさんはせんせいです。',
        english: 'Mr./Ms. Tanaka is a teacher.',
      },
    ],
  },
  {
    id: 2,
    pattern: 'Xがあります / います',
    meaning: 'There is X / X exists',
    formation: 'Noun + が + あります (inanimate) / います (animate)',
    examples: [
      {
        japanese: '机の上に本があります。',
        reading: 'つくえのうえにほんがあります。',
        english: 'There is a book on the desk.',
      },
      {
        japanese: '庭に猫がいます。',
        reading: 'にわにねこがいます。',
        english: 'There is a cat in the garden.',
      },
      {
        japanese: '教室に学生がいます。',
        reading: 'きょうしつにがくせいがいます。',
        english: 'There are students in the classroom.',
      },
    ],
  },
  {
    id: 3,
    pattern: 'Xを Verb',
    meaning: 'Do [verb] to X (object marker)',
    formation: 'Noun + を + Verb',
    examples: [
      {
        japanese: 'ご飯を食べます。',
        reading: 'ごはんをたべます。',
        english: 'I eat rice / a meal.',
      },
      {
        japanese: '水を飲みます。',
        reading: 'みずをのみます。',
        english: 'I drink water.',
      },
      {
        japanese: '本を読みます。',
        reading: 'ほんをよみます。',
        english: 'I read a book.',
      },
    ],
  },
  {
    id: 4,
    pattern: 'Xに行きます',
    meaning: 'Go to X (destination marker)',
    formation: 'Place + に + 行きます / 来ます / 帰ります',
    examples: [
      {
        japanese: '学校に行きます。',
        reading: 'がっこうにいきます。',
        english: 'I go to school.',
      },
      {
        japanese: '日本に来ました。',
        reading: 'にほんにきました。',
        english: 'I came to Japan.',
      },
      {
        japanese: '家に帰ります。',
        reading: 'いえにかえります。',
        english: 'I go home.',
      },
    ],
  },
  {
    id: 5,
    pattern: 'Adjective + です',
    meaning: 'It is [adjective] (describing things)',
    formation: 'い-adjective + です / な-adjective + です',
    examples: [
      {
        japanese: 'この花はきれいです。',
        reading: 'このはなはきれいです。',
        english: 'This flower is beautiful.',
      },
      {
        japanese: 'この本は面白いです。',
        reading: 'このほんはおもしろいです。',
        english: 'This book is interesting.',
      },
      {
        japanese: '日本語は難しいです。',
        reading: 'にほんごはむずかしいです。',
        english: 'Japanese is difficult.',
      },
    ],
  },
  {
    id: 6,
    pattern: 'Verb + ません',
    meaning: 'Do not [verb] (negative polite)',
    formation: 'Verb stem + ません',
    examples: [
      {
        japanese: '肉を食べません。',
        reading: 'にくをたべません。',
        english: 'I do not eat meat.',
      },
      {
        japanese: 'お酒を飲みません。',
        reading: 'おさけをのみません。',
        english: 'I do not drink alcohol.',
      },
      {
        japanese: 'テレビを見ません。',
        reading: 'テレビをみません。',
        english: 'I do not watch TV.',
      },
    ],
  },
  {
    id: 7,
    pattern: 'Verb + ました',
    meaning: 'Did [verb] (past polite)',
    formation: 'Verb stem + ました',
    examples: [
      {
        japanese: '昨日、映画を見ました。',
        reading: 'きのう、えいがをみました。',
        english: 'I watched a movie yesterday.',
      },
      {
        japanese: '朝ご飯を食べました。',
        reading: 'あさごはんをたべました。',
        english: 'I ate breakfast.',
      },
      {
        japanese: '東京に行きました。',
        reading: 'とうきょうにいきました。',
        english: 'I went to Tokyo.',
      },
    ],
  },
  {
    id: 8,
    pattern: 'Verb + たいです',
    meaning: 'Want to [verb]',
    formation: 'Verb stem + たいです',
    examples: [
      {
        japanese: '日本に行きたいです。',
        reading: 'にほんにいきたいです。',
        english: 'I want to go to Japan.',
      },
      {
        japanese: 'すしを食べたいです。',
        reading: 'すしをたべたいです。',
        english: 'I want to eat sushi.',
      },
      {
        japanese: '日本語を話したいです。',
        reading: 'にほんごをはなしたいです。',
        english: 'I want to speak Japanese.',
      },
    ],
  },
  {
    id: 9,
    pattern: 'XからYまで',
    meaning: 'From X to Y',
    formation: 'Start point + から + End point + まで',
    examples: [
      {
        japanese: '九時から五時まで働きます。',
        reading: 'くじからごじまではたらきます。',
        english: 'I work from 9 to 5.',
      },
      {
        japanese: '東京から大阪まで新幹線で行きます。',
        reading: 'とうきょうからおおさかまでしんかんせんでいきます。',
        english: 'I go from Tokyo to Osaka by bullet train.',
      },
      {
        japanese: '月曜日から金曜日まで学校があります。',
        reading: 'げつようびからきんようびまでがっこうがあります。',
        english: 'There is school from Monday to Friday.',
      },
    ],
  },
  {
    id: 10,
    pattern: 'Xで Verb',
    meaning: 'Do [verb] at/by X (location or means)',
    formation: 'Place/Means + で + Verb',
    examples: [
      {
        japanese: 'レストランで食べます。',
        reading: 'レストランでたべます。',
        english: 'I eat at a restaurant.',
      },
      {
        japanese: 'バスで学校に行きます。',
        reading: 'バスでがっこうにいきます。',
        english: 'I go to school by bus.',
      },
      {
        japanese: '日本語で話してください。',
        reading: 'にほんごではなしてください。',
        english: 'Please speak in Japanese.',
      },
    ],
  },
];

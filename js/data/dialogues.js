// Dialogue / conversation data for Nihongo learning platform (Level 8)

export const dialogues = [
  {
    id: 1,
    title: 'Self-Introduction',
    titleJp: '自己紹介',
    setting: 'You meet a new classmate at a Japanese language school.',
    exchanges: [
      {
        speaker: 'Tanaka',
        japanese: 'はじめまして。田中です。よろしくお願いします。',
        english: 'Nice to meet you. I am Tanaka. Please treat me well.',
        choices: null,
      },
      {
        speaker: 'You',
        japanese: null,
        english: 'Introduce yourself politely.',
        choices: [
          { text: 'はじめまして。私はアレックスです。よろしくお願いします。', english: 'Nice to meet you. I am Alex. Please treat me well.', score: 3 },
          { text: 'アレックスです。', english: 'I am Alex.', score: 2 },
          { text: 'こんにちは。元気ですか。', english: "Hello. How are you?", score: 1 },
        ],
      },
      {
        speaker: 'Tanaka',
        japanese: 'アレックスさんはどこから来ましたか。',
        english: 'Where are you from, Alex?',
        choices: null,
      },
      {
        speaker: 'You',
        japanese: null,
        english: 'Tell Tanaka where you are from.',
        choices: [
          { text: 'アメリカから来ました。', english: 'I came from America.', score: 3 },
          { text: 'アメリカ人です。', english: 'I am American.', score: 2 },
          { text: '日本が好きです。', english: 'I like Japan.', score: 1 },
        ],
      },
      {
        speaker: 'Tanaka',
        japanese: '日本語の勉強は楽しいですか。',
        english: 'Is studying Japanese fun?',
        choices: null,
      },
      {
        speaker: 'You',
        japanese: null,
        english: 'Answer about your Japanese studies.',
        choices: [
          { text: 'はい、とても楽しいです。でも少し難しいです。', english: 'Yes, it is very fun. But a little difficult.', score: 3 },
          { text: 'はい、楽しいです。', english: 'Yes, it is fun.', score: 2 },
          { text: 'いいえ。', english: 'No.', score: 1 },
        ],
      },
      {
        speaker: 'Tanaka',
        japanese: '一緒に頑張りましょう！',
        english: "Let's do our best together!",
        choices: null,
      },
      {
        speaker: 'You',
        japanese: null,
        english: 'Respond enthusiastically.',
        choices: [
          { text: 'はい、頑張りましょう！よろしくお願いします。', english: "Yes, let's do our best! Nice to meet you.", score: 3 },
          { text: 'はい。', english: 'Yes.', score: 2 },
          { text: 'さようなら。', english: 'Goodbye.', score: 1 },
        ],
      },
    ],
  },
  {
    id: 2,
    title: 'At a Restaurant',
    titleJp: 'レストランで',
    setting: 'You enter a restaurant and order food.',
    exchanges: [
      {
        speaker: 'Waiter',
        japanese: 'いらっしゃいませ。何名様ですか。',
        english: 'Welcome. How many people?',
        choices: null,
      },
      {
        speaker: 'You',
        japanese: null,
        english: 'Tell them how many people.',
        choices: [
          { text: '一人です。', english: 'One person.', score: 3 },
          { text: '一つ。', english: 'One (wrong counter).', score: 1 },
          { text: 'こんにちは。', english: 'Hello.', score: 1 },
        ],
      },
      {
        speaker: 'Waiter',
        japanese: 'こちらへどうぞ。メニューです。',
        english: 'This way, please. Here is the menu.',
        choices: null,
      },
      {
        speaker: 'You',
        japanese: null,
        english: 'Thank them and say you are ready to order.',
        choices: [
          { text: 'ありがとうございます。すみません、注文をお願いします。', english: 'Thank you. Excuse me, I would like to order please.', score: 3 },
          { text: 'ありがとうございます。', english: 'Thank you.', score: 2 },
          { text: 'はい。', english: 'Yes.', score: 1 },
        ],
      },
      {
        speaker: 'Waiter',
        japanese: 'ご注文は何にしますか。',
        english: 'What would you like to order?',
        choices: null,
      },
      {
        speaker: 'You',
        japanese: null,
        english: 'Order some food.',
        choices: [
          { text: 'ラーメンとぎょうざをお願いします。', english: 'Ramen and gyoza, please.', score: 3 },
          { text: 'ラーメン。', english: 'Ramen.', score: 2 },
          { text: '分かりません。', english: "I don't understand.", score: 1 },
        ],
      },
      {
        speaker: 'Waiter',
        japanese: 'お飲み物はいかがですか。',
        english: 'Would you like something to drink?',
        choices: null,
      },
      {
        speaker: 'You',
        japanese: null,
        english: 'Order a drink.',
        choices: [
          { text: 'お水をお願いします。', english: 'Water, please.', score: 3 },
          { text: '水。', english: 'Water.', score: 2 },
          { text: 'いいえ、大丈夫です。', english: "No, I'm fine.", score: 2 },
        ],
      },
      {
        speaker: 'Waiter',
        japanese: 'かしこまりました。少々お待ちください。',
        english: 'Understood. Please wait a moment.',
        choices: null,
      },
      {
        speaker: 'You',
        japanese: null,
        english: 'Respond politely.',
        choices: [
          { text: 'はい、ありがとうございます。', english: 'Yes, thank you.', score: 3 },
          { text: 'はい。', english: 'Yes.', score: 2 },
          { text: '早くしてください。', english: 'Please hurry up.', score: 1 },
        ],
      },
    ],
  },
  {
    id: 3,
    title: 'Asking Directions',
    titleJp: '道を聞く',
    setting: 'You are lost and need to find the train station.',
    exchanges: [
      {
        speaker: 'You',
        japanese: null,
        english: 'Get someone\'s attention and ask for directions.',
        choices: [
          { text: 'すみません。駅はどこですか。', english: 'Excuse me. Where is the station?', score: 3 },
          { text: '駅はどこ？', english: 'Where is the station?', score: 1 },
          { text: 'すみません。', english: 'Excuse me.', score: 2 },
        ],
      },
      {
        speaker: 'Stranger',
        japanese: '駅ですか。この道をまっすぐ行ってください。',
        english: 'The station? Please go straight on this road.',
        choices: null,
      },
      {
        speaker: 'You',
        japanese: null,
        english: 'Confirm and ask for more details.',
        choices: [
          { text: 'まっすぐですね。どのくらいかかりますか。', english: 'Straight, right? How long does it take?', score: 3 },
          { text: 'はい。', english: 'Yes.', score: 2 },
          { text: '分かりません。', english: "I don't understand.", score: 1 },
        ],
      },
      {
        speaker: 'Stranger',
        japanese: '歩いて五分くらいです。二つ目の信号を右に曲がってください。',
        english: 'About 5 minutes on foot. Turn right at the second traffic light.',
        choices: null,
      },
      {
        speaker: 'You',
        japanese: null,
        english: 'Repeat the directions to confirm.',
        choices: [
          { text: '二つ目の信号を右ですね。分かりました。ありがとうございます。', english: 'Right at the second traffic light, right? I understand. Thank you.', score: 3 },
          { text: 'ありがとうございます。', english: 'Thank you.', score: 2 },
          { text: 'もう一度お願いします。', english: 'One more time please.', score: 2 },
        ],
      },
      {
        speaker: 'Stranger',
        japanese: 'はい、そうです。駅は右側にありますよ。',
        english: 'Yes, that is right. The station is on the right side.',
        choices: null,
      },
      {
        speaker: 'You',
        japanese: null,
        english: 'Thank them properly.',
        choices: [
          { text: 'どうもありがとうございました。助かりました。', english: 'Thank you very much. That was a great help.', score: 3 },
          { text: 'ありがとう。', english: 'Thanks.', score: 2 },
          { text: 'はい。', english: 'Yes.', score: 1 },
        ],
      },
    ],
  },
  {
    id: 4,
    title: 'Shopping',
    titleJp: '買い物',
    setting: 'You are shopping at a clothing store.',
    exchanges: [
      {
        speaker: 'Clerk',
        japanese: 'いらっしゃいませ。何かお探しですか。',
        english: 'Welcome. Are you looking for something?',
        choices: null,
      },
      {
        speaker: 'You',
        japanese: null,
        english: 'Tell them what you are looking for.',
        choices: [
          { text: 'はい、Tシャツを探しています。', english: 'Yes, I am looking for a T-shirt.', score: 3 },
          { text: 'Tシャツ。', english: 'T-shirt.', score: 1 },
          { text: '見ているだけです。', english: 'I am just looking.', score: 2 },
        ],
      },
      {
        speaker: 'Clerk',
        japanese: 'Tシャツはこちらにあります。何色がいいですか。',
        english: 'T-shirts are over here. What color would you like?',
        choices: null,
      },
      {
        speaker: 'You',
        japanese: null,
        english: 'Tell them your preferred color.',
        choices: [
          { text: '青いのはありますか。', english: 'Do you have a blue one?', score: 3 },
          { text: '青。', english: 'Blue.', score: 2 },
          { text: '何でもいいです。', english: 'Anything is fine.', score: 1 },
        ],
      },
      {
        speaker: 'Clerk',
        japanese: 'はい、こちらはいかがですか。サイズはMとLがあります。',
        english: 'Yes, how about this one? We have sizes M and L.',
        choices: null,
      },
      {
        speaker: 'You',
        japanese: null,
        english: 'Choose a size and ask about the price.',
        choices: [
          { text: 'Mをお願いします。いくらですか。', english: 'M please. How much is it?', score: 3 },
          { text: 'いくらですか。', english: 'How much is it?', score: 2 },
          { text: 'M。', english: 'M.', score: 1 },
        ],
      },
      {
        speaker: 'Clerk',
        japanese: '二千五百円です。',
        english: 'It is 2,500 yen.',
        choices: null,
      },
      {
        speaker: 'You',
        japanese: null,
        english: 'Decide to buy it.',
        choices: [
          { text: 'じゃあ、これをください。カードで払えますか。', english: "Then, I'll take this. Can I pay by card?", score: 3 },
          { text: 'これをください。', english: "I'll take this.", score: 2 },
          { text: '高いですね。', english: "That's expensive.", score: 1 },
        ],
      },
      {
        speaker: 'Clerk',
        japanese: 'はい、カードも大丈夫です。ありがとうございます。',
        english: 'Yes, cards are fine. Thank you.',
        choices: null,
      },
      {
        speaker: 'You',
        japanese: null,
        english: 'Thank them and leave.',
        choices: [
          { text: 'ありがとうございました。', english: 'Thank you very much.', score: 3 },
          { text: 'どうも。', english: 'Thanks.', score: 2 },
          { text: 'はい。', english: 'Yes.', score: 1 },
        ],
      },
    ],
  },
  {
    id: 5,
    title: 'At the Station',
    titleJp: '駅で',
    setting: 'You need to buy a train ticket and find the right platform.',
    exchanges: [
      {
        speaker: 'You',
        japanese: null,
        english: 'Ask the station staff about tickets.',
        choices: [
          { text: 'すみません。東京駅までの切符を一枚お願いします。', english: 'Excuse me. One ticket to Tokyo Station, please.', score: 3 },
          { text: '東京駅まで。', english: 'To Tokyo Station.', score: 2 },
          { text: '切符はどこですか。', english: 'Where are tickets?', score: 1 },
        ],
      },
      {
        speaker: 'Staff',
        japanese: '東京駅ですね。片道ですか、往復ですか。',
        english: 'Tokyo Station, right? One-way or round trip?',
        choices: null,
      },
      {
        speaker: 'You',
        japanese: null,
        english: 'Tell them what kind of ticket you want.',
        choices: [
          { text: '片道をお願いします。いくらですか。', english: 'One-way, please. How much is it?', score: 3 },
          { text: '片道。', english: 'One-way.', score: 2 },
          { text: '分かりません。', english: "I don't understand.", score: 1 },
        ],
      },
      {
        speaker: 'Staff',
        japanese: '三百六十円です。電車は三番線から出ます。',
        english: 'It is 360 yen. The train departs from platform 3.',
        choices: null,
      },
      {
        speaker: 'You',
        japanese: null,
        english: 'Confirm the platform and ask about timing.',
        choices: [
          { text: '三番線ですね。次の電車は何時ですか。', english: 'Platform 3, right? What time is the next train?', score: 3 },
          { text: '何時ですか。', english: 'What time?', score: 2 },
          { text: 'ありがとうございます。', english: 'Thank you.', score: 2 },
        ],
      },
      {
        speaker: 'Staff',
        japanese: '次は十時十五分です。あと五分です。',
        english: 'The next one is at 10:15. Five more minutes.',
        choices: null,
      },
      {
        speaker: 'You',
        japanese: null,
        english: 'Ask about how long the ride takes.',
        choices: [
          { text: '東京駅までどのくらいかかりますか。', english: 'How long does it take to Tokyo Station?', score: 3 },
          { text: 'ありがとうございます。', english: 'Thank you.', score: 2 },
          { text: '急ぎます。', english: "I'll hurry.", score: 1 },
        ],
      },
      {
        speaker: 'Staff',
        japanese: '約三十分です。お気をつけて。',
        english: 'About 30 minutes. Please take care.',
        choices: null,
      },
      {
        speaker: 'You',
        japanese: null,
        english: 'Thank them and head to the platform.',
        choices: [
          { text: 'ありがとうございました。行ってきます。', english: 'Thank you very much. I am off!', score: 3 },
          { text: 'ありがとう。', english: 'Thanks.', score: 2 },
          { text: 'はい。', english: 'Yes.', score: 1 },
        ],
      },
    ],
  },
  {
    id: 6,
    title: 'Making Plans',
    titleJp: '計画を立てる',
    setting: 'You and a friend are making plans for the weekend.',
    exchanges: [
      {
        speaker: 'Yuki',
        japanese: '週末は何をしますか。',
        english: 'What are you doing this weekend?',
        choices: null,
      },
      {
        speaker: 'You',
        japanese: null,
        english: 'Tell them you have no plans and suggest something.',
        choices: [
          { text: 'まだ何も決めていません。一緒にどこかに行きませんか。', english: "I haven't decided anything yet. Shall we go somewhere together?", score: 3 },
          { text: '何もありません。', english: 'Nothing.', score: 2 },
          { text: '忙しいです。', english: 'I am busy.', score: 1 },
        ],
      },
      {
        speaker: 'Yuki',
        japanese: 'いいですね！映画を見に行きませんか。新しい映画がありますよ。',
        english: "Sounds good! Shall we go see a movie? There's a new movie.",
        choices: null,
      },
      {
        speaker: 'You',
        japanese: null,
        english: 'Respond to the movie suggestion.',
        choices: [
          { text: 'いいですね！何時に会いましょうか。', english: 'Sounds great! What time shall we meet?', score: 3 },
          { text: 'はい。', english: 'Yes.', score: 2 },
          { text: '映画はあまり好きじゃないです。', english: "I don't really like movies.", score: 1 },
        ],
      },
      {
        speaker: 'Yuki',
        japanese: '映画は二時からです。一時半に駅で会いましょうか。',
        english: 'The movie is from 2 o\'clock. Shall we meet at the station at 1:30?',
        choices: null,
      },
      {
        speaker: 'You',
        japanese: null,
        english: 'Confirm the meeting time and suggest something after.',
        choices: [
          { text: '一時半ですね。映画の後で、ご飯を食べに行きませんか。', english: '1:30, right? After the movie, shall we go eat?', score: 3 },
          { text: '一時半ですね。分かりました。', english: '1:30, right? Got it.', score: 2 },
          { text: 'ちょっと早いです。', english: "That's a bit early.", score: 1 },
        ],
      },
      {
        speaker: 'Yuki',
        japanese: 'いいですね！駅の近くにおいしいラーメン屋がありますよ。',
        english: "Sounds good! There's a delicious ramen shop near the station.",
        choices: null,
      },
      {
        speaker: 'You',
        japanese: null,
        english: 'Express excitement and confirm the plan.',
        choices: [
          { text: 'ラーメンが大好きです！じゃあ、土曜日に会いましょう。楽しみにしています。', english: "I love ramen! Then, let's meet on Saturday. I'm looking forward to it.", score: 3 },
          { text: 'じゃあ、土曜日に。', english: 'Then, Saturday.', score: 2 },
          { text: 'ラーメンはちょっと...', english: 'Ramen is a bit...', score: 1 },
        ],
      },
    ],
  },
];

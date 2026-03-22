export const kanjiOrigins = [
  // ===== NATURE =====
  {
    kanji: '山',
    meaning: 'mountain',
    reading: 'やま',
    ancientForm: 'Three pointed peaks rising from the ground',
    evolution: [
      'A drawing of three jagged mountain peaks on a horizon line',
      'The peaks became three vertical strokes on a base line',
      'Modern kanji shows one tall center peak with two shorter side peaks'
    ],
    visualHint: 'Look at it sideways and you can see three mountain peaks — the middle one tallest, like a real mountain range skyline.',
    category: 'nature',
    funFact: 'Japan is about 73% mountainous. The kanji 山 appears in countless place names, including 富士山 (Fujisan / Mt. Fuji).'
  },
  {
    kanji: '川',
    meaning: 'river',
    reading: 'かわ',
    ancientForm: 'Three wavy lines flowing downward like streams of water',
    evolution: [
      'Three curving, wavy vertical lines representing flowing water',
      'The waves straightened into three parallel flowing strokes',
      'Modern kanji is three smooth vertical strokes — the center one straight, the sides slightly curved'
    ],
    visualHint: 'Three streams of water flowing side by side — you can almost hear them rushing past if you stare long enough.',
    category: 'nature',
    funFact: 'Many Japanese family names contain 川, such as 川口 (Kawaguchi, "river mouth") and 中川 (Nakagawa, "middle river").'
  },
  {
    kanji: '木',
    meaning: 'tree',
    reading: 'き',
    ancientForm: 'A tree trunk with branches spreading upward and roots below',
    evolution: [
      'A sketch of a full tree with spreading branches above and roots below',
      'The branches and roots simplified into diagonal strokes from a vertical trunk',
      'Modern kanji shows a vertical trunk with two branches and a horizontal line'
    ],
    visualHint: 'It looks like a stick-figure tree: a trunk going straight up, with two branches stretching out and down.',
    category: 'nature',
    funFact: 'Stack two 木 and you get 林 (grove). Stack three and you get 森 (forest). Japanese kanji loves multiplication!'
  },
  {
    kanji: '林',
    meaning: 'grove',
    reading: 'はやし',
    ancientForm: 'Two trees standing side by side',
    evolution: [
      'Two separate tree pictographs drawn next to each other',
      'The two trees merged closer together sharing space',
      'Modern kanji is literally two 木 (tree) characters side by side'
    ],
    visualHint: 'Two trees hanging out together — not quite a crowd, just a nice little grove. Like a buddy-cop movie, but with trees.',
    category: 'nature',
    funFact: 'The progression from 木 to 林 to 森 is one of the most elegant examples of how kanji builds meaning through repetition.'
  },
  {
    kanji: '森',
    meaning: 'forest',
    reading: 'もり',
    ancientForm: 'Three trees clustered together — one on top, two below',
    evolution: [
      'Three tree pictographs arranged in a triangular cluster',
      'One tree placed above two others to suggest dense growth',
      'Modern kanji stacks one 木 on top of 林 (two trees) to mean "forest"'
    ],
    visualHint: 'One tree on top of two trees — three trees together make a thick forest. It looks like a pyramid of trees!',
    category: 'nature',
    funFact: 'The word 森林 (shinrin) combines both "forest" kanji for emphasis, and 森林浴 (shinrin-yoku, "forest bathing") is a Japanese wellness practice.'
  },
  {
    kanji: '火',
    meaning: 'fire',
    reading: 'ひ',
    ancientForm: 'Flames leaping upward from a burning base',
    evolution: [
      'A drawing of a bonfire with flames rising and sparks flying outward',
      'The flames simplified into a central peak with two side sparks',
      'Modern kanji shows a central flame with two sparks flying off to the sides'
    ],
    visualHint: 'A person sitting cross-legged by a campfire, with two sparks shooting off to each side. Feel the warmth!',
    category: 'nature',
    funFact: 'Tuesday in Japanese is 火曜日 (kayoubi, "fire day"), linked to the planet Mars, which the Japanese call 火星 (kasei, "fire star").'
  },
  {
    kanji: '水',
    meaning: 'water',
    reading: 'みず',
    ancientForm: 'A central stream with water splashing off to the sides',
    evolution: [
      'A flowing river current with splashes and ripples on both sides',
      'The stream became a vertical stroke with curved splashes',
      'Modern kanji has a central flowing stroke with droplets spraying left and right'
    ],
    visualHint: 'Imagine a fountain — water shooting up the center stroke, and droplets splashing off to both sides.',
    category: 'nature',
    funFact: 'Wednesday in Japanese is 水曜日 (suiyoubi, "water day"), linked to the planet Mercury, called 水星 (suisei, "water star").'
  },
  {
    kanji: '日',
    meaning: 'sun',
    reading: 'ひ',
    ancientForm: 'A circle with a dot in the center representing the sun',
    evolution: [
      'A round circle with a dot or line inside, depicting the sun with a sunspot',
      'The circle squared off and the dot became a horizontal line',
      'Modern kanji is a rectangle with a horizontal line through the middle'
    ],
    visualHint: 'A window with the blinds half-closed — the sun is so bright you had to pull them down! Also looks like a tiny TV screen.',
    category: 'nature',
    funFact: 'Japan is called 日本 (nihon/nippon), meaning "origin of the sun." This is why Japan is known as "The Land of the Rising Sun."'
  },
  {
    kanji: '月',
    meaning: 'moon',
    reading: 'つき',
    ancientForm: 'A crescent moon shape with lines showing its surface',
    evolution: [
      'A curved crescent moon with markings representing craters or shadows',
      'The crescent straightened into an angular shape with interior lines',
      'Modern kanji is a rectangular frame with two horizontal lines inside'
    ],
    visualHint: 'A crescent moon that got shy and squared off its edges. The two lines inside are craters you can see on a clear night.',
    category: 'nature',
    funFact: 'Monday in Japanese is 月曜日 (getsuyoubi, "moon day") — just like English "Monday" comes from "Moon day."'
  },
  {
    kanji: '雨',
    meaning: 'rain',
    reading: 'あめ',
    ancientForm: 'Clouds at the top with raindrops falling beneath',
    evolution: [
      'A horizontal cloud layer with vertical lines and dots for falling rain',
      'The cloud became a framed top, with dots arranged below for drops',
      'Modern kanji shows a flat cloud ceiling with four raindrop dots falling inside'
    ],
    visualHint: 'A window frame (the top part) and when you look through it, you see four raindrops falling. A rainy day viewed from indoors!',
    category: 'nature',
    funFact: 'Japan has a dedicated rainy season called 梅雨 (tsuyu/baiu, "plum rain") in June-July, named because plums ripen during this period.'
  },
  {
    kanji: '石',
    meaning: 'stone',
    reading: 'いし',
    ancientForm: 'A cliff face with a large rock fallen at its base',
    evolution: [
      'A picture of a steep cliff with a boulder sitting beneath it',
      'The cliff became an angular top, the rock a square shape below',
      'Modern kanji shows a cliff ledge on top with a solid stone block beneath'
    ],
    visualHint: 'A cliff edge (the top-left angle) with a chunky block of stone sitting under it. Like a rock that just broke off a mountainside.',
    category: 'nature',
    funFact: 'Japanese rock gardens (石庭, sekitei) are designed for meditation. Each stone is placed with extreme care to represent mountains or islands.'
  },
  {
    kanji: '田',
    meaning: 'rice field',
    reading: 'た',
    ancientForm: 'A square paddy field divided into four sections by irrigation paths',
    evolution: [
      'An aerial view of rice paddies divided by water channels into a grid',
      'The organic field shapes straightened into a neat cross inside a square',
      'Modern kanji is a square divided into four equal parts by a cross'
    ],
    visualHint: 'Look at it from a plane window — a perfectly divided rice paddy with water channels making a tic-tac-toe grid. No one has played yet!',
    category: 'nature',
    funFact: 'The surname 田中 (Tanaka, "in the rice field") is one of the most common Japanese family names, reflecting Japan\'s agricultural roots.'
  },

  // ===== PEOPLE & BODY =====
  {
    kanji: '人',
    meaning: 'person',
    reading: 'ひと',
    ancientForm: 'A person standing in profile, leaning slightly forward as if walking',
    evolution: [
      'A side-view sketch of a human figure with head, body, and legs',
      'The figure simplified into two diagonal strokes suggesting legs in motion',
      'Modern kanji shows two strokes leaning against each other like a person mid-stride'
    ],
    visualHint: 'Two legs walking! Or think of two people leaning on each other for support — because people need people.',
    category: 'people',
    funFact: 'The kanji 人 is one of the most frequently used in Japanese. The phrase 一人 (hitori, "one person") and 二人 (futari, "two people") have special readings.'
  },
  {
    kanji: '大',
    meaning: 'big',
    reading: 'おお',
    ancientForm: 'A person standing with arms spread wide open to show something large',
    evolution: [
      'A front-facing figure with arms stretched out as wide as possible',
      'The figure simplified into a cross shape with legs spread',
      'Modern kanji looks like a person stretching both arms out to say "it was THIS big!"'
    ],
    visualHint: 'A person doing a star jump, arms and legs spread wide, shouting "I am BIG!" — the universal gesture for "this big!"',
    category: 'people',
    funFact: 'During the Obon festival, giant bonfires in the shape of 大 are lit on mountains around Kyoto in a ceremony called 大文字焼き (Daimonji-yaki).'
  },
  {
    kanji: '女',
    meaning: 'woman',
    reading: 'おんな',
    ancientForm: 'A person kneeling gracefully with hands crossed in front',
    evolution: [
      'A figure kneeling in a traditional seated posture with crossed arms',
      'The posture simplified into sweeping curved strokes',
      'Modern kanji captures the elegant curve of a figure kneeling with crossed hands'
    ],
    visualHint: 'A dancer doing a graceful curtsy, with one leg crossed behind the other and arms sweeping down. Pure elegance in three strokes.',
    category: 'people',
    funFact: 'Three 女 together make 姦 (kashimashii), meaning "noisy" or "wicked" — a rather sexist ancient view that is recognized as outdated today.'
  },
  {
    kanji: '子',
    meaning: 'child',
    reading: 'こ',
    ancientForm: 'A baby with a large head, small body, and outstretched arms',
    evolution: [
      'A drawing of an infant with an oversized head and tiny waving arms',
      'The baby simplified into a head, body line, and small arms',
      'Modern kanji shows a baby shape with a big head, reaching arms, and swaddled body'
    ],
    visualHint: 'A little baby reaching up its arms, wanting to be picked up. The top is the head, the middle stroke is the outstretched arms, and the bottom curves like a onesie.',
    category: 'people',
    funFact: 'The character 子 is traditionally used in Japanese girls\' names (like 花子 Hanako, 陽子 Yoko), though this trend has declined in recent decades.'
  },
  {
    kanji: '口',
    meaning: 'mouth',
    reading: 'くち',
    ancientForm: 'An open mouth viewed from the front',
    evolution: [
      'A round, wide-open mouth shape ready to speak or eat',
      'The round opening squared off into a neat rectangle',
      'Modern kanji is a simple open square — a mouth ready for anything'
    ],
    visualHint: 'A perfectly square "O" face of surprise. Imagine someone going "oh!" and their mouth freezing into a little box shape.',
    category: 'body',
    funFact: 'The kanji 口 is used as a counter for population (人口, jinkou) and also means "entrance" (入口, iriguchi) — both things a mouth does: counts and lets things in!'
  },
  {
    kanji: '目',
    meaning: 'eye',
    reading: 'め',
    ancientForm: 'An eye shape turned vertically with the pupil visible inside',
    evolution: [
      'A horizontal eye shape with lash lines and a clear pupil in the center',
      'The eye rotated 90 degrees to stand upright with horizontal lines inside',
      'Modern kanji is a vertical rectangle with two lines inside — an eye turned on its side'
    ],
    visualHint: 'Turn your head sideways and you will see it — an eye with the pupil lines staring right at you. The ancient scribes just rotated the eye 90 degrees!',
    category: 'body',
    funFact: 'The expression 目から鱗 (me kara uroko, "scales from the eyes") means to have a revelation — similar to "scales falling from your eyes" in English.'
  },
  {
    kanji: '耳',
    meaning: 'ear',
    reading: 'みみ',
    ancientForm: 'The outer shape of a human ear with inner curves',
    evolution: [
      'A detailed drawing of an ear with the outer rim and inner canal folds',
      'The ear curves straightened into horizontal lines within a frame',
      'Modern kanji shows the rectangular outer ear with three inner horizontal ridges'
    ],
    visualHint: 'An ear viewed from the side — you can see the outer rim on the right and the inner ridges as horizontal lines. Stick it on the side of 目 and you have got a face!',
    category: 'body',
    funFact: 'The phrase 耳が痛い (mimi ga itai, "my ears hurt") does not mean physical pain — it means the truth is hard to hear, like "that hits close to home."'
  },
  {
    kanji: '手',
    meaning: 'hand',
    reading: 'て',
    ancientForm: 'A hand with five fingers spread open, viewed from above',
    evolution: [
      'An open palm with all five fingers clearly visible',
      'The fingers merged and the hand became more abstract strokes',
      'Modern kanji shows a palm with simplified finger strokes branching from a wrist'
    ],
    visualHint: 'A hand waving at you — you can see the fingers (the top strokes) branching off from the arm (the vertical stroke). Give it a wave back!',
    category: 'body',
    funFact: 'The word 手紙 (tegami) means "letter" in Japanese, but in Chinese it means "toilet paper" — a famously awkward false friend between the languages!'
  },
  {
    kanji: '足',
    meaning: 'foot',
    reading: 'あし',
    ancientForm: 'A kneecap above with a foot below, showing the whole leg from the knee down',
    evolution: [
      'A drawing of a bent knee connected to a foot stepping forward',
      'The knee became a square shape on top, the foot a crossed shape below',
      'Modern kanji shows a kneecap (top box) connected to a foot (bottom strokes) in motion'
    ],
    visualHint: 'A knee (the boxy top part) attached to a foot (the bottom cross shape) about to take a step. The whole lower leg, ready to walk!',
    category: 'body',
    funFact: 'The phrase 足を引っ張る (ashi wo hipparu, "to pull someone\'s leg") means to hold someone back or drag them down — not to joke around like in English!'
  },

  // ===== ANIMALS =====
  {
    kanji: '馬',
    meaning: 'horse',
    reading: 'うま',
    ancientForm: 'A horse viewed from the side with a flowing mane, body, and four legs',
    evolution: [
      'A detailed side-view sketch of a galloping horse with mane flowing',
      'The mane simplified to top strokes, the body to a frame, and legs to bottom dots',
      'Modern kanji preserves the mane (top), body (middle box), and four legs (bottom strokes)'
    ],
    visualHint: 'Look for the horse! The top part is the windswept mane, the middle is the strong body, and the four little strokes at the bottom are the legs galloping.',
    category: 'animals',
    funFact: 'The phrase 馬が合う (uma ga au, "the horses match") means to get along well with someone — like two horses running in sync.'
  },
  {
    kanji: '魚',
    meaning: 'fish',
    reading: 'さかな',
    ancientForm: 'A fish viewed from the side with head, scales, and tail fin',
    evolution: [
      'A complete fish drawing with a pointed head, scaled body, and forked tail',
      'The head became angular, the scales turned to a cross pattern, the tail to four dots',
      'Modern kanji shows the head on top, a crosshatch body in the middle, and the tail fin as four dots at the bottom'
    ],
    visualHint: 'A fish standing on its tail! The top is the pointy head, the middle cross is the scaly body, and the four dots at the bottom are the tail fin splashing.',
    category: 'animals',
    funFact: 'Before the word さかな meant "fish," it actually meant "snacks served with sake." The meaning shifted because fish was the most common drinking snack!'
  },
  {
    kanji: '鳥',
    meaning: 'bird',
    reading: 'とり',
    ancientForm: 'A bird perched with a crest on its head, wings folded, and long tail feathers',
    evolution: [
      'A side-view sketch of a crested bird with a visible eye, wings, and trailing tail',
      'The crest became top strokes, the eye a horizontal line, the body a box, and tail bottom strokes',
      'Modern kanji captures the crest, eye, feathered body, and tail in an elegant vertical stack'
    ],
    visualHint: 'A bird sitting on a wire! The top dash is the crest, you can spot the little eye inside the head area, and the bottom is the long fancy tail hanging down.',
    category: 'animals',
    funFact: 'The mythical 火の鳥 (hi no tori, "firebird/phoenix") inspired Osamu Tezuka\'s famous manga series, considered one of his life\'s greatest works.'
  },
  {
    kanji: '犬',
    meaning: 'dog',
    reading: 'いぬ',
    ancientForm: 'A dog standing on hind legs viewed from the side',
    evolution: [
      'A sketch of a dog with its head up, body leaning forward, and a curled tail',
      'The figure simplified into the "big" character with an extra dot for the ear or tail',
      'Modern kanji is 大 (big/person) plus a small dot — the dot is the dog\'s ear perking up or tail wagging'
    ],
    visualHint: 'It is the kanji for "big" (大) with a tiny dot — imagine a big dog wagging its little tail (the dot). The dot is what makes a person into a dog!',
    category: 'animals',
    funFact: 'The famous story of Hachiko (ハチ公), the loyal Akita dog who waited at Shibuya station for his deceased owner for nine years, is one of Japan\'s most beloved tales.'
  },
  {
    kanji: '牛',
    meaning: 'cow',
    reading: 'うし',
    ancientForm: 'A cow\'s head viewed from the front with two curved horns on top',
    evolution: [
      'A front-facing cow skull with two prominent curved horns and a face below',
      'The horns became a top stroke, the face simplified into vertical and horizontal lines',
      'Modern kanji shows the horns (top horizontal stroke) and the head (vertical line with cross)'
    ],
    visualHint: 'A cow staring right at you! The top stroke is the pair of horns, and below is the long face. Moo!',
    category: 'animals',
    funFact: 'Kobe beef (神戸牛, Kobe-gyu) cattle are famously pampered. Contrary to popular myth, they are not massaged with beer, but they are raised with extreme care.'
  },

  // ===== OBJECTS =====
  {
    kanji: '門',
    meaning: 'gate',
    reading: 'もん',
    ancientForm: 'Two swinging saloon-style doors viewed from the front',
    evolution: [
      'A drawing of a traditional double-door gate with two hinged panels',
      'Each door became a detailed panel with posts and frames',
      'Modern kanji shows two identical door panels standing side by side — a perfectly symmetrical gate'
    ],
    visualHint: 'Two saloon doors in a Western movie! Push them open and walk right through. Each half is one door of the gate, swinging on its hinges.',
    category: 'objects',
    funFact: 'The famous Kaminarimon (雷門, "Thunder Gate") at Senso-ji temple in Asakusa, Tokyo, is one of the most photographed landmarks in Japan.'
  },
  {
    kanji: '車',
    meaning: 'vehicle',
    reading: 'くるま',
    ancientForm: 'A chariot wheel viewed from above with an axle through the center',
    evolution: [
      'A bird\'s-eye view of a chariot showing the wheels, axle, and body',
      'The round wheel became a square frame with a cross axle through it',
      'Modern kanji shows a wheel (the box with a cross) and an axle (the vertical line extending top and bottom)'
    ],
    visualHint: 'Look down at a go-kart from directly above — the square is the wheel with spokes, and the line going through is the axle connecting everything.',
    category: 'objects',
    funFact: 'Despite 車 originally meaning "chariot," today 自動車 (jidousha, "self-moving vehicle") is the standard word for "automobile."'
  },
  {
    kanji: '刀',
    meaning: 'sword',
    reading: 'かたな',
    ancientForm: 'A curved blade with a handle, viewed from the side',
    evolution: [
      'A drawing of a single-edged curved sword with a clear blade and grip',
      'The curve simplified into a sweeping stroke with a small hook for the handle',
      'Modern kanji is a sleek curved stroke (the blade) with a short stroke (the handle guard)'
    ],
    visualHint: 'A samurai sword slicing through the air! The long swooping stroke is the curved blade, and the small stroke is the hand guard. Elegant and deadly.',
    category: 'objects',
    funFact: 'Japanese katana swords are folded up to 16 times during forging, creating over 65,000 layers of steel — the art of sword-making (刀鍛冶, katanakaji) is a living tradition.'
  },
  {
    kanji: '弓',
    meaning: 'bow',
    reading: 'ゆみ',
    ancientForm: 'A curved hunting bow with a string pulled taut',
    evolution: [
      'A drawing of a bent bow with the bowstring visible and taut',
      'The curve simplified into angular strokes with a string line',
      'Modern kanji shows the curved bow body with the taut string — ready to fire'
    ],
    visualHint: 'A bow drawn back and ready to shoot — you can see the curved body of the bow and the straight string pulled tight. Twang!',
    category: 'objects',
    funFact: 'Japanese archery (弓道, kyudo, "the way of the bow") is considered a meditative art form. The goal is not just hitting the target but achieving spiritual harmony.'
  }
];

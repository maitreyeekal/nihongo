// Katakana character data for Nihongo learning platform

export const katakana = [
  // Basic vowels
  { char: 'ア', romaji: 'a', row: 'vowel', type: 'basic' },
  { char: 'イ', romaji: 'i', row: 'vowel', type: 'basic' },
  { char: 'ウ', romaji: 'u', row: 'vowel', type: 'basic' },
  { char: 'エ', romaji: 'e', row: 'vowel', type: 'basic' },
  { char: 'オ', romaji: 'o', row: 'vowel', type: 'basic' },

  // K-row
  { char: 'カ', romaji: 'ka', row: 'k', type: 'basic' },
  { char: 'キ', romaji: 'ki', row: 'k', type: 'basic' },
  { char: 'ク', romaji: 'ku', row: 'k', type: 'basic' },
  { char: 'ケ', romaji: 'ke', row: 'k', type: 'basic' },
  { char: 'コ', romaji: 'ko', row: 'k', type: 'basic' },

  // S-row
  { char: 'サ', romaji: 'sa', row: 's', type: 'basic' },
  { char: 'シ', romaji: 'shi', row: 's', type: 'basic' },
  { char: 'ス', romaji: 'su', row: 's', type: 'basic' },
  { char: 'セ', romaji: 'se', row: 's', type: 'basic' },
  { char: 'ソ', romaji: 'so', row: 's', type: 'basic' },

  // T-row
  { char: 'タ', romaji: 'ta', row: 't', type: 'basic' },
  { char: 'チ', romaji: 'chi', row: 't', type: 'basic' },
  { char: 'ツ', romaji: 'tsu', row: 't', type: 'basic' },
  { char: 'テ', romaji: 'te', row: 't', type: 'basic' },
  { char: 'ト', romaji: 'to', row: 't', type: 'basic' },

  // N-row
  { char: 'ナ', romaji: 'na', row: 'n', type: 'basic' },
  { char: 'ニ', romaji: 'ni', row: 'n', type: 'basic' },
  { char: 'ヌ', romaji: 'nu', row: 'n', type: 'basic' },
  { char: 'ネ', romaji: 'ne', row: 'n', type: 'basic' },
  { char: 'ノ', romaji: 'no', row: 'n', type: 'basic' },

  // H-row
  { char: 'ハ', romaji: 'ha', row: 'h', type: 'basic' },
  { char: 'ヒ', romaji: 'hi', row: 'h', type: 'basic' },
  { char: 'フ', romaji: 'fu', row: 'h', type: 'basic' },
  { char: 'ヘ', romaji: 'he', row: 'h', type: 'basic' },
  { char: 'ホ', romaji: 'ho', row: 'h', type: 'basic' },

  // M-row
  { char: 'マ', romaji: 'ma', row: 'm', type: 'basic' },
  { char: 'ミ', romaji: 'mi', row: 'm', type: 'basic' },
  { char: 'ム', romaji: 'mu', row: 'm', type: 'basic' },
  { char: 'メ', romaji: 'me', row: 'm', type: 'basic' },
  { char: 'モ', romaji: 'mo', row: 'm', type: 'basic' },

  // Y-row
  { char: 'ヤ', romaji: 'ya', row: 'y', type: 'basic' },
  { char: 'ユ', romaji: 'yu', row: 'y', type: 'basic' },
  { char: 'ヨ', romaji: 'yo', row: 'y', type: 'basic' },

  // R-row
  { char: 'ラ', romaji: 'ra', row: 'r', type: 'basic' },
  { char: 'リ', romaji: 'ri', row: 'r', type: 'basic' },
  { char: 'ル', romaji: 'ru', row: 'r', type: 'basic' },
  { char: 'レ', romaji: 're', row: 'r', type: 'basic' },
  { char: 'ロ', romaji: 'ro', row: 'r', type: 'basic' },

  // W-row + n
  { char: 'ワ', romaji: 'wa', row: 'w', type: 'basic' },
  { char: 'ヲ', romaji: 'wo', row: 'w', type: 'basic' },
  { char: 'ン', romaji: 'n', row: 'w', type: 'basic' },

  // Dakuten - G
  { char: 'ガ', romaji: 'ga', row: 'g', type: 'dakuten' },
  { char: 'ギ', romaji: 'gi', row: 'g', type: 'dakuten' },
  { char: 'グ', romaji: 'gu', row: 'g', type: 'dakuten' },
  { char: 'ゲ', romaji: 'ge', row: 'g', type: 'dakuten' },
  { char: 'ゴ', romaji: 'go', row: 'g', type: 'dakuten' },

  // Dakuten - Z
  { char: 'ザ', romaji: 'za', row: 'z', type: 'dakuten' },
  { char: 'ジ', romaji: 'ji', row: 'z', type: 'dakuten' },
  { char: 'ズ', romaji: 'zu', row: 'z', type: 'dakuten' },
  { char: 'ゼ', romaji: 'ze', row: 'z', type: 'dakuten' },
  { char: 'ゾ', romaji: 'zo', row: 'z', type: 'dakuten' },

  // Dakuten - D
  { char: 'ダ', romaji: 'da', row: 'd', type: 'dakuten' },
  { char: 'ヂ', romaji: 'di', row: 'd', type: 'dakuten' },
  { char: 'ヅ', romaji: 'du', row: 'd', type: 'dakuten' },
  { char: 'デ', romaji: 'de', row: 'd', type: 'dakuten' },
  { char: 'ド', romaji: 'do', row: 'd', type: 'dakuten' },

  // Dakuten - B
  { char: 'バ', romaji: 'ba', row: 'b', type: 'dakuten' },
  { char: 'ビ', romaji: 'bi', row: 'b', type: 'dakuten' },
  { char: 'ブ', romaji: 'bu', row: 'b', type: 'dakuten' },
  { char: 'ベ', romaji: 'be', row: 'b', type: 'dakuten' },
  { char: 'ボ', romaji: 'bo', row: 'b', type: 'dakuten' },

  // Handakuten - P
  { char: 'パ', romaji: 'pa', row: 'p', type: 'handakuten' },
  { char: 'ピ', romaji: 'pi', row: 'p', type: 'handakuten' },
  { char: 'プ', romaji: 'pu', row: 'p', type: 'handakuten' },
  { char: 'ペ', romaji: 'pe', row: 'p', type: 'handakuten' },
  { char: 'ポ', romaji: 'po', row: 'p', type: 'handakuten' },

  // Combos - KY
  { char: 'キャ', romaji: 'kya', row: 'ky', type: 'combo' },
  { char: 'キュ', romaji: 'kyu', row: 'ky', type: 'combo' },
  { char: 'キョ', romaji: 'kyo', row: 'ky', type: 'combo' },

  // Combos - SH
  { char: 'シャ', romaji: 'sha', row: 'sh', type: 'combo' },
  { char: 'シュ', romaji: 'shu', row: 'sh', type: 'combo' },
  { char: 'ショ', romaji: 'sho', row: 'sh', type: 'combo' },

  // Combos - CH
  { char: 'チャ', romaji: 'cha', row: 'ch', type: 'combo' },
  { char: 'チュ', romaji: 'chu', row: 'ch', type: 'combo' },
  { char: 'チョ', romaji: 'cho', row: 'ch', type: 'combo' },

  // Combos - NY
  { char: 'ニャ', romaji: 'nya', row: 'ny', type: 'combo' },
  { char: 'ニュ', romaji: 'nyu', row: 'ny', type: 'combo' },
  { char: 'ニョ', romaji: 'nyo', row: 'ny', type: 'combo' },

  // Combos - HY
  { char: 'ヒャ', romaji: 'hya', row: 'hy', type: 'combo' },
  { char: 'ヒュ', romaji: 'hyu', row: 'hy', type: 'combo' },
  { char: 'ヒョ', romaji: 'hyo', row: 'hy', type: 'combo' },

  // Combos - MY
  { char: 'ミャ', romaji: 'mya', row: 'my', type: 'combo' },
  { char: 'ミュ', romaji: 'myu', row: 'my', type: 'combo' },
  { char: 'ミョ', romaji: 'myo', row: 'my', type: 'combo' },

  // Combos - RY
  { char: 'リャ', romaji: 'rya', row: 'ry', type: 'combo' },
  { char: 'リュ', romaji: 'ryu', row: 'ry', type: 'combo' },
  { char: 'リョ', romaji: 'ryo', row: 'ry', type: 'combo' },
];

// Loanwords commonly written in katakana
export const loanwords = [
  { japanese: 'コーヒー', reading: 'koohii', english: 'coffee' },
  { japanese: 'テレビ', reading: 'terebi', english: 'TV / television' },
  { japanese: 'パソコン', reading: 'pasokon', english: 'computer' },
  { japanese: 'アイスクリーム', reading: 'aisukuriimu', english: 'ice cream' },
  { japanese: 'レストラン', reading: 'resutoran', english: 'restaurant' },
  { japanese: 'ホテル', reading: 'hoteru', english: 'hotel' },
  { japanese: 'タクシー', reading: 'takushii', english: 'taxi' },
  { japanese: 'スマートフォン', reading: 'sumaatofon', english: 'smartphone' },
  { japanese: 'インターネット', reading: 'intaanetto', english: 'internet' },
  { japanese: 'チョコレート', reading: 'chokoretto', english: 'chocolate' },
];

// Level 3: First 25 basic katakana characters (vowels + K, S, T, N rows)
export const katakanaLevel3 = katakana.slice(0, 25);

// Level 4: Remaining katakana + loanwords
export const katakanaLevel4 = {
  characters: katakana.slice(25),
  loanwords,
};

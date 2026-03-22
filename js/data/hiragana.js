// Hiragana character data for Nihongo learning platform

export const hiragana = [
  // Basic vowels
  { char: 'あ', romaji: 'a', row: 'vowel', type: 'basic' },
  { char: 'い', romaji: 'i', row: 'vowel', type: 'basic' },
  { char: 'う', romaji: 'u', row: 'vowel', type: 'basic' },
  { char: 'え', romaji: 'e', row: 'vowel', type: 'basic' },
  { char: 'お', romaji: 'o', row: 'vowel', type: 'basic' },

  // K-row
  { char: 'か', romaji: 'ka', row: 'k', type: 'basic' },
  { char: 'き', romaji: 'ki', row: 'k', type: 'basic' },
  { char: 'く', romaji: 'ku', row: 'k', type: 'basic' },
  { char: 'け', romaji: 'ke', row: 'k', type: 'basic' },
  { char: 'こ', romaji: 'ko', row: 'k', type: 'basic' },

  // S-row
  { char: 'さ', romaji: 'sa', row: 's', type: 'basic' },
  { char: 'し', romaji: 'shi', row: 's', type: 'basic' },
  { char: 'す', romaji: 'su', row: 's', type: 'basic' },
  { char: 'せ', romaji: 'se', row: 's', type: 'basic' },
  { char: 'そ', romaji: 'so', row: 's', type: 'basic' },

  // T-row
  { char: 'た', romaji: 'ta', row: 't', type: 'basic' },
  { char: 'ち', romaji: 'chi', row: 't', type: 'basic' },
  { char: 'つ', romaji: 'tsu', row: 't', type: 'basic' },
  { char: 'て', romaji: 'te', row: 't', type: 'basic' },
  { char: 'と', romaji: 'to', row: 't', type: 'basic' },

  // N-row
  { char: 'な', romaji: 'na', row: 'n', type: 'basic' },
  { char: 'に', romaji: 'ni', row: 'n', type: 'basic' },
  { char: 'ぬ', romaji: 'nu', row: 'n', type: 'basic' },
  { char: 'ね', romaji: 'ne', row: 'n', type: 'basic' },
  { char: 'の', romaji: 'no', row: 'n', type: 'basic' },

  // H-row
  { char: 'は', romaji: 'ha', row: 'h', type: 'basic' },
  { char: 'ひ', romaji: 'hi', row: 'h', type: 'basic' },
  { char: 'ふ', romaji: 'fu', row: 'h', type: 'basic' },
  { char: 'へ', romaji: 'he', row: 'h', type: 'basic' },
  { char: 'ほ', romaji: 'ho', row: 'h', type: 'basic' },

  // M-row
  { char: 'ま', romaji: 'ma', row: 'm', type: 'basic' },
  { char: 'み', romaji: 'mi', row: 'm', type: 'basic' },
  { char: 'む', romaji: 'mu', row: 'm', type: 'basic' },
  { char: 'め', romaji: 'me', row: 'm', type: 'basic' },
  { char: 'も', romaji: 'mo', row: 'm', type: 'basic' },

  // Y-row
  { char: 'や', romaji: 'ya', row: 'y', type: 'basic' },
  { char: 'ゆ', romaji: 'yu', row: 'y', type: 'basic' },
  { char: 'よ', romaji: 'yo', row: 'y', type: 'basic' },

  // R-row
  { char: 'ら', romaji: 'ra', row: 'r', type: 'basic' },
  { char: 'り', romaji: 'ri', row: 'r', type: 'basic' },
  { char: 'る', romaji: 'ru', row: 'r', type: 'basic' },
  { char: 'れ', romaji: 're', row: 'r', type: 'basic' },
  { char: 'ろ', romaji: 'ro', row: 'r', type: 'basic' },

  // W-row + n
  { char: 'わ', romaji: 'wa', row: 'w', type: 'basic' },
  { char: 'を', romaji: 'wo', row: 'w', type: 'basic' },
  { char: 'ん', romaji: 'n', row: 'w', type: 'basic' },

  // Dakuten - G
  { char: 'が', romaji: 'ga', row: 'g', type: 'dakuten' },
  { char: 'ぎ', romaji: 'gi', row: 'g', type: 'dakuten' },
  { char: 'ぐ', romaji: 'gu', row: 'g', type: 'dakuten' },
  { char: 'げ', romaji: 'ge', row: 'g', type: 'dakuten' },
  { char: 'ご', romaji: 'go', row: 'g', type: 'dakuten' },

  // Dakuten - Z
  { char: 'ざ', romaji: 'za', row: 'z', type: 'dakuten' },
  { char: 'じ', romaji: 'ji', row: 'z', type: 'dakuten' },
  { char: 'ず', romaji: 'zu', row: 'z', type: 'dakuten' },
  { char: 'ぜ', romaji: 'ze', row: 'z', type: 'dakuten' },
  { char: 'ぞ', romaji: 'zo', row: 'z', type: 'dakuten' },

  // Dakuten - D
  { char: 'だ', romaji: 'da', row: 'd', type: 'dakuten' },
  { char: 'ぢ', romaji: 'di', row: 'd', type: 'dakuten' },
  { char: 'づ', romaji: 'du', row: 'd', type: 'dakuten' },
  { char: 'で', romaji: 'de', row: 'd', type: 'dakuten' },
  { char: 'ど', romaji: 'do', row: 'd', type: 'dakuten' },

  // Dakuten - B
  { char: 'ば', romaji: 'ba', row: 'b', type: 'dakuten' },
  { char: 'び', romaji: 'bi', row: 'b', type: 'dakuten' },
  { char: 'ぶ', romaji: 'bu', row: 'b', type: 'dakuten' },
  { char: 'べ', romaji: 'be', row: 'b', type: 'dakuten' },
  { char: 'ぼ', romaji: 'bo', row: 'b', type: 'dakuten' },

  // Handakuten - P
  { char: 'ぱ', romaji: 'pa', row: 'p', type: 'handakuten' },
  { char: 'ぴ', romaji: 'pi', row: 'p', type: 'handakuten' },
  { char: 'ぷ', romaji: 'pu', row: 'p', type: 'handakuten' },
  { char: 'ぺ', romaji: 'pe', row: 'p', type: 'handakuten' },
  { char: 'ぽ', romaji: 'po', row: 'p', type: 'handakuten' },

  // Combos - KY
  { char: 'きゃ', romaji: 'kya', row: 'ky', type: 'combo' },
  { char: 'きゅ', romaji: 'kyu', row: 'ky', type: 'combo' },
  { char: 'きょ', romaji: 'kyo', row: 'ky', type: 'combo' },

  // Combos - SH
  { char: 'しゃ', romaji: 'sha', row: 'sh', type: 'combo' },
  { char: 'しゅ', romaji: 'shu', row: 'sh', type: 'combo' },
  { char: 'しょ', romaji: 'sho', row: 'sh', type: 'combo' },

  // Combos - CH
  { char: 'ちゃ', romaji: 'cha', row: 'ch', type: 'combo' },
  { char: 'ちゅ', romaji: 'chu', row: 'ch', type: 'combo' },
  { char: 'ちょ', romaji: 'cho', row: 'ch', type: 'combo' },

  // Combos - NY
  { char: 'にゃ', romaji: 'nya', row: 'ny', type: 'combo' },
  { char: 'にゅ', romaji: 'nyu', row: 'ny', type: 'combo' },
  { char: 'にょ', romaji: 'nyo', row: 'ny', type: 'combo' },

  // Combos - HY
  { char: 'ひゃ', romaji: 'hya', row: 'hy', type: 'combo' },
  { char: 'ひゅ', romaji: 'hyu', row: 'hy', type: 'combo' },
  { char: 'ひょ', romaji: 'hyo', row: 'hy', type: 'combo' },

  // Combos - MY
  { char: 'みゃ', romaji: 'mya', row: 'my', type: 'combo' },
  { char: 'みゅ', romaji: 'myu', row: 'my', type: 'combo' },
  { char: 'みょ', romaji: 'myo', row: 'my', type: 'combo' },

  // Combos - RY
  { char: 'りゃ', romaji: 'rya', row: 'ry', type: 'combo' },
  { char: 'りゅ', romaji: 'ryu', row: 'ry', type: 'combo' },
  { char: 'りょ', romaji: 'ryo', row: 'ry', type: 'combo' },
];

// Level 1: First 25 characters (vowels + K, S, T, N rows)
export const hiraganaLevel1 = hiragana.slice(0, 25);

// Level 2: Everything else
export const hiraganaLevel2 = hiragana.slice(25);

# Nihongo - Japanese Learning Platform

A self-contained web app for learning Japanese reading and writing, from hiragana through kanji and conversation practice.

## Features

- **9 progressive levels** — hiragana, katakana, kanji, vocabulary, grammar, conversations, and kanji origins
- **Visual kanji mnemonics** — pictorial breakdowns showing how kanji evolved from ancient drawings
- **3D flashcards** with spaced repetition (SM-2 algorithm)
- **Quizzes** with 70% pass threshold to track mastery
- **Audio pronunciation** via Web Speech API (Japanese voice)
- **Dark mode** toggle
- **Progress saved locally** via localStorage — no account needed

## Levels

| # | Level | Content |
|---|-------|---------|
| 1 | Hiragana Basics | First 25 hiragana: vowels + K, S, T, N rows |
| 2 | Hiragana Complete | Remaining hiragana, dakuten, combos |
| 3 | Katakana Basics | First 25 katakana characters |
| 4 | Katakana & Loanwords | Full katakana + common loanwords |
| 5 | Kanji: Numbers & Nature | Numbers 1-10, colors, nature kanji |
| 6 | Kanji: Daily Life | People, actions, time, places |
| 7 | Vocabulary & Grammar | Essential vocab and grammar patterns |
| 8 | Conversation Practice | Real-world dialogue scenarios |
| 9 | Kanji Origins | Pictorial evolution from ancient forms to modern kanji |

## Tech Stack

- Plain HTML, CSS, and JavaScript — no frameworks, no build step
- ES Modules for data files
- CSS Custom Properties for theming
- Google Fonts: Shippori Mincho, Noto Sans JP, IBM Plex Mono

## Run Locally

```bash
cd nihongo
python3 -m http.server 3000
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.

## Design

Wabi-sabi minimalist aesthetic inspired by traditional Japanese paper and ink:

- **Washi** (#F5F0E8) background with paper grain texture
- **Ai Indigo** (#3D5A80) primary accent
- **Shu Vermillion** (#C84B31) secondary accent
- **Matcha** (#7A8B69) success states
- **Kinshu Gold** (#B8860B) highlights and badges

## License

MIT

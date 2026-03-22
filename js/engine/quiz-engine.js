// Quiz engine for Nihongo learning platform
// Generates quizzes with multiple question types per level

import { hiragana, hiraganaLevel1, hiraganaLevel2 } from '../data/hiragana.js';
import { katakana, katakanaLevel3, katakanaLevel4 } from '../data/katakana.js';
import { kanji } from '../data/kanji.js';
import { vocabulary } from '../data/vocabulary.js';
import { grammar } from '../data/grammar.js';
import { dialogues } from '../data/dialogues.js';

/**
 * Fisher-Yates shuffle (in-place). Returns a new shuffled copy.
 */
export function shuffleArray(arr) {
  if (!Array.isArray(arr)) return [];
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

/**
 * Picks `count` plausible distractors from the pool, excluding the correct answer.
 * Tries to pick from items in the same category/row when possible.
 */
export function getDistractors(correct, pool, count = 3) {
  if (!Array.isArray(pool) || pool.length === 0) return [];

  // Remove the correct answer from the pool
  const filtered = pool.filter(item => {
    if (typeof correct === 'string') {
      return item !== correct;
    }
    // For object items, compare by char or meaning
    if (correct.char) return item.char !== correct.char;
    if (correct.kanji) return item.kanji !== correct.kanji;
    if (correct.japanese) return item.japanese !== correct.japanese;
    if (correct.id) return item.id !== correct.id;
    return item !== correct;
  });

  const shuffled = shuffleArray(filtered);
  return shuffled.slice(0, Math.min(count, shuffled.length));
}

/**
 * Returns the item pool and question generators for a given level.
 */
function getLevelConfig(levelId) {
  const id = Number(levelId);

  switch (id) {
    case 1:
      return { pool: hiraganaLevel1, type: 'kana', script: 'hiragana' };
    case 2:
      return { pool: hiraganaLevel2, type: 'kana', script: 'hiragana' };
    case 3:
      return { pool: katakanaLevel3, type: 'kana', script: 'katakana' };
    case 4:
      // katakanaLevel4 is an object {characters, loanwords} - use characters array
      return { pool: katakanaLevel4.characters || [], type: 'kana', script: 'katakana' };
    case 5:
      return { pool: kanji.filter(k => k.level === 5), type: 'kanji', subtype: 'meaning' };
    case 6:
      return { pool: kanji.filter(k => k.level === 6), type: 'kanji', subtype: 'reading' };
    case 7:
      return { pool: vocabulary.filter(v => v.level === 7), type: 'vocabulary', grammarPool: grammar };
    case 8:
      return { pool: dialogues, type: 'dialogue' };
    default:
      return { pool: hiraganaLevel1, type: 'kana', script: 'hiragana' };
  }
}

/**
 * Creates a kana question (char-to-reading or reading-to-char).
 */
function createKanaQuestion(item, pool, questionType) {
  if (questionType === 'char-to-reading') {
    // Show character, pick the correct romaji
    const distractorItems = getDistractors(item, pool, 3);
    const options = shuffleArray([
      item.romaji,
      ...distractorItems.map(d => d.romaji)
    ]);

    return {
      id: `${item.char}_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
      type: 'char-to-reading',
      question: `What is the reading of this character?`,
      correctAnswer: item.romaji,
      options,
      questionDisplay: item.char
    };
  } else {
    // Show romaji, pick the correct character
    const distractorItems = getDistractors(item, pool, 3);
    const options = shuffleArray([
      item.char,
      ...distractorItems.map(d => d.char)
    ]);

    return {
      id: `${item.romaji}_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
      type: 'reading-to-char',
      question: `Which character has this reading?`,
      correctAnswer: item.char,
      options,
      questionDisplay: item.romaji
    };
  }
}

/**
 * Creates a kanji question (meaning or reading).
 */
function createKanjiQuestion(item, pool, subtype) {
  if (subtype === 'meaning') {
    const distractorItems = getDistractors(item, pool, 3);
    const options = shuffleArray([
      item.meaning,
      ...distractorItems.map(d => d.meaning)
    ]);

    return {
      id: `kanji_meaning_${item.kanji}_${Date.now()}`,
      type: 'meaning',
      question: `What does this kanji mean?`,
      correctAnswer: item.meaning,
      options,
      questionDisplay: item.kanji
    };
  } else {
    // Reading question
    const distractorItems = getDistractors(item, pool, 3);
    const readingField = item.reading || item.onyomi || item.kunyomi || '';
    const options = shuffleArray([
      readingField,
      ...distractorItems.map(d => d.reading || d.onyomi || d.kunyomi || '')
    ]);

    return {
      id: `kanji_reading_${item.kanji}_${Date.now()}`,
      type: 'kanji-reading',
      question: `What is the reading of this kanji?`,
      correctAnswer: readingField,
      options,
      questionDisplay: item.kanji
    };
  }
}

/**
 * Creates a grammar question: given a grammar pattern, pick the correct meaning.
 */
function createGrammarQuestion(item, pool) {
  const distractorItems = getDistractors(item, pool, 3);
  const options = shuffleArray([
    item.meaning,
    ...distractorItems.map(d => d.meaning)
  ]);

  // Pick a random example to display
  const example = item.examples && item.examples.length > 0
    ? item.examples[Math.floor(Math.random() * item.examples.length)]
    : null;

  return {
    id: `grammar_${item.id || Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
    type: 'grammar-meaning',
    question: 'What does this grammar pattern mean?',
    correctAnswer: item.meaning,
    options,
    questionDisplay: item.pattern,
    example: example ? example.japanese : ''
  };
}

/**
 * Creates a vocabulary question.
 */
function createVocabQuestion(item, pool) {
  const meaning = item.english || item.meaning;
  const distractorItems = getDistractors(item, pool, 3);
  const options = shuffleArray([
    meaning,
    ...distractorItems.map(d => d.english || d.meaning)
  ]);

  return {
    id: `vocab_${item.japanese || item.word || Date.now()}`,
    type: 'meaning',
    question: `What does this word mean?`,
    correctAnswer: meaning,
    options,
    questionDisplay: item.japanese || item.word || ''
  };
}

/**
 * Generates a quiz of the specified length for a given level.
 * Returns an array of question objects.
 */
export function generateQuiz(levelId, questionCount = 10) {
  try {
    const config = getLevelConfig(levelId);
    const { pool, type } = config;

    if (!pool || pool.length === 0) {
      console.warn(`No data pool available for level ${levelId}`);
      return [];
    }

    const questions = [];
    const availableItems = shuffleArray(pool);
    const effectiveCount = Math.min(questionCount, availableItems.length * 2);

    for (let i = 0; i < effectiveCount; i++) {
      const item = availableItems[i % availableItems.length];

      let question;

      switch (type) {
        case 'kana': {
          // Alternate between char-to-reading and reading-to-char
          const qType = i % 2 === 0 ? 'char-to-reading' : 'reading-to-char';
          question = createKanaQuestion(item, pool, qType);
          break;
        }
        case 'kanji': {
          question = createKanjiQuestion(item, pool, config.subtype);
          break;
        }
        case 'grammar': {
          question = createGrammarQuestion(item, pool);
          break;
        }
        case 'vocabulary': {
          // For level 7, mix vocab and grammar questions
          if (config.grammarPool && i % 3 === 2) {
            const gItem = config.grammarPool[i % config.grammarPool.length];
            question = createGrammarQuestion(gItem, config.grammarPool);
          } else {
            question = createVocabQuestion(item, pool);
          }
          break;
        }
        default: {
          const qType = i % 2 === 0 ? 'char-to-reading' : 'reading-to-char';
          question = createKanaQuestion(item, pool, qType);
        }
      }

      if (question) {
        questions.push(question);
      }
    }

    return questions;
  } catch (e) {
    console.error('Failed to generate quiz:', e);
    return [];
  }
}

/**
 * Scores a set of quiz answers.
 * @param {Array} answers - Array of { questionId, selectedAnswer, correctAnswer }
 * @returns {{ score, total, percentage, mistakes[] }}
 */
export function scoreQuiz(answers) {
  try {
    if (!Array.isArray(answers)) {
      return { score: 0, total: 0, percentage: 0, mistakes: [] };
    }

    let score = 0;
    const mistakes = [];
    const total = answers.length;

    for (const answer of answers) {
      if (answer.selectedAnswer === answer.correctAnswer) {
        score++;
      } else {
        mistakes.push({
          questionId: answer.questionId,
          selected: answer.selectedAnswer,
          correct: answer.correctAnswer,
          questionDisplay: answer.questionDisplay || ''
        });
      }
    }

    const percentage = total > 0 ? Math.round((score / total) * 100) : 0;

    return { score, total, percentage, mistakes };
  } catch (e) {
    console.error('Failed to score quiz:', e);
    return { score: 0, total: 0, percentage: 0, mistakes: [] };
  }
}

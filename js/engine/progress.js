// Progress and level management engine for Nihongo learning platform

import { getProgress, saveProgress } from './storage.js';

const PASS_THRESHOLD = 70; // percentage required to pass a level
const TOTAL_LEVELS = 8;

/**
 * Checks whether a given level is unlocked.
 */
export function isLevelUnlocked(levelId) {
  try {
    const progress = getProgress();
    const level = progress.levels[levelId];
    return level ? level.unlocked === true : false;
  } catch (e) {
    console.error('Failed to check level unlock status:', e);
    return false;
  }
}

/**
 * Returns the progress data for a specific level.
 */
export function getLevelProgress(levelId) {
  try {
    const progress = getProgress();
    const level = progress.levels[levelId];
    if (!level) {
      return { unlocked: false, bestScore: 0, attempts: 0, completed: false };
    }
    return {
      unlocked: level.unlocked || false,
      bestScore: level.bestScore || 0,
      attempts: level.attempts || 0,
      completed: level.completed || false
    };
  } catch (e) {
    console.error('Failed to get level progress:', e);
    return { unlocked: false, bestScore: 0, attempts: 0, completed: false };
  }
}

/**
 * Records the result of a completed quiz for a given level.
 * Updates best score, increments attempts, marks completion if passed,
 * and unlocks the next level on passing.
 */
export function completeQuiz(levelId, score, totalQuestions) {
  try {
    if (totalQuestions <= 0) {
      throw new Error('totalQuestions must be greater than 0');
    }

    const progress = getProgress();
    const percentage = Math.round((score / totalQuestions) * 100);
    const passed = percentage >= PASS_THRESHOLD;

    // Ensure the level entry exists
    if (!progress.levels[levelId]) {
      progress.levels[levelId] = {
        unlocked: false,
        bestScore: 0,
        attempts: 0,
        completed: false
      };
    }

    const level = progress.levels[levelId];
    level.attempts += 1;

    if (percentage > level.bestScore) {
      level.bestScore = percentage;
    }

    if (passed && !level.completed) {
      level.completed = true;
      unlockNextLevelInternal(progress, levelId);
    }

    // Record in quiz history
    progress.quizHistory.push({
      levelId,
      score,
      totalQuestions,
      percentage,
      passed,
      timestamp: Date.now()
    });

    saveProgress(progress);

    return { percentage, passed, bestScore: level.bestScore, attempts: level.attempts };
  } catch (e) {
    console.error('Failed to complete quiz:', e);
    return { percentage: 0, passed: false, bestScore: 0, attempts: 0 };
  }
}

/**
 * Internal helper: unlocks the next level in the given progress object.
 * Does not save -- caller is responsible for saving.
 */
function unlockNextLevelInternal(progress, currentLevelId) {
  const nextId = Number(currentLevelId) + 1;
  if (nextId <= TOTAL_LEVELS && progress.levels[nextId]) {
    progress.levels[nextId].unlocked = true;
  }
}

/**
 * Unlocks the level after the given currentLevelId and saves.
 */
export function unlockNextLevel(currentLevelId) {
  try {
    const progress = getProgress();
    unlockNextLevelInternal(progress, currentLevelId);
    saveProgress(progress);
  } catch (e) {
    console.error('Failed to unlock next level:', e);
  }
}

/**
 * Returns an overview of overall progress across all levels.
 */
export function getOverallProgress() {
  try {
    const progress = getProgress();
    let completedLevels = 0;

    for (let i = 1; i <= TOTAL_LEVELS; i++) {
      if (progress.levels[i] && progress.levels[i].completed) {
        completedLevels++;
      }
    }

    return {
      completedLevels,
      totalLevels: TOTAL_LEVELS,
      percentage: Math.round((completedLevels / TOTAL_LEVELS) * 100)
    };
  } catch (e) {
    console.error('Failed to get overall progress:', e);
    return { completedLevels: 0, totalLevels: TOTAL_LEVELS, percentage: 0 };
  }
}

/**
 * Returns an array of progress objects for every level.
 */
export function getAllLevelProgress() {
  try {
    const progress = getProgress();
    const result = [];

    for (let i = 1; i <= TOTAL_LEVELS; i++) {
      const level = progress.levels[i] || {
        unlocked: false,
        bestScore: 0,
        attempts: 0,
        completed: false
      };
      result.push({
        levelId: i,
        unlocked: level.unlocked || false,
        bestScore: level.bestScore || 0,
        attempts: level.attempts || 0,
        completed: level.completed || false
      });
    }

    return result;
  } catch (e) {
    console.error('Failed to get all level progress:', e);
    return [];
  }
}

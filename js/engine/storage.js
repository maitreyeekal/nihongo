// Storage engine for Nihongo learning platform
// localStorage wrapper for progress and settings

const STORAGE_KEY = 'nihongo_progress';
const SETTINGS_KEY = 'nihongo_settings';

/**
 * Returns the default progress object for a fresh user.
 */
export function getDefaultProgress() {
  const levels = {};
  for (let i = 1; i <= 8; i++) {
    levels[i] = {
      unlocked: i === 1,
      bestScore: 0,
      attempts: 0,
      completed: false
    };
  }
  return {
    levels,
    srs: {},
    quizHistory: []
  };
}

/**
 * Retrieves the stored progress or returns a default progress object.
 */
export function getProgress() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return getDefaultProgress();
    }
    const parsed = JSON.parse(raw);
    // Merge with defaults to handle schema changes
    const defaults = getDefaultProgress();
    return {
      levels: { ...defaults.levels, ...parsed.levels },
      srs: parsed.srs || {},
      quizHistory: parsed.quizHistory || []
    };
  } catch (e) {
    console.error('Failed to read progress from localStorage:', e);
    return getDefaultProgress();
  }
}

/**
 * Saves progress object to localStorage.
 */
export function saveProgress(progress) {
  try {
    if (!progress || typeof progress !== 'object') {
      throw new Error('Invalid progress object');
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch (e) {
    console.error('Failed to save progress to localStorage:', e);
  }
}

/**
 * Returns the default settings object.
 */
function getDefaultSettings() {
  return {
    showRomaji: true,
    autoPlayAudio: true,
    furigana: true,
    darkMode: false
  };
}

/**
 * Retrieves stored settings or returns defaults.
 */
export function getSettings() {
  try {
    const raw = localStorage.getItem(SETTINGS_KEY);
    if (!raw) {
      return getDefaultSettings();
    }
    const parsed = JSON.parse(raw);
    return { ...getDefaultSettings(), ...parsed };
  } catch (e) {
    console.error('Failed to read settings from localStorage:', e);
    return getDefaultSettings();
  }
}

/**
 * Saves settings object to localStorage.
 */
export function saveSettings(settings) {
  try {
    if (!settings || typeof settings !== 'object') {
      throw new Error('Invalid settings object');
    }
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  } catch (e) {
    console.error('Failed to save settings to localStorage:', e);
  }
}

/**
 * Resets all progress while keeping settings intact.
 */
export function resetProgress() {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (e) {
    console.error('Failed to reset progress:', e);
  }
}

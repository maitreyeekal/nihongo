// SM-2 Spaced Repetition System engine for Nihongo learning platform

import { getProgress, saveProgress } from './storage.js';

const DAY_MS = 86400000; // milliseconds in one day
const MIN_EASE_FACTOR = 1.3;
const DEFAULT_EASE_FACTOR = 2.5;

/**
 * Returns the SRS data for a given item, or a default new-item entry.
 */
export function getItemSRS(itemId) {
  try {
    const progress = getProgress();
    if (progress.srs && progress.srs[itemId]) {
      return { ...progress.srs[itemId] };
    }
    return {
      interval: 1,
      easeFactor: DEFAULT_EASE_FACTOR,
      repetitions: 0,
      nextReview: Date.now(),
      status: 'new'
    };
  } catch (e) {
    console.error('Failed to get SRS data for item:', itemId, e);
    return {
      interval: 1,
      easeFactor: DEFAULT_EASE_FACTOR,
      repetitions: 0,
      nextReview: Date.now(),
      status: 'new'
    };
  }
}

/**
 * Records a review for the given item with the specified quality.
 * quality: 'again' | 'good' | 'easy'
 *
 * SM-2 simplified:
 *   again -> interval=1, ease-=0.2 (min 1.3), reps=0, status='learning'
 *   good  -> interval*=ease, reps++, status='learned' if reps>=3
 *   easy  -> interval*=ease*1.3, ease+=0.15, reps++, status='mastered' if reps>=5
 *
 * nextReview = now + interval * 86400000
 */
export function reviewItem(itemId, quality) {
  try {
    const validQualities = ['again', 'good', 'easy'];
    if (!validQualities.includes(quality)) {
      throw new Error(`Invalid quality "${quality}". Must be one of: ${validQualities.join(', ')}`);
    }

    const progress = getProgress();
    if (!progress.srs) {
      progress.srs = {};
    }

    const item = progress.srs[itemId] || {
      interval: 1,
      easeFactor: DEFAULT_EASE_FACTOR,
      repetitions: 0,
      nextReview: Date.now(),
      status: 'new'
    };

    switch (quality) {
      case 'again':
        item.interval = 1;
        item.easeFactor = Math.max(MIN_EASE_FACTOR, item.easeFactor - 0.2);
        item.repetitions = 0;
        item.status = 'learning';
        break;

      case 'good':
        item.interval = Math.round(item.interval * item.easeFactor);
        item.repetitions += 1;
        if (item.repetitions >= 3) {
          item.status = 'learned';
        } else {
          item.status = 'learning';
        }
        break;

      case 'easy':
        item.interval = Math.round(item.interval * item.easeFactor * 1.3);
        item.easeFactor += 0.15;
        item.repetitions += 1;
        if (item.repetitions >= 5) {
          item.status = 'mastered';
        } else if (item.repetitions >= 3) {
          item.status = 'learned';
        } else {
          item.status = 'learning';
        }
        break;
    }

    item.nextReview = Date.now() + item.interval * DAY_MS;
    progress.srs[itemId] = item;
    saveProgress(progress);

    return { ...item };
  } catch (e) {
    console.error('Failed to review item:', itemId, e);
    return null;
  }
}

/**
 * Returns an array of item IDs that are due for review.
 * Optionally filters by levelId prefix (items are expected to be keyed like "level1_charA").
 * If no levelId is given, all due items are returned.
 */
export function getDueItems(levelId) {
  try {
    const progress = getProgress();
    const now = Date.now();
    const dueItems = [];

    if (!progress.srs) {
      return dueItems;
    }

    for (const [itemId, data] of Object.entries(progress.srs)) {
      // Filter by level if provided
      if (levelId !== undefined && levelId !== null) {
        const prefix = `level${levelId}_`;
        if (!itemId.startsWith(prefix)) {
          continue;
        }
      }

      if (data.nextReview <= now) {
        dueItems.push({
          itemId,
          ...data
        });
      }
    }

    return dueItems;
  } catch (e) {
    console.error('Failed to get due items:', e);
    return [];
  }
}

/**
 * Returns the SRS status string for a given item.
 */
export function getItemStatus(itemId) {
  try {
    const item = getItemSRS(itemId);
    return item.status;
  } catch (e) {
    console.error('Failed to get item status:', itemId, e);
    return 'new';
  }
}

/**
 * Returns aggregate counts of items grouped by SRS status.
 */
export function getSRSStats() {
  try {
    const progress = getProgress();
    const stats = {
      new: 0,
      learning: 0,
      learned: 0,
      mastered: 0,
      total: 0
    };

    if (!progress.srs) {
      return stats;
    }

    for (const data of Object.values(progress.srs)) {
      const status = data.status || 'new';
      if (stats.hasOwnProperty(status)) {
        stats[status]++;
      } else {
        stats[status] = 1;
      }
      stats.total++;
    }

    return stats;
  } catch (e) {
    console.error('Failed to get SRS stats:', e);
    return { new: 0, learning: 0, learned: 0, mastered: 0, total: 0 };
  }
}

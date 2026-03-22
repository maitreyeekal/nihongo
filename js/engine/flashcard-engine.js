// Flashcard deck engine for Nihongo learning platform

import { getDueItems, reviewItem, getItemSRS } from './srs.js';

/**
 * Creates a flashcard deck from an array of items.
 * @param {Array} items - Array of card data objects (each must have an `id` field).
 * @param {string} mode - 'learn' (all items) or 'review' (only due items).
 * @returns {Object} Deck object with cards, currentIndex, and state.
 */
export function createDeck(items, mode = 'learn') {
  try {
    if (!Array.isArray(items) || items.length === 0) {
      return { cards: [], currentIndex: 0, totalCards: 0, flipped: false };
    }

    let cards;

    if (mode === 'review') {
      // Filter to only items that are due for review
      const dueItemIds = new Set(getDueItems().map(d => d.itemId));
      cards = items
        .filter(item => {
          const id = item.id || item.char || item.kanji || item.word;
          return dueItemIds.has(id);
        })
        .map(item => ({
          ...item,
          id: item.id || item.char || item.kanji || item.word,
          reviewed: false,
          quality: null
        }));
    } else {
      // Learn mode: include all items
      cards = items.map(item => ({
        ...item,
        id: item.id || item.char || item.kanji || item.word,
        reviewed: false,
        quality: null
      }));
    }

    return {
      cards,
      currentIndex: 0,
      totalCards: cards.length,
      flipped: false
    };
  } catch (e) {
    console.error('Failed to create deck:', e);
    return { cards: [], currentIndex: 0, totalCards: 0, flipped: false };
  }
}

/**
 * Returns the current card in the deck, or null if the deck is empty/exhausted.
 */
export function getCurrentCard(deck) {
  try {
    if (!deck || !deck.cards || deck.cards.length === 0) {
      return null;
    }
    if (deck.currentIndex < 0 || deck.currentIndex >= deck.cards.length) {
      return null;
    }
    return deck.cards[deck.currentIndex];
  } catch (e) {
    console.error('Failed to get current card:', e);
    return null;
  }
}

/**
 * Advances to the next card. Returns the next card or null if at the end.
 */
export function nextCard(deck) {
  try {
    if (!deck || !deck.cards) return null;

    deck.flipped = false;

    if (deck.currentIndex < deck.cards.length - 1) {
      deck.currentIndex++;
      return deck.cards[deck.currentIndex];
    }
    return null; // End of deck
  } catch (e) {
    console.error('Failed to advance to next card:', e);
    return null;
  }
}

/**
 * Goes back to the previous card. Returns the previous card or null if at the start.
 */
export function previousCard(deck) {
  try {
    if (!deck || !deck.cards) return null;

    deck.flipped = false;

    if (deck.currentIndex > 0) {
      deck.currentIndex--;
      return deck.cards[deck.currentIndex];
    }
    return null; // Already at beginning
  } catch (e) {
    console.error('Failed to go to previous card:', e);
    return null;
  }
}

/**
 * Marks the current card with a quality rating and records the review in SRS.
 * @param {Object} deck - The deck object.
 * @param {string} itemId - The item ID to mark.
 * @param {string} quality - 'again' | 'good' | 'easy'
 */
export function markCard(deck, itemId, quality) {
  try {
    if (!deck || !deck.cards) return;

    // Update the card in the deck
    const card = deck.cards.find(c => c.id === itemId);
    if (card) {
      card.reviewed = true;
      card.quality = quality;
    }

    // Persist via SRS engine
    reviewItem(itemId, quality);
  } catch (e) {
    console.error('Failed to mark card:', e);
  }
}

/**
 * Returns the current progress through the deck.
 */
export function getDeckProgress(deck) {
  try {
    if (!deck || !deck.cards || deck.totalCards === 0) {
      return { current: 0, total: 0, percentage: 0 };
    }

    const current = deck.currentIndex + 1;
    const total = deck.totalCards;
    const percentage = Math.round((current / total) * 100);

    return { current, total, percentage };
  } catch (e) {
    console.error('Failed to get deck progress:', e);
    return { current: 0, total: 0, percentage: 0 };
  }
}

/**
 * Returns whether the current card is flipped (showing the answer side).
 */
export function isFlipped(deck) {
  try {
    if (!deck) return false;
    return deck.flipped === true;
  } catch (e) {
    return false;
  }
}

/**
 * Toggles the flip state of the current card.
 */
export function flipCard(deck) {
  try {
    if (!deck) return;
    deck.flipped = !deck.flipped;
  } catch (e) {
    console.error('Failed to flip card:', e);
  }
}

// Flashcard UI rendering for Nihongo learning platform (flashcards.html)

import { createDeck, getCurrentCard, nextCard, markCard, getDeckProgress, flipCard } from '../engine/flashcard-engine.js';
import { speak } from '../engine/audio.js';
import { renderNav, initTheme } from './nav.js';
import { hiraganaLevel1, hiraganaLevel2 } from '../data/hiragana.js';
import { katakanaLevel3, katakanaLevel4 } from '../data/katakana.js';

let deck = null;
let levelId = null;
let mode = 'learn';

/**
 * Returns the flashcard items for a given level.
 * @param {number} levelId
 * @returns {Array}
 */
function getItemsForLevel(levelId) {
  switch (levelId) {
    case 1:
      return hiraganaLevel1.map(item => ({
        front: item.char,
        reading: item.romaji,
        meaning: item.romaji,
        type: 'kana'
      }));
    case 2:
      return hiraganaLevel2.map(item => ({
        front: item.char,
        reading: item.romaji,
        meaning: item.romaji,
        type: 'kana'
      }));
    case 3:
      return katakanaLevel3.map(item => ({
        front: item.char,
        reading: item.romaji,
        meaning: item.romaji,
        type: 'kana'
      }));
    case 4: {
      const chars = (katakanaLevel4.characters || []).map(item => ({
        front: item.char,
        reading: item.romaji,
        meaning: item.romaji,
        type: 'kana'
      }));
      const loans = (katakanaLevel4.loanwords || []).map(item => ({
        front: item.japanese,
        reading: item.reading,
        meaning: item.english,
        type: 'vocab'
      }));
      return [...chars, ...loans];
    }
    default:
      return [];
  }
}

/**
 * Attempts to load items for kanji/dialogue levels dynamically.
 * @param {number} levelId
 * @returns {Promise<Array>}
 */
async function loadDynamicItems(lvl) {
  try {
    if (lvl >= 5 && lvl <= 7) {
      const kanjiMod = await import('../data/kanji.js');
      const allKanji = kanjiMod.kanji || [];
      const filtered = allKanji.filter(k => k.level === lvl);
      const items = filtered.map(item => ({
        front: item.kanji || '',
        reading: [item.onyomi, item.kunyomi].filter(Boolean).join(' / '),
        meaning: item.meaning || '',
        example: item.examples && item.examples.length > 0 ? (typeof item.examples[0] === 'string' ? item.examples[0] : item.examples[0].word || item.examples[0].japanese || '') : '',
        type: 'kanji'
      }));
      // For level 7, also add grammar cards
      if (lvl === 7) {
        const grammarMod = await import('../data/grammar.js');
        const grammarItems = (grammarMod.grammar || []).map(g => ({
          front: g.pattern,
          reading: g.formation || '',
          meaning: g.meaning,
          example: g.examples && g.examples[0] ? g.examples[0].japanese : '',
          type: 'grammar'
        }));
        return [...items, ...grammarItems];
      }
      return items;
    } else if (lvl === 8) {
      const mod = await import('../data/dialogues.js');
      const dialogues = mod.dialogues || [];
      return dialogues.map(d => ({
        front: d.titleJp || d.title || '',
        reading: d.title || '',
        meaning: d.setting || '',
        example: '',
        type: 'dialogue'
      }));
    }
  } catch (e) {
    console.warn('Could not load data for level', lvl, e);
  }
  return [];
}

/**
 * Initializes the flashcard page: parses URL params, loads items, creates deck, renders first card.
 */
export async function initFlashcards() {
  try {
    const params = new URLSearchParams(window.location.search);
    levelId = parseInt(params.get('level'), 10);
    mode = params.get('mode') || 'learn';

    if (!levelId || levelId < 1 || levelId > 8) {
      window.location.href = 'index.html';
      return;
    }

    initTheme();
    renderNav('Flashcards', true, false);

    // Load items
    let items = getItemsForLevel(levelId);
    if (items.length === 0) {
      items = await loadDynamicItems(levelId);
    }

    if (items.length === 0) {
      showEmpty();
      return;
    }

    deck = createDeck(items, mode);
    renderFlashcardPage();
  } catch (err) {
    console.error('Failed to initialize flashcards:', err);
    showEmpty('Failed to load flashcards. Please go back and try again.');
  }
}

/**
 * Shows an empty/error state message.
 * @param {string} message
 */
function showEmpty(message) {
  const main = document.createElement('main');
  main.style.cssText = `
    max-width: var(--max-width);
    margin: 0 auto;
    padding: var(--space-lg);
    min-height: 80vh;
    display: flex;
    align-items: center;
    justify-content: center;
  `;
  main.innerHTML = `
    <div class="empty-state">
      <div class="empty-state-icon">\uD83C\uDFB4</div>
      <p class="empty-state-text">${message || 'No flashcard items available for this level.'}</p>
      <a href="index.html" class="btn btn-primary" style="margin-top: var(--space-md); text-decoration: none;">Back to Home</a>
    </div>
  `;
  document.body.appendChild(main);
}

/**
 * Renders the complete flashcard page: card, speaker button, progress, and controls.
 */
function renderFlashcardPage() {
  // Remove existing main if any
  const existing = document.querySelector('.flashcard-page');
  if (existing) existing.remove();

  const card = getCurrentCard(deck);
  if (!card) {
    showComplete();
    return;
  }

  const progress = getDeckProgress(deck);

  const main = document.createElement('main');
  main.className = 'flashcard-page paper-bg';
  main.style.cssText = `
    max-width: var(--max-width);
    margin: 0 auto;
    padding: var(--space-lg);
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
  `;

  // Progress indicator
  const progressSection = document.createElement('div');
  progressSection.style.cssText = `
    width: 100%;
    margin-bottom: var(--space-lg);
  `;

  const progressLabel = document.createElement('div');
  progressLabel.className = 'progress-label';
  progressLabel.innerHTML = `
    <span>Card ${progress.current} of ${progress.total}</span>
    <span class="text-accent">${progress.total > 0 ? Math.round((progress.current / progress.total) * 100) : 0}%</span>
  `;

  const progressBar = document.createElement('div');
  progressBar.className = 'progress-bar';
  const progressFill = document.createElement('div');
  progressFill.className = 'progress-bar-fill progress-bar-fill-accent';
  progressFill.style.width = `${progress.total > 0 ? (progress.current / progress.total) * 100 : 0}%`;
  progressBar.appendChild(progressFill);

  progressSection.appendChild(progressLabel);
  progressSection.appendChild(progressBar);
  main.appendChild(progressSection);

  // Flashcard container with perspective
  const cardContainer = document.createElement('div');
  cardContainer.className = 'flashcard-container';
  cardContainer.style.cssText = `
    perspective: 1000px;
    width: 100%;
    max-width: 400px;
    height: 300px;
    margin-bottom: var(--space-lg);
    cursor: pointer;
  `;

  const flashcard = document.createElement('div');
  flashcard.className = 'flashcard';
  flashcard.style.cssText = `
    position: relative;
    width: 100%;
    height: 100%;
    transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
    transform-style: preserve-3d;
  `;

  // Front face
  const front = document.createElement('div');
  front.className = 'flashcard-front card';
  front.style.cssText = `
    position: absolute;
    inset: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    backface-visibility: hidden;
    padding: var(--space-xl);
  `;

  const frontChar = document.createElement('div');
  frontChar.style.cssText = `
    font-family: var(--font-heading);
    font-size: ${card.front.length > 3 ? 'var(--font-size-3xl)' : 'var(--font-size-5xl)'};
    font-weight: var(--font-weight-bold);
    line-height: 1.1;
    color: var(--color-text);
    text-align: center;
    word-break: break-word;
  `;
  frontChar.textContent = card.front;

  const tapHint = document.createElement('div');
  tapHint.className = 'text-secondary';
  tapHint.style.cssText = 'font-size: var(--font-size-xs); margin-top: var(--space-md); opacity: 0.6;';
  tapHint.textContent = 'Tap to flip';

  front.appendChild(frontChar);
  front.appendChild(tapHint);

  // Back face
  const back = document.createElement('div');
  back.className = 'flashcard-back card';
  back.style.cssText = `
    position: absolute;
    inset: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    backface-visibility: hidden;
    transform: rotateY(180deg);
    padding: var(--space-xl);
    gap: var(--space-sm);
  `;

  const readingEl = document.createElement('div');
  readingEl.style.cssText = `
    font-size: var(--font-size-2xl);
    font-weight: var(--font-weight-bold);
    color: var(--color-accent);
  `;
  readingEl.textContent = card.reading || '';

  const meaningEl = document.createElement('div');
  meaningEl.style.cssText = `
    font-size: var(--font-size-lg);
    color: var(--color-text);
    text-align: center;
  `;
  meaningEl.textContent = card.meaning || '';

  back.appendChild(readingEl);
  back.appendChild(meaningEl);

  if (card.example) {
    const exampleEl = document.createElement('div');
    exampleEl.style.cssText = `
      font-size: var(--font-size-sm);
      color: var(--color-text-secondary);
      margin-top: var(--space-sm);
      padding: var(--space-sm) var(--space-md);
      background: rgba(0, 0, 0, 0.03);
      border-radius: var(--border-radius);
      text-align: center;
    `;
    exampleEl.textContent = card.example;
    back.appendChild(exampleEl);
  }

  flashcard.appendChild(front);
  flashcard.appendChild(back);

  let isFlipped = false;

  function handleFlip() {
    isFlipped = !isFlipped;
    flashcard.style.transform = isFlipped ? 'rotateY(180deg)' : 'rotateY(0)';
    try {
      flipCard(deck);
    } catch (e) {
      // flipCard may track state
    }
    // Show/hide controls when flipped
    const controls = document.querySelector('.flashcard-controls');
    if (controls) {
      controls.style.opacity = isFlipped ? '1' : '0';
      controls.style.pointerEvents = isFlipped ? 'auto' : 'none';
    }
  }

  cardContainer.addEventListener('click', handleFlip);

  // Keyboard support
  document.onkeydown = (e) => {
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      handleFlip();
    } else if (e.key === '1' && isFlipped) {
      handleMark('again');
    } else if (e.key === '2' && isFlipped) {
      handleMark('good');
    } else if (e.key === '3' && isFlipped) {
      handleMark('easy');
    }
  };

  main.appendChild(cardContainer);

  // Speaker button
  const speakerBtn = document.createElement('button');
  speakerBtn.className = 'btn btn-ghost btn-lg';
  speakerBtn.style.cssText = 'font-size: var(--font-size-2xl); margin-bottom: var(--space-lg);';
  speakerBtn.textContent = '\uD83D\uDD0A';
  speakerBtn.setAttribute('aria-label', 'Hear pronunciation');
  speakerBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    try {
      speak(card.front);
    } catch (err) {
      // Audio may not be available
    }
  });
  main.appendChild(speakerBtn);

  // Controls (Again, Good, Easy) - hidden until card is flipped
  const controls = document.createElement('div');
  controls.className = 'flashcard-controls';
  controls.style.cssText = `
    display: flex;
    gap: var(--space-md);
    width: 100%;
    max-width: 400px;
    opacity: 0;
    pointer-events: none;
    transition: opacity var(--transition-normal);
  `;

  function handleMark(rating) {
    const currentCard = getCurrentCard(deck);
    const itemId = currentCard ? (currentCard.id || currentCard.front) : '';
    try {
      markCard(deck, itemId, rating);
    } catch (e) {
      // Fallback: just advance
    }
    try {
      nextCard(deck);
    } catch (e) {
      // End of deck
    }
    isFlipped = false;
    document.onkeydown = null;
    renderFlashcardPage();
  }

  const ratings = [
    { label: 'Again', rating: 'again', color: 'var(--color-accent-secondary)', bgColor: 'rgba(200, 75, 49, 0.1)', key: '1' },
    { label: 'Good', rating: 'good', color: 'var(--color-text)', bgColor: 'var(--color-surface)', key: '2' },
    { label: 'Easy', rating: 'easy', color: 'var(--color-success)', bgColor: 'rgba(122, 139, 105, 0.1)', key: '3' }
  ];

  ratings.forEach(r => {
    const btn = document.createElement('button');
    btn.className = 'btn';
    btn.style.cssText = `
      flex: 1;
      padding: var(--space-md) var(--space-sm);
      font-size: var(--font-size-base);
      font-weight: var(--font-weight-bold);
      color: ${r.color};
      background-color: ${r.bgColor};
      border: 2px solid ${r.color};
      border-radius: var(--border-radius);
      transition: all var(--transition-fast);
    `;
    btn.innerHTML = `${r.label}<br><span style="font-size: var(--font-size-xs); font-weight: normal; opacity: 0.7;">[${r.key}]</span>`;

    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      handleMark(r.rating);
    });

    controls.appendChild(btn);
  });

  main.appendChild(controls);
  document.body.appendChild(main);
}

/**
 * Displays the deck complete screen with stats and navigation buttons.
 */
function showComplete() {
  // Remove existing page content
  const existing = document.querySelector('.flashcard-page');
  if (existing) existing.remove();

  const main = document.createElement('main');
  main.className = 'flashcard-page paper-bg';
  main.style.cssText = `
    max-width: var(--max-width);
    margin: 0 auto;
    padding: var(--space-lg);
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  `;

  const completeSection = document.createElement('div');
  completeSection.style.cssText = 'text-align: center; width: 100%; max-width: 400px;';

  const icon = document.createElement('div');
  icon.style.cssText = 'font-size: var(--font-size-5xl); margin-bottom: var(--space-lg);';
  icon.textContent = '\uD83C\uDF89';

  const title = document.createElement('h2');
  title.style.cssText = `
    font-family: var(--font-heading);
    font-size: var(--font-size-2xl);
    margin-bottom: var(--space-md);
    color: var(--color-success);
  `;
  title.textContent = 'Deck Complete!';

  const subtitle = document.createElement('p');
  subtitle.className = 'text-secondary';
  subtitle.style.cssText = 'margin-bottom: var(--space-xl);';
  subtitle.textContent = 'Great work! You have reviewed all cards in this deck.';

  completeSection.appendChild(icon);
  completeSection.appendChild(title);
  completeSection.appendChild(subtitle);

  // Stats summary
  let progress = null;
  try {
    progress = getDeckProgress(deck);
  } catch (e) {
    // May not be available
  }

  if (progress) {
    const statsCard = document.createElement('div');
    statsCard.className = 'card';
    statsCard.style.cssText = 'padding: var(--space-lg); margin-bottom: var(--space-xl); text-align: center;';

    const statsGrid = document.createElement('div');
    statsGrid.style.cssText = `
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      gap: var(--space-md);
    `;

    const statItems = [
      { label: 'Total', value: progress.total || 0 },
      { label: 'Reviewed', value: progress.current || 0 },
      { label: 'Remaining', value: (progress.total || 0) - (progress.current || 0) }
    ];

    statItems.forEach(stat => {
      const item = document.createElement('div');
      item.innerHTML = `
        <div style="font-family: var(--font-heading); font-size: var(--font-size-2xl); font-weight: var(--font-weight-bold); color: var(--color-accent);">${stat.value}</div>
        <div style="font-size: var(--font-size-xs); color: var(--color-text-secondary);">${stat.label}</div>
      `;
      statsGrid.appendChild(item);
    });

    statsCard.appendChild(statsGrid);
    completeSection.appendChild(statsCard);
  }

  // Action buttons
  const actions = document.createElement('div');
  actions.style.cssText = 'display: flex; flex-direction: column; gap: var(--space-md); width: 100%;';

  const backBtn = document.createElement('a');
  backBtn.href = `level.html?id=${levelId}`;
  backBtn.className = 'btn btn-primary btn-block btn-lg';
  backBtn.textContent = 'Back to Level';
  backBtn.style.textDecoration = 'none';

  const reviewBtn = document.createElement('a');
  reviewBtn.href = `flashcards.html?level=${levelId}&mode=${mode}`;
  reviewBtn.className = 'btn btn-secondary btn-block btn-lg';
  reviewBtn.textContent = 'Review Again';
  reviewBtn.style.textDecoration = 'none';

  const homeBtn = document.createElement('a');
  homeBtn.href = 'index.html';
  homeBtn.className = 'btn btn-ghost btn-block';
  homeBtn.textContent = 'Back to Home';
  homeBtn.style.textDecoration = 'none';

  actions.appendChild(backBtn);
  actions.appendChild(reviewBtn);
  actions.appendChild(homeBtn);
  completeSection.appendChild(actions);

  main.appendChild(completeSection);
  document.body.appendChild(main);

  // Clean up keyboard handler
  document.onkeydown = null;
}

// Level detail page UI for Nihongo learning platform (level.html)

import { getLevelProgress, isLevelUnlocked } from '../engine/progress.js';
import { levels } from '../data/levels.js';
import { renderNav, renderBottomNav, initTheme } from './nav.js';
import { hiraganaLevel1, hiraganaLevel2 } from '../data/hiragana.js';
import { katakanaLevel3, katakanaLevel4 } from '../data/katakana.js';
import { speak, initAudio } from '../engine/audio.js';

// Dynamic imports for levels 5-8 data (may not exist yet)
let kanjiData = null;
let dialogueData = null;

async function loadLevelData(levelId) {
  try {
    if (levelId >= 5 && levelId <= 7) {
      const mod = await import('../data/kanji.js');
      kanjiData = mod;
    } else if (levelId === 8) {
      const mod = await import('../data/dialogues.js');
      dialogueData = mod;
    }
  } catch (e) {
    console.warn('Could not load data module for level', levelId, e);
  }
}

/**
 * Returns the character/vocab data appropriate for a given level.
 * @param {number} levelId
 * @returns {Array} Array of items for the level
 */
function getDataForLevel(levelId) {
  switch (levelId) {
    case 1:
      return hiraganaLevel1;
    case 2:
      return hiraganaLevel2;
    case 3:
      return katakanaLevel3;
    case 4:
      return katakanaLevel4.characters || [];
    case 5:
      return kanjiData && kanjiData.kanji ? kanjiData.kanji.filter(k => k.level === 5) : [];
    case 6:
      return kanjiData && kanjiData.kanji ? kanjiData.kanji.filter(k => k.level === 6) : [];
    case 7:
      return kanjiData && kanjiData.kanji ? kanjiData.kanji.filter(k => k.level === 7) : [];
    case 8:
      return dialogueData && dialogueData.dialogues ? dialogueData.dialogues : [];
    default:
      return [];
  }
}

/**
 * Returns the level type string for rendering decisions.
 * @param {number} levelId
 * @returns {string} 'kana' | 'kanji' | 'dialogue'
 */
function getLevelType(levelId) {
  if (levelId >= 1 && levelId <= 4) return 'kana';
  if (levelId >= 5 && levelId <= 7) return 'kanji';
  return 'dialogue';
}

/**
 * Initializes the level detail page.
 */
export async function initLevelPage() {
  try {
    const params = new URLSearchParams(window.location.search);
    const levelId = parseInt(params.get('id'), 10);

    if (!levelId || levelId < 1 || levelId > 8) {
      window.location.href = 'index.html';
      return;
    }

    initTheme();
    initAudio();

    if (!isLevelUnlocked(levelId)) {
      window.location.href = 'index.html';
      return;
    }

    await loadLevelData(levelId);

    const level = Array.isArray(levels) ? levels.find(l => l.id === levelId) || levels[levelId - 1] : null;
    const title = level ? level.title : `Level ${levelId}`;

    renderNav(title, true, true);

    const main = document.createElement('main');
    main.className = 'paper-bg';
    main.style.cssText = `
      max-width: var(--max-width);
      margin: 0 auto;
      padding: var(--space-lg);
      min-height: 100vh;
    `;

    renderTabs(levelId, main);

    // Tab content containers
    const learnContent = document.createElement('div');
    learnContent.id = 'tab-learn';
    renderLearnTab(levelId, learnContent);

    const practiceContent = document.createElement('div');
    practiceContent.id = 'tab-practice';
    practiceContent.style.display = 'none';
    renderPracticeTab(levelId, practiceContent);

    const reviewContent = document.createElement('div');
    reviewContent.id = 'tab-review';
    reviewContent.style.display = 'none';
    renderReviewTab(levelId, reviewContent);

    main.appendChild(learnContent);
    main.appendChild(practiceContent);
    main.appendChild(reviewContent);

    document.body.appendChild(main);
    renderBottomNav();
  } catch (err) {
    console.error('Failed to initialize level page:', err);
    document.body.innerHTML = '<div class="empty-state"><p class="empty-state-text">Failed to load level. Please go back and try again.</p></div>';
  }
}

/**
 * Renders the three tab buttons: Learn, Practice, Review.
 * @param {number} levelId
 * @param {HTMLElement} container
 */
function renderTabs(levelId, container) {
  const tabBar = document.createElement('div');
  tabBar.style.cssText = `
    display: flex;
    gap: var(--space-xs);
    margin-bottom: var(--space-lg);
    border-bottom: 2px solid var(--color-border);
    padding-bottom: 0;
  `;

  const tabDefs = [
    { id: 'learn', label: 'Learn' },
    { id: 'practice', label: 'Practice' },
    { id: 'review', label: 'Review' }
  ];

  tabDefs.forEach((tab, idx) => {
    const btn = document.createElement('button');
    btn.className = 'btn btn-ghost';
    btn.dataset.tab = tab.id;
    btn.textContent = tab.label;
    btn.style.cssText = `
      flex: 1;
      border-radius: var(--border-radius) var(--border-radius) 0 0;
      padding: var(--space-sm) var(--space-md);
      font-weight: var(--font-weight-medium);
      border-bottom: 3px solid transparent;
      margin-bottom: -2px;
      transition: border-color var(--transition-fast), color var(--transition-fast);
    `;

    if (idx === 0) {
      btn.style.borderBottomColor = 'var(--color-accent)';
      btn.style.color = 'var(--color-accent)';
      btn.style.fontWeight = 'var(--font-weight-bold)';
    }

    btn.addEventListener('click', () => {
      // Switch active tab styling
      tabBar.querySelectorAll('button').forEach(b => {
        b.style.borderBottomColor = 'transparent';
        b.style.color = 'var(--color-text-secondary)';
        b.style.fontWeight = 'var(--font-weight-medium)';
      });
      btn.style.borderBottomColor = 'var(--color-accent)';
      btn.style.color = 'var(--color-accent)';
      btn.style.fontWeight = 'var(--font-weight-bold)';

      // Show/hide tab content
      document.getElementById('tab-learn').style.display = tab.id === 'learn' ? 'block' : 'none';
      document.getElementById('tab-practice').style.display = tab.id === 'practice' ? 'block' : 'none';
      document.getElementById('tab-review').style.display = tab.id === 'review' ? 'block' : 'none';
    });

    tabBar.appendChild(btn);
  });

  container.appendChild(tabBar);
}

/**
 * Renders the Learn tab content: character grids, vocab cards, or dialogue cards.
 * @param {number} levelId
 * @param {HTMLElement} container
 */
function renderLearnTab(levelId, container) {
  const type = getLevelType(levelId);
  const data = getDataForLevel(levelId);

  if (type === 'kana') {
    renderCharacterGrid(data, container);
  } else if (type === 'kanji') {
    renderKanjiGrid(data, container);
  } else {
    renderDialogueList(data, container);
  }

  // Loanwords section for level 4
  if (levelId === 4 && katakanaLevel4.loanwords) {
    const loanHeader = document.createElement('h3');
    loanHeader.style.cssText = `
      font-family: var(--font-heading);
      margin-top: var(--space-xl);
      margin-bottom: var(--space-md);
    `;
    loanHeader.textContent = 'Common Loanwords';
    container.appendChild(loanHeader);
    renderKanjiGrid(katakanaLevel4.loanwords.map(w => ({
      char: w.japanese,
      romaji: w.reading,
      meaning: w.english
    })), container);
  }

  // Start Flashcards button
  const btnContainer = document.createElement('div');
  btnContainer.style.cssText = 'margin-top: var(--space-xl); text-align: center;';

  const startBtn = document.createElement('a');
  startBtn.href = `flashcards.html?level=${levelId}`;
  startBtn.className = 'btn btn-primary btn-lg';
  startBtn.textContent = 'Start Flashcards';
  startBtn.style.cssText = 'display: inline-flex; text-decoration: none;';

  btnContainer.appendChild(startBtn);
  container.appendChild(btnContainer);
}

/**
 * Renders a 5-column character grid for kana levels.
 * Each cell flips to show the reading on tap.
 * @param {Array} items - Array of {char, romaji} objects
 * @param {HTMLElement} container
 */
function renderCharacterGrid(items, container) {
  const grid = document.createElement('div');
  grid.style.cssText = `
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: var(--space-sm);
  `;

  items.forEach(item => {
    const cell = document.createElement('div');
    cell.className = 'card card-interactive';
    cell.style.cssText = `
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: var(--space-md) var(--space-xs);
      text-align: center;
      min-height: 80px;
      cursor: pointer;
      user-select: none;
    `;

    const charEl = document.createElement('span');
    charEl.className = 'char-front';
    charEl.style.cssText = `
      font-family: var(--font-heading);
      font-size: var(--font-size-2xl);
      line-height: 1.2;
      transition: opacity var(--transition-fast);
    `;
    charEl.textContent = item.char;

    const readingEl = document.createElement('span');
    readingEl.className = 'char-back';
    readingEl.style.cssText = `
      font-size: var(--font-size-sm);
      color: var(--color-accent);
      margin-top: var(--space-xs);
      opacity: 0;
      transition: opacity var(--transition-fast);
      font-weight: var(--font-weight-medium);
    `;
    readingEl.textContent = item.romaji;

    let flipped = false;
    cell.addEventListener('click', () => {
      flipped = !flipped;
      readingEl.style.opacity = flipped ? '1' : '0';
      if (flipped) {
        try {
          speak(item.char);
        } catch (e) {
          // Audio may not be available
        }
      }
    });

    cell.appendChild(charEl);
    cell.appendChild(readingEl);
    grid.appendChild(cell);
  });

  container.appendChild(grid);
}

/**
 * Renders vocab/kanji cards in a grid showing kanji + meaning.
 * @param {Array} items - Array of objects with char/kanji, romaji/reading, meaning properties
 * @param {HTMLElement} container
 */
function renderKanjiGrid(items, container) {
  const grid = document.createElement('div');
  grid.style.cssText = `
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
    gap: var(--space-md);
  `;

  items.forEach(item => {
    const card = document.createElement('div');
    card.className = 'card card-interactive';
    card.style.cssText = `
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: var(--space-lg) var(--space-md);
      text-align: center;
      cursor: pointer;
    `;

    const kanji = document.createElement('div');
    kanji.style.cssText = `
      font-family: var(--font-heading);
      font-size: var(--font-size-3xl);
      line-height: 1.2;
      margin-bottom: var(--space-sm);
    `;
    kanji.textContent = item.char || item.kanji || item.japanese || '';

    const meaning = document.createElement('div');
    meaning.className = 'text-secondary';
    meaning.style.cssText = 'font-size: var(--font-size-sm);';
    meaning.textContent = item.meaning || item.english || '';

    const reading = document.createElement('div');
    reading.style.cssText = `
      font-size: var(--font-size-xs);
      color: var(--color-accent);
      margin-top: var(--space-xs);
      opacity: 0;
      transition: opacity var(--transition-fast);
    `;
    reading.textContent = item.romaji || item.reading || item.onyomi || '';

    let showReading = false;
    card.addEventListener('click', () => {
      showReading = !showReading;
      reading.style.opacity = showReading ? '1' : '0';
      if (showReading) {
        try {
          speak(item.char || item.kanji || item.japanese || '');
        } catch (e) {
          // Audio may not be available
        }
      }
    });

    card.appendChild(kanji);
    card.appendChild(meaning);
    card.appendChild(reading);
    grid.appendChild(card);
  });

  container.appendChild(grid);
}

/**
 * Renders a list of dialogue scenario cards for level 8.
 * @param {Array} dialogues - Array of dialogue scenario objects
 * @param {HTMLElement} container
 */
function renderDialogueList(dialogues, container) {
  if (!dialogues || dialogues.length === 0) {
    const empty = document.createElement('div');
    empty.className = 'empty-state';
    empty.innerHTML = '<div class="empty-state-icon">\uD83D\uDCAC</div><p class="empty-state-text">Dialogue content coming soon!</p>';
    container.appendChild(empty);
    return;
  }

  const list = document.createElement('div');
  list.style.cssText = 'display: flex; flex-direction: column; gap: var(--space-md);';

  dialogues.forEach((dialogue, idx) => {
    const card = document.createElement('div');
    card.className = 'card card-interactive';
    card.style.cssText = `
      display: flex;
      align-items: center;
      gap: var(--space-md);
      padding: var(--space-lg);
    `;

    const num = document.createElement('div');
    num.className = 'text-gold';
    num.style.cssText = `
      font-family: var(--font-heading);
      font-size: var(--font-size-2xl);
      font-weight: var(--font-weight-bold);
      min-width: 40px;
      text-align: center;
    `;
    num.textContent = idx + 1;

    const info = document.createElement('div');
    info.style.cssText = 'flex: 1;';

    const title = document.createElement('h4');
    title.style.cssText = `
      font-family: var(--font-heading);
      font-size: var(--font-size-lg);
      margin-bottom: 4px;
    `;
    title.textContent = dialogue.title || dialogue.scenario || `Scenario ${idx + 1}`;

    const desc = document.createElement('p');
    desc.className = 'text-secondary';
    desc.style.cssText = 'font-size: var(--font-size-sm); margin: 0;';
    desc.textContent = dialogue.setting || dialogue.description || dialogue.context || '';

    info.appendChild(title);
    info.appendChild(desc);

    const icon = document.createElement('span');
    icon.style.cssText = 'font-size: var(--font-size-xl); color: var(--color-text-secondary);';
    icon.textContent = '\u203A';

    card.appendChild(num);
    card.appendChild(info);
    card.appendChild(icon);

    list.appendChild(card);
  });

  container.appendChild(list);
}

/**
 * Renders the Practice tab: quiz button, best score, attempts.
 * @param {number} levelId
 * @param {HTMLElement} container
 */
function renderPracticeTab(levelId, container) {
  const progress = getLevelProgress(levelId);

  const section = document.createElement('div');
  section.style.cssText = 'text-align: center; padding: var(--space-xl) 0;';

  // Quiz button
  const quizBtn = document.createElement('a');
  quizBtn.href = `quiz.html?level=${levelId}`;
  quizBtn.className = 'btn btn-primary btn-lg btn-block';
  quizBtn.textContent = 'Take Level Quiz';
  quizBtn.style.cssText = `
    display: flex;
    text-decoration: none;
    font-size: var(--font-size-lg);
    padding: var(--space-md) var(--space-xl);
    margin-bottom: var(--space-xl);
  `;

  section.appendChild(quizBtn);

  // Stats cards
  const statsGrid = document.createElement('div');
  statsGrid.style.cssText = `
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--space-md);
    margin-bottom: var(--space-lg);
  `;

  // Best score card
  const scoreCard = document.createElement('div');
  scoreCard.className = 'card';
  scoreCard.style.cssText = 'text-align: center; padding: var(--space-lg);';
  scoreCard.innerHTML = `
    <div style="font-size: var(--font-size-xs); color: var(--color-text-secondary); margin-bottom: var(--space-xs);">Best Score</div>
    <div style="font-family: var(--font-heading); font-size: var(--font-size-3xl); font-weight: var(--font-weight-bold); color: ${progress.bestScore >= 70 ? 'var(--color-success)' : 'var(--color-text)'};">${progress.bestScore}%</div>
  `;

  // Attempts card
  const attemptsCard = document.createElement('div');
  attemptsCard.className = 'card';
  attemptsCard.style.cssText = 'text-align: center; padding: var(--space-lg);';
  attemptsCard.innerHTML = `
    <div style="font-size: var(--font-size-xs); color: var(--color-text-secondary); margin-bottom: var(--space-xs);">Attempts</div>
    <div style="font-family: var(--font-heading); font-size: var(--font-size-3xl); font-weight: var(--font-weight-bold);">${progress.attempts}</div>
  `;

  statsGrid.appendChild(scoreCard);
  statsGrid.appendChild(attemptsCard);
  section.appendChild(statsGrid);

  // Pass requirement info
  const passInfo = document.createElement('div');
  passInfo.className = 'card';
  passInfo.style.cssText = 'padding: var(--space-md) var(--space-lg); text-align: center;';
  passInfo.innerHTML = `
    <div style="font-size: var(--font-size-sm); color: var(--color-text-secondary);">
      <span style="font-weight: var(--font-weight-bold); color: var(--color-accent);">70%</span> required to pass and unlock the next level
    </div>
  `;

  if (progress.completed) {
    const passedBadge = document.createElement('div');
    passedBadge.style.cssText = 'margin-top: var(--space-sm);';
    passedBadge.innerHTML = '<span class="badge badge-success">Passed</span>';
    passInfo.appendChild(passedBadge);
  }

  section.appendChild(passInfo);
  container.appendChild(section);
}

/**
 * Renders the Review tab: SRS due items info and review button.
 * @param {number} levelId
 * @param {HTMLElement} container
 */
function renderReviewTab(levelId, container) {
  const section = document.createElement('div');
  section.style.cssText = 'padding: var(--space-lg) 0;';

  let dueCount = 0;
  let srsStats = { newCount: 0, learningCount: 0, learnedCount: 0, masteredCount: 0 };

  try {
    const { getDueItems: getDue, getSRSStats } = { getDueItems: () => [], getSRSStats: () => srsStats };
    // Attempt dynamic access to SRS module
    import('../engine/srs.js').then(mod => {
      if (mod.getDueItems) {
        const items = mod.getDueItems(levelId);
        dueCount = Array.isArray(items) ? items.length : 0;
      }
      if (mod.getSRSStats) {
        srsStats = mod.getSRSStats(levelId) || srsStats;
      }
      updateReviewContent();
    }).catch(() => {
      updateReviewContent();
    });
  } catch (e) {
    // SRS module may not exist yet
  }

  function updateReviewContent() {
    section.innerHTML = '';

    // Due items notice
    const dueSection = document.createElement('div');
    dueSection.className = 'card';
    dueSection.style.cssText = 'text-align: center; padding: var(--space-xl) var(--space-lg); margin-bottom: var(--space-lg);';

    if (dueCount > 0) {
      dueSection.innerHTML = `
        <div style="font-size: var(--font-size-3xl); margin-bottom: var(--space-sm);">\uD83D\uDD14</div>
        <div style="font-size: var(--font-size-xl); font-weight: var(--font-weight-bold); margin-bottom: var(--space-md);">${dueCount} item${dueCount !== 1 ? 's' : ''} due for review</div>
      `;
      const reviewBtn = document.createElement('a');
      reviewBtn.href = `flashcards.html?level=${levelId}&mode=review`;
      reviewBtn.className = 'btn btn-primary btn-lg';
      reviewBtn.textContent = 'Review Due Items';
      reviewBtn.style.textDecoration = 'none';
      dueSection.appendChild(reviewBtn);
    } else {
      dueSection.innerHTML = `
        <div style="font-size: var(--font-size-3xl); margin-bottom: var(--space-sm);">\u2705</div>
        <div style="font-size: var(--font-size-lg); font-weight: var(--font-weight-bold); margin-bottom: var(--space-xs);">All caught up!</div>
        <div class="text-secondary" style="font-size: var(--font-size-sm);">No items due for review right now.</div>
      `;
    }

    section.appendChild(dueSection);

    // SRS stats grid
    const statsGrid = document.createElement('div');
    statsGrid.style.cssText = `
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: var(--space-sm);
    `;

    const statItems = [
      { label: 'New', count: srsStats.newCount, color: 'var(--color-text-secondary)' },
      { label: 'Learning', count: srsStats.learningCount, color: 'var(--color-accent-secondary)' },
      { label: 'Learned', count: srsStats.learnedCount, color: 'var(--color-accent)' },
      { label: 'Mastered', count: srsStats.masteredCount, color: 'var(--color-gold)' }
    ];

    statItems.forEach(stat => {
      const statCard = document.createElement('div');
      statCard.className = 'card';
      statCard.style.cssText = 'text-align: center; padding: var(--space-md) var(--space-xs);';
      statCard.innerHTML = `
        <div style="font-family: var(--font-heading); font-size: var(--font-size-2xl); font-weight: var(--font-weight-bold); color: ${stat.color};">${stat.count}</div>
        <div style="font-size: var(--font-size-xs); color: var(--color-text-secondary); margin-top: 2px;">${stat.label}</div>
      `;
      statsGrid.appendChild(statCard);
    });

    section.appendChild(statsGrid);
  }

  // Initial render with defaults
  updateReviewContent();
  container.appendChild(section);
}

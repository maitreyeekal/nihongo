// Shared navigation components for Nihongo learning platform

import { getSettings, saveSettings } from '../engine/storage.js';

/**
 * Renders the top navigation bar and inserts it at the top of document body.
 * @param {string} title - Page title to display
 * @param {boolean} showBack - Whether to show the back arrow
 * @param {boolean} showSettings - Whether to show dark mode toggle and settings gear
 */
export function renderNav(title, showBack = true, showSettings = true) {
  const nav = document.createElement('nav');
  nav.className = 'top-nav brush-border';
  nav.style.cssText = `
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: var(--space-md) var(--space-lg);
    background-color: var(--color-surface);
    position: sticky;
    top: 0;
    z-index: var(--z-sticky);
  `;

  // Left section: back button
  const leftSection = document.createElement('div');
  leftSection.style.cssText = 'display: flex; align-items: center; min-width: 60px;';

  if (showBack) {
    const backBtn = document.createElement('button');
    backBtn.className = 'btn btn-ghost btn-sm';
    backBtn.textContent = '\u25C1';
    backBtn.setAttribute('aria-label', 'Go back');
    backBtn.style.cssText = 'font-size: var(--font-size-xl); padding: var(--space-xs);';
    backBtn.addEventListener('click', () => history.back());
    leftSection.appendChild(backBtn);
  }

  // Center section: title
  const titleEl = document.createElement('h1');
  titleEl.style.cssText = `
    font-family: var(--font-heading);
    font-size: var(--font-size-xl);
    font-weight: var(--font-weight-bold);
    margin: 0;
    text-align: center;
    flex: 1;
  `;
  titleEl.textContent = title;

  // Right section: dark mode toggle + settings
  const rightSection = document.createElement('div');
  rightSection.style.cssText = 'display: flex; align-items: center; gap: var(--space-sm); min-width: 60px; justify-content: flex-end;';

  if (showSettings) {
    const themeBtn = document.createElement('button');
    themeBtn.className = 'btn btn-ghost btn-sm';
    themeBtn.setAttribute('aria-label', 'Toggle dark mode');
    themeBtn.style.cssText = 'font-size: var(--font-size-lg); padding: var(--space-xs);';
    const settings = getSettings();
    themeBtn.textContent = settings.darkMode ? '\u2600' : '\uD83C\uDF19';
    themeBtn.addEventListener('click', () => {
      toggleDarkMode();
      const updated = getSettings();
      themeBtn.textContent = updated.darkMode ? '\u2600' : '\uD83C\uDF19';
    });
    rightSection.appendChild(themeBtn);

    const settingsLink = document.createElement('a');
    settingsLink.href = 'settings.html';
    settingsLink.className = 'btn btn-ghost btn-sm';
    settingsLink.setAttribute('aria-label', 'Settings');
    settingsLink.style.cssText = 'font-size: var(--font-size-lg); padding: var(--space-xs); text-decoration: none;';
    settingsLink.textContent = '\u2699';
    rightSection.appendChild(settingsLink);
  }

  nav.appendChild(leftSection);
  nav.appendChild(titleEl);
  nav.appendChild(rightSection);

  document.body.insertBefore(nav, document.body.firstChild);
}

/**
 * Renders a fixed bottom navigation bar with three tabs.
 * @param {string} activePage - The currently active page ('home', 'review', or 'settings')
 */
export function renderBottomNav(activePage = 'home') {
  // Remove existing bottom nav if present
  const existing = document.querySelector('.bottom-nav');
  if (existing) existing.remove();

  const bottomNav = document.createElement('nav');
  bottomNav.className = 'bottom-nav brush-border-top';
  bottomNav.style.cssText = `
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: var(--space-sm) 0;
    padding-bottom: max(var(--space-sm), env(safe-area-inset-bottom));
    background-color: var(--color-surface);
    z-index: var(--z-sticky);
    box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.06);
  `;

  const tabs = [
    { id: 'home', label: '\u5BB6', sublabel: 'Home', href: 'index.html' },
    { id: 'review', label: '\u5FA9\u7FD2', sublabel: 'Review', href: 'flashcards.html?mode=review' },
    { id: 'settings', label: '\u8A2D\u5B9A', sublabel: 'Settings', href: 'settings.html' }
  ];

  tabs.forEach(tab => {
    const link = document.createElement('a');
    link.href = tab.href;
    link.style.cssText = `
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 2px;
      text-decoration: none;
      padding: var(--space-xs) var(--space-md);
      border-radius: var(--border-radius);
      transition: background-color var(--transition-fast), color var(--transition-fast);
      color: ${tab.id === activePage ? 'var(--color-accent)' : 'var(--color-text-secondary)'};
      font-weight: ${tab.id === activePage ? 'var(--font-weight-bold)' : 'var(--font-weight-normal)'};
    `;

    const kanji = document.createElement('span');
    kanji.style.cssText = 'font-family: var(--font-heading); font-size: var(--font-size-xl);';
    kanji.textContent = tab.label;

    const sublabel = document.createElement('span');
    sublabel.style.cssText = 'font-size: var(--font-size-xs);';
    sublabel.textContent = tab.sublabel;

    link.appendChild(kanji);
    link.appendChild(sublabel);
    bottomNav.appendChild(link);
  });

  document.body.appendChild(bottomNav);

  // Add bottom padding to body so content is not hidden behind fixed nav
  document.body.style.paddingBottom = '80px';
}

/**
 * Reads the darkMode setting and applies the data-theme attribute to <html>.
 */
export function initTheme() {
  const settings = getSettings();
  if (settings.darkMode) {
    document.documentElement.setAttribute('data-theme', 'dark');
  } else {
    document.documentElement.removeAttribute('data-theme');
  }
}

/**
 * Toggles between light and dark mode, updating the data-theme attribute and saving the preference.
 */
export function toggleDarkMode() {
  const settings = getSettings();
  settings.darkMode = !settings.darkMode;
  saveSettings(settings);

  if (settings.darkMode) {
    document.documentElement.setAttribute('data-theme', 'dark');
  } else {
    document.documentElement.removeAttribute('data-theme');
  }
}

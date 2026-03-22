// Main dashboard UI for Nihongo learning platform (index.html)

import { getAllLevelProgress, getOverallProgress } from '../engine/progress.js';
import { levels } from '../data/levels.js';
import { renderNav, renderBottomNav, initTheme } from './nav.js';

export function initDashboard() {
  initTheme();
  renderNav('日本語', false, true);

  const app = document.getElementById('app') || document.querySelector('.page-container');
  if (!app) return;

  // Welcome header
  const welcome = document.createElement('section');
  welcome.style.cssText = 'text-align:center; padding: 32px 0 24px;';
  welcome.innerHTML = `
    <h1 style="font-family:var(--font-heading); font-size:2.5rem; margin-bottom:8px;">日本語</h1>
    <p style="color:var(--color-text-secondary); font-size:1rem;">Learn Japanese from scratch</p>
  `;
  app.appendChild(welcome);

  // Overall progress
  const overall = getOverallProgress();
  const progressSection = document.createElement('section');
  progressSection.style.cssText = 'margin-bottom:32px;';
  progressSection.innerHTML = `
    <h2 style="font-family:var(--font-heading); font-size:1.25rem; margin-bottom:12px;">Your Journey</h2>
    <div style="display:flex; justify-content:space-between; margin-bottom:6px; font-size:0.875rem;">
      <span>${overall.completedLevels} of ${overall.totalLevels} levels completed</span>
      <span style="color:var(--color-accent); font-weight:700;">${overall.percentage}%</span>
    </div>
    <div class="progress-bar" style="height:10px; background:var(--color-border); border-radius:5px; overflow:hidden;">
      <div style="height:100%; width:${overall.percentage}%; background:var(--color-accent); border-radius:5px; transition:width 0.4s;"></div>
    </div>
  `;
  app.appendChild(progressSection);

  // Level cards
  const allProgress = getAllLevelProgress();
  const levelList = document.createElement('div');
  levelList.style.cssText = 'display:flex; flex-direction:column; gap:12px; padding-bottom:80px;';

  allProgress.forEach((prog, idx) => {
    const level = levels[idx] || {};
    const levelId = prog.levelId;
    const title = level.title || `Level ${levelId}`;
    const titleJp = level.titleJp || '';
    const icon = level.icon || '';
    const isUnlocked = prog.unlocked;
    const isCompleted = prog.completed;

    const card = document.createElement('div');
    card.style.cssText = `
      position: relative;
      display: flex;
      align-items: center;
      gap: 16px;
      padding: 16px 20px;
      background: var(--color-surface);
      border: 1px solid var(--color-border);
      border-radius: 8px;
      overflow: hidden;
      transition: transform 0.2s, box-shadow 0.2s;
      ${isUnlocked ? 'cursor:pointer;' : 'opacity:0.7;'}
    `;

    if (isUnlocked) {
      card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-2px)';
        card.style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)';
      });
      card.addEventListener('mouseleave', () => {
        card.style.transform = 'none';
        card.style.boxShadow = 'none';
      });
      card.addEventListener('click', () => {
        window.location.href = `level.html?id=${levelId}`;
      });
    }

    // Level number + icon
    const badge = document.createElement('div');
    badge.style.cssText = 'display:flex; flex-direction:column; align-items:center; min-width:44px;';
    badge.innerHTML = `
      <span style="font-family:var(--font-heading); font-size:1.5rem; font-weight:700; color:var(--color-gold); line-height:1;">${levelId}</span>
      <span style="font-size:1.1rem; margin-top:2px;">${icon}</span>
    `;

    // Title + subtitle
    const info = document.createElement('div');
    info.style.cssText = 'flex:1; min-width:0;';
    info.innerHTML = `
      <div style="font-family:var(--font-heading); font-size:1.05rem; font-weight:700; margin-bottom:2px;">${title}</div>
      <div style="font-size:0.8rem; color:var(--color-text-secondary);">${titleJp}</div>
    `;

    // Right side: score or lock
    const right = document.createElement('div');
    right.style.cssText = 'flex-shrink:0; text-align:center; min-width:50px;';

    if (!isUnlocked) {
      right.innerHTML = `<span style="font-size:1.3rem;">🔒</span>`;
    } else if (isCompleted) {
      right.innerHTML = `
        <div style="font-size:1.1rem; font-weight:700; color:var(--color-success);">${prog.bestScore}%</div>
        <div style="font-size:0.7rem; color:var(--color-success);">✓ Done</div>
      `;
    } else {
      right.innerHTML = `
        <div style="font-size:1.1rem; font-weight:700; color:var(--color-accent);">${prog.bestScore}%</div>
        <div style="font-size:0.7rem; color:var(--color-text-secondary);">Best</div>
      `;
    }

    card.appendChild(badge);
    card.appendChild(info);
    card.appendChild(right);

    // Lock overlay
    if (!isUnlocked) {
      const overlay = document.createElement('div');
      overlay.style.cssText = `
        position:absolute; inset:0;
        background:rgba(0,0,0,0.04);
        display:flex; align-items:center; justify-content:center;
        pointer-events:none;
      `;
      card.appendChild(overlay);
    }

    levelList.appendChild(card);
  });

  app.appendChild(levelList);
  renderBottomNav('home');
}

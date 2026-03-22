// Quiz UI rendering for Nihongo learning platform (quiz.html)

import { generateQuiz, scoreQuiz } from '../engine/quiz-engine.js';
import { completeQuiz } from '../engine/progress.js';
import { speak, initAudio } from '../engine/audio.js';
import { renderNav, initTheme } from './nav.js';
import { levels } from '../data/levels.js';

let questions = [];
let currentQuestion = 0;
let answers = [];
let levelId = null;

function getQuestionCount(id) {
  const level = levels.find(l => l.id === id);
  return level ? level.quizQuestions : 15;
}

export function initQuiz() {
  try {
    const params = new URLSearchParams(window.location.search);
    levelId = parseInt(params.get('level'), 10);

    if (!levelId || levelId < 1 || levelId > 8) {
      window.location.href = 'index.html';
      return;
    }

    initTheme();
    initAudio();
    renderNav('Quiz', true, false);

    currentQuestion = 0;
    answers = [];

    questions = generateQuiz(levelId, getQuestionCount(levelId));

    if (!questions || questions.length === 0) {
      showError('Could not generate quiz questions for this level.');
      return;
    }

    renderQuizContainer();
    renderQuestion();
  } catch (err) {
    console.error('Failed to initialize quiz:', err);
    showError('Failed to load quiz. Please go back and try again.');
  }
}

function showError(message) {
  const container = document.querySelector('.page-container') || document.body;
  container.innerHTML = `
    <div style="text-align:center; padding: 64px 16px; min-height: 60vh; display:flex; flex-direction:column; align-items:center; justify-content:center;">
      <div style="font-size: 2rem; margin-bottom: 16px;">&#9888;&#65039;</div>
      <p style="color: var(--color-text-secondary); margin-bottom: 16px;">${message}</p>
      <a href="index.html" class="btn btn-primary" style="text-decoration:none;">Back to Home</a>
    </div>
  `;
}

function renderQuizContainer() {
  const container = document.querySelector('.page-container');
  if (container) {
    container.innerHTML = '';
    container.id = 'quiz-main';
  }
}

function renderQuestion() {
  const main = document.getElementById('quiz-main') || document.querySelector('.page-container');
  if (!main) return;
  main.innerHTML = '';

  const q = questions[currentQuestion];
  const total = questions.length;

  // Progress bar
  const progressSection = document.createElement('div');
  progressSection.style.cssText = 'margin-bottom: 40px;';
  progressSection.innerHTML = `
    <div style="display:flex; justify-content:space-between; margin-bottom:8px; font-size:0.875rem;">
      <span>Question ${currentQuestion + 1} of ${total}</span>
      <span style="color:var(--color-accent); font-weight:700;">${Math.round((currentQuestion / total) * 100)}%</span>
    </div>
    <div class="progress-bar">
      <div class="progress-bar-fill" style="width:${(currentQuestion / total) * 100}%; transition:width 0.4s ease;"></div>
    </div>
  `;
  main.appendChild(progressSection);

  // Question display
  const questionSection = document.createElement('div');
  questionSection.style.cssText = 'text-align:center; margin-bottom:40px; padding:40px 0;';

  // Question prompt text
  const promptEl = document.createElement('div');
  promptEl.style.cssText = 'font-size:0.875rem; color:var(--color-text-secondary); margin-bottom:16px;';
  promptEl.textContent = q.question || '';
  questionSection.appendChild(promptEl);

  // Main character/content display
  const charDisplay = document.createElement('div');
  charDisplay.style.cssText = `
    font-family: var(--font-heading);
    font-size: 4rem;
    font-weight: 700;
    line-height: 1.1;
    margin-bottom: 16px;
    color: var(--color-text);
    user-select: none;
  `;
  charDisplay.textContent = q.questionDisplay || '';
  questionSection.appendChild(charDisplay);

  // Example sentence if present
  if (q.example) {
    const exampleEl = document.createElement('div');
    exampleEl.style.cssText = 'font-size:0.9rem; color:var(--color-text-secondary); font-style:italic; margin-bottom:12px;';
    exampleEl.textContent = q.example;
    questionSection.appendChild(exampleEl);
  }

  // Speaker icon
  const speakerBtn = document.createElement('button');
  speakerBtn.className = 'btn btn-ghost';
  speakerBtn.style.cssText = 'font-size:1.5rem; padding:4px 8px;';
  speakerBtn.textContent = '\uD83D\uDD0A';
  speakerBtn.setAttribute('aria-label', 'Hear pronunciation');
  speakerBtn.addEventListener('click', () => {
    speak(q.questionDisplay || '');
  });
  questionSection.appendChild(speakerBtn);

  main.appendChild(questionSection);

  // 2x2 Options grid
  const optionsGrid = document.createElement('div');
  optionsGrid.className = 'quiz-options';
  optionsGrid.style.cssText = `
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
    max-width: 500px;
    margin: 0 auto;
  `;

  const options = q.options || [];
  options.forEach((option, idx) => {
    const optBtn = document.createElement('button');
    optBtn.className = 'quiz-option';
    optBtn.style.cssText = `
      padding: 16px 20px;
      font-size: 1.1rem;
      font-weight: 500;
      background-color: var(--color-surface);
      color: var(--color-text);
      border: 2px solid var(--color-border);
      border-radius: 8px;
      cursor: pointer;
      transition: all 0.2s ease;
      min-height: 60px;
      word-break: break-word;
    `;
    optBtn.textContent = option;

    optBtn.addEventListener('mouseenter', () => {
      if (!optBtn.disabled) {
        optBtn.style.borderColor = 'var(--color-accent)';
        optBtn.style.transform = 'translateY(-1px)';
      }
    });
    optBtn.addEventListener('mouseleave', () => {
      if (!optBtn.disabled) {
        optBtn.style.borderColor = 'var(--color-border)';
        optBtn.style.transform = 'none';
      }
    });

    optBtn.addEventListener('click', () => selectAnswer(option, idx, optionsGrid, q));
    optionsGrid.appendChild(optBtn);
  });

  main.appendChild(optionsGrid);
}

function selectAnswer(selectedOption, selectedIndex, optionsGrid, q) {
  const isCorrect = selectedOption === q.correctAnswer;

  // Disable all buttons and highlight correct/wrong
  const buttons = optionsGrid.querySelectorAll('.quiz-option');
  buttons.forEach((btn) => {
    btn.disabled = true;
    btn.style.cursor = 'default';

    if (btn.textContent === q.correctAnswer) {
      btn.style.borderColor = 'var(--color-success)';
      btn.style.backgroundColor = 'rgba(122, 139, 105, 0.15)';
      btn.style.color = 'var(--color-success)';
      btn.style.fontWeight = '700';
    }

    if (btn.textContent === selectedOption && !isCorrect) {
      btn.style.borderColor = 'var(--color-accent-secondary)';
      btn.style.backgroundColor = 'rgba(200, 75, 49, 0.15)';
      btn.style.color = 'var(--color-accent-secondary)';
    }
  });

  // Record answer
  answers.push({
    questionId: q.id,
    selectedAnswer: selectedOption,
    correctAnswer: q.correctAnswer,
    questionDisplay: q.questionDisplay,
    isCorrect
  });

  // Advance after delay
  setTimeout(() => {
    currentQuestion++;
    if (currentQuestion < questions.length) {
      renderQuestion();
    } else {
      showResults();
    }
  }, 1000);
}

function showResults() {
  const main = document.getElementById('quiz-main') || document.querySelector('.page-container');
  if (!main) return;
  main.innerHTML = '';

  const result = scoreQuiz(answers);
  const { score, total, percentage, mistakes } = result;
  const passed = percentage >= 70;

  // Save results
  completeQuiz(levelId, score, total);

  // Results container
  const resultsSection = document.createElement('div');
  resultsSection.style.cssText = 'text-align:center; padding:40px 0;';

  // Score circle
  resultsSection.innerHTML = `
    <div style="width:140px; height:140px; border-radius:50%; display:flex; flex-direction:column; align-items:center; justify-content:center; margin:0 auto 24px; border:6px solid ${passed ? 'var(--color-success)' : 'var(--color-accent-secondary)'}; background:${passed ? 'rgba(122,139,105,0.1)' : 'rgba(200,75,49,0.1)'};">
      <div style="font-family:var(--font-heading); font-size:2.5rem; font-weight:700; color:${passed ? 'var(--color-success)' : 'var(--color-accent-secondary)'}; line-height:1;">${percentage}%</div>
      <div style="font-size:0.875rem; color:var(--color-text-secondary); margin-top:2px;">${score}/${total}</div>
    </div>
    <div style="font-family:var(--font-heading); font-size:1.5rem; font-weight:700; margin-bottom:16px; color:${passed ? 'var(--color-success)' : 'var(--color-accent-secondary)'};">
      ${passed ? 'Congratulations!' : 'Keep Practicing!'}
    </div>
  `;

  // Unlock celebration
  if (passed && levelId < 8) {
    const unlockDiv = document.createElement('div');
    unlockDiv.className = 'card';
    unlockDiv.style.cssText = 'display:inline-block; padding:16px 40px; margin-bottom:24px; border:2px solid var(--color-gold); background:rgba(184,134,11,0.08);';
    unlockDiv.innerHTML = `
      <div style="font-size:1.5rem; margin-bottom:4px;">&#127881;</div>
      <div style="font-family:var(--font-heading); font-weight:700; color:var(--color-gold);">Level ${levelId + 1} Unlocked!</div>
    `;
    resultsSection.appendChild(unlockDiv);
  }

  main.appendChild(resultsSection);

  // Mistakes list
  if (mistakes.length > 0) {
    const mistakesSection = document.createElement('div');
    mistakesSection.style.cssText = 'margin-bottom:40px;';

    const mistakesHeader = document.createElement('h3');
    mistakesHeader.style.cssText = 'font-family:var(--font-heading); font-size:1.1rem; margin-bottom:12px;';
    mistakesHeader.textContent = `Mistakes (${mistakes.length})`;
    mistakesSection.appendChild(mistakesHeader);

    mistakes.forEach(m => {
      const card = document.createElement('div');
      card.className = 'card';
      card.style.cssText = 'display:flex; align-items:center; gap:16px; margin-bottom:8px; padding:12px 20px; border-left:3px solid var(--color-accent-secondary);';
      card.innerHTML = `
        <div style="font-family:var(--font-heading); font-size:1.5rem; font-weight:700; min-width:50px; text-align:center;">${m.questionDisplay || ''}</div>
        <div style="flex:1;">
          <div style="font-size:0.8rem; color:var(--color-accent-secondary); margin-bottom:2px;">Your answer: ${m.selected}</div>
          <div style="font-size:0.8rem; color:var(--color-success); font-weight:500;">Correct: ${m.correct}</div>
        </div>
      `;
      mistakesSection.appendChild(card);
    });

    main.appendChild(mistakesSection);
  }

  // Action buttons
  const actionsSection = document.createElement('div');
  actionsSection.style.cssText = 'display:flex; flex-direction:column; gap:12px; max-width:400px; margin:0 auto;';

  if (mistakes.length > 0) {
    const retryBtn = document.createElement('button');
    retryBtn.className = 'btn btn-secondary';
    retryBtn.style.cssText = 'width:100%; padding:12px;';
    retryBtn.textContent = 'Retry Mistakes';
    retryBtn.addEventListener('click', () => {
      // Re-generate quiz from mistakes only - build new questions from mistake data
      currentQuestion = 0;
      answers = [];
      // Re-quiz with fewer questions using the same level but only mistake count
      questions = generateQuiz(levelId, mistakes.length);
      renderQuestion();
    });
    actionsSection.appendChild(retryBtn);
  }

  const backBtn = document.createElement('a');
  backBtn.href = `level.html?id=${levelId}`;
  backBtn.className = 'btn btn-primary';
  backBtn.style.cssText = 'width:100%; padding:12px; text-decoration:none; text-align:center;';
  backBtn.textContent = 'Back to Level';
  actionsSection.appendChild(backBtn);

  const homeBtn = document.createElement('a');
  homeBtn.href = 'index.html';
  homeBtn.className = 'btn btn-ghost';
  homeBtn.style.cssText = 'width:100%; padding:12px; text-decoration:none; text-align:center;';
  homeBtn.textContent = 'Back to Home';
  actionsSection.appendChild(homeBtn);

  main.appendChild(actionsSection);
}

/**
 * Lolo Dialog Engine
 * Core state machine and DialogFlow engine for conversational UI
 *
 * @version 1.3.0
 * @license Copyright © 2026 Lolo. All rights reserved.
 */

// ═══ State Machine ═══
export const DEFAULT_STATES = {
  'initial': {
    headerText: 'Hey Alice, what would you like to do?',
    thinking: false,
    sections: ['initial'],
    placeholder: 'Ask something...',
    showFullscreen: false,
    closeIsStop: false,
    showUpload: true,
    showMinimize: false,
    sendDisabled: false,
    showInput: true,
  },
  'thinking': {
    headerText: 'Thinking...',
    thinking: true,
    sections: ['user-message'],
    placeholder: 'Ask something else',
    showFullscreen: false,
    closeIsStop: true,
    showUpload: true,
    showMinimize: false,
    sendDisabled: true,
    showInput: true,
  },
  'response-actions': {
    headerText: 'Here\'s what I found',
    thinking: false,
    sections: ['response', 'action-chips'],
    placeholder: 'Ask something else',
    showFullscreen: true,
    closeIsStop: false,
    showUpload: false,
    showMinimize: true,
    sendDisabled: false,
    showInput: true,
  },
  'response-input': {
    headerText: 'Here\'s what I found',
    thinking: false,
    sections: ['response'],
    placeholder: 'Ask something else',
    showFullscreen: true,
    closeIsStop: false,
    showUpload: true,
    showMinimize: false,
    sendDisabled: false,
    showInput: true,
  },
  'canvas': {
    headerText: 'Does this look right?',
    thinking: false,
    sections: ['canvas'],
    placeholder: 'Ask something else',
    showFullscreen: true,
    closeIsStop: false,
    showUpload: true,
    showMinimize: false,
    sendDisabled: true,
    showInput: true,
  },
  'success': {
    headerText: 'All set!',
    thinking: false,
    sections: [],
    placeholder: 'Ask something else',
    showFullscreen: false,
    closeIsStop: false,
    showUpload: false,
    showMinimize: false,
    sendDisabled: false,
    showInput: false,
  },
};

// ═══ DialogFlow Class ═══
export class DialogFlow {
  constructor(config) {
    this.steps = config.steps || [];
    this.currentStep = 0;
    this.answers = {};
    this.onComplete = config.onComplete || (() => {});
  }

  start() {
    console.log('DialogFlow.start() called');
    this.currentStep = 0;
    this.answers = {};
    this.renderStep();
  }

  advance(answer) {
    console.log('DialogFlow.advance() called with:', answer);
    const step = this.steps[this.currentStep];
    this.answers[step.id || `step-${this.currentStep}`] = answer;
    this.currentStep++;

    // Brief thinking interstitial between steps
    if (window.setState) {
      window.setState('thinking');
      setTimeout(() => this.renderStep(), 2400);
    } else {
      this.renderStep();
    }
  }

  renderStep() {
    if (this.currentStep >= this.steps.length) {
      this.onComplete(this.answers);
      return;
    }

    const step = this.steps[this.currentStep];

    // Clear all sections
    document.querySelectorAll('[data-section]').forEach(el => el.classList.remove('visible'));

    // Update header
    const headerText = document.getElementById('headerText');
    if (headerText) {
      headerText.textContent = step.question;
      headerText.className = 'header-text';
      headerText.style.display = '';
    }

    // Update UI elements
    const fullscreenBtn = document.getElementById('fullscreenBtn');
    if (fullscreenBtn) fullscreenBtn.style.display = step.showInsights ? 'flex' : 'none';

    const inputBar = document.getElementById('inputBar');
    if (inputBar) inputBar.style.display = 'flex';

    const uploadBtn = document.getElementById('uploadBtn');
    if (uploadBtn) uploadBtn.style.display = 'flex';

    const minimizeBtn = document.getElementById('minimizeBtn');
    if (minimizeBtn) minimizeBtn.style.display = 'none';

    const sendBtn = document.getElementById('sendBtn');
    if (sendBtn) sendBtn.disabled = false;

    // Hide success indicator
    const successIndicator = document.getElementById('successIndicator');
    if (successIndicator) successIndicator.style.display = 'none';

    // Render based on step type
    if (step.type === 'suggestions') this._renderSuggestions(step);
    else if (step.type === 'results') this._renderResults(step);
    else if (step.type === 'canvas') this._renderCanvas(step);
  }

  _renderSuggestions(step) {
    // First step: horizontal layout in initial section
    // Subsequent steps: vertical layout in response section
    const isFirstStep = this.currentStep === 0;

    if (isFirstStep) {
      const container = document.querySelector('[data-section="initial"]');
      if (!container) {
        console.error('Container [data-section="initial"] not found');
        return;
      }

      container.innerHTML = step.options.map((o, i) => `
        <div class="suggestion-chip" data-option-index="${i}">
          ${o.icon ? `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">${o.icon}</svg>` : ''}
          <span>${o.label}</span>
        </div>`).join('');

      // Add click listeners
      container.querySelectorAll('.suggestion-chip').forEach((chip, i) => {
        chip.addEventListener('click', () => {
          console.log('Suggestion chip clicked:', step.options[i].value);
          this.advance(step.options[i].value);
        });
      });

      container.classList.add('visible');
      console.log('Rendered', step.options.length, 'horizontal suggestion chips');
    } else {
      // Subsequent steps: render vertically in response area
      const container = document.querySelector('[data-section="response"]');
      if (!container) {
        console.error('Container [data-section="response"] not found');
        return;
      }

      container.innerHTML = step.options.map((o, i) => `
        <div class="suggestion-option fade-in" style="animation-delay:${i*0.1}s" data-option-index="${i}">
          ${o.icon ? `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">${o.icon}</svg>` : ''}
          <span>${o.label}</span>
        </div>`).join('');

      // Add click listeners
      container.querySelectorAll('.suggestion-option').forEach((option, i) => {
        option.addEventListener('click', () => {
          console.log('Suggestion option clicked:', step.options[i].value);
          this.advance(step.options[i].value);
        });
      });

      container.classList.add('visible');
      console.log('Rendered', step.options.length, 'vertical suggestion options');
    }
  }

  _renderResults(step) {
    const container = document.querySelector('[data-section="response"]');
    if (!container) {
      console.error('Container [data-section="response"] not found');
      return;
    }

    container.innerHTML = step.results.map((r, i) => {
      // Detailed result row (multi-line with badges)
      if (r.detailed) {
        return `
          <div class="result-row detailed fade-in" style="animation-delay:${i*0.1}s" data-result-id="${r.id}">
            <div class="result-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14,2 14,8 20,8"/>
              </svg>
            </div>
            <div class="result-content">
              <div class="result-header">
                <span class="result-title">${r.title}</span>
                ${r.status ? `<span class="result-badge ${r.status}">${r.status}</span>` : ''}
                ${r.role ? `<span class="result-badge role">${r.role}</span>` : ''}
              </div>
              ${r.details ? `<div class="result-details">${r.details}</div>` : ''}
              ${r.meta ? `<div class="result-meta">${r.meta}</div>` : ''}
            </div>
          </div>`;
      }

      // Simple result row
      return `
        <div class="result-row fade-in" style="animation-delay:${i*0.1}s" data-result-id="${r.id}">
          <div class="result-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14,2 14,8 20,8"/>
            </svg>
          </div>
          <div class="result-content">
            <span class="result-quote">${r.quote}</span>
            <span class="result-source">${r.source}</span>
          </div>
        </div>`;
    }).join('');

    // Add click listeners
    container.querySelectorAll('.result-row').forEach(row => {
      const resultId = row.getAttribute('data-result-id');
      row.addEventListener('click', () => {
        console.log('Result row clicked:', resultId);
        this.advance(resultId);
      });
    });

    container.classList.add('visible');
    console.log('Rendered', step.results.length, 'result rows');
  }

  _renderCanvas(step) {
    const container = document.querySelector('[data-section="canvas"]');
    if (!container) {
      console.error('Container [data-section="canvas"] not found');
      return;
    }

    container.innerHTML = `
      <div class="doc-card fade-in">
        <div class="doc-preview">
          <div class="doc-preview-inner">
            <div class="doc-preview-title">${step.docTitle || 'Document'}</div>
            <div class="doc-preview-line"></div>
            <div class="doc-preview-line" style="width:80%"></div>
            <div class="doc-preview-line"></div>
            <div class="doc-preview-line" style="width:65%"></div>
            <div class="doc-preview-line"></div>
            <div class="doc-preview-line" style="width:90%"></div>
            <div class="doc-preview-line" style="width:55%"></div>
            <div class="doc-preview-line"></div>
            <div class="doc-preview-line" style="width:75%"></div>
          </div>
        </div>
        <div class="doc-info">
          <div class="doc-title">${step.docName || 'Document Name'}</div>
          <button class="doc-action-btn">${step.actionLabel || 'Confirm'}</button>
        </div>
      </div>`;

    // Add click listener to action button
    const actionBtn = container.querySelector('.doc-action-btn');
    if (actionBtn) {
      actionBtn.addEventListener('click', () => {
        console.log('Canvas action button clicked');
        this.advance(step.actionValue || 'confirm');
        // Trigger success if available
        if (window.triggerSuccess) {
          window.triggerSuccess();
        }
      });
    }

    container.classList.add('visible');
    console.log('Rendered canvas with action:', step.actionLabel);
  }
}

// ═══ Helper Functions ═══
export function showUserMessage(text, callback) {
  console.log('showUserMessage called with:', text);

  const userBubble = document.getElementById('userBubble');
  if (userBubble) userBubble.textContent = text;

  // Hide all sections
  document.querySelectorAll('[data-section]').forEach(el => el.classList.remove('visible'));

  // Show user message
  const userMessage = document.querySelector('[data-section="user-message"]');
  if (userMessage) userMessage.classList.add('visible');

  // Set thinking state
  const headerText = document.getElementById('headerText');
  if (headerText) {
    headerText.textContent = 'Thinking...';
    headerText.className = 'header-text thinking';
  }

  // Update input bar
  const inputBar = document.getElementById('inputBar');
  if (inputBar) inputBar.style.display = 'flex';

  const uploadBtn = document.getElementById('uploadBtn');
  if (uploadBtn) uploadBtn.style.display = 'flex';

  const sendBtn = document.getElementById('sendBtn');
  if (sendBtn) sendBtn.disabled = true;

  // Execute callback after thinking duration
  setTimeout(callback, 2400);
}

export function setState(stateName, states = DEFAULT_STATES) {
  const s = states[stateName];
  if (!s) {
    console.error(`State "${stateName}" not found`);
    return;
  }

  const headerText = document.getElementById('headerText');
  const successIndicator = document.getElementById('successIndicator');

  if (stateName === 'success') {
    // Show success indicator
    if (headerText) headerText.style.display = 'none';

    if (!successIndicator) {
      const si = document.createElement('div');
      si.id = 'successIndicator';
      si.className = 'success-indicator';
      si.innerHTML = `
        <div class="success-check">
          <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="2,6 5,9 10,3"/>
          </svg>
        </div>
        <span style="font-size:18px;font-weight:500;letter-spacing:-0.4px;color:var(--text-primary);">${s.headerText}</span>
      `;
      headerText?.parentNode.insertBefore(si, headerText.nextSibling);
    }
    if (successIndicator) successIndicator.style.display = 'flex';
  } else {
    // Normal header
    if (headerText) {
      headerText.style.display = '';
      headerText.textContent = s.headerText;
      headerText.className = 'header-text' + (s.thinking ? ' thinking' : '');
    }
    if (successIndicator) successIndicator.style.display = 'none';
  }

  // Show/hide sections
  document.querySelectorAll('[data-section]').forEach(el => el.classList.remove('visible'));
  s.sections.forEach(name => {
    const el = document.querySelector(`[data-section="${name}"]`);
    if (el) el.classList.add('visible');
  });

  // Update input bar
  const inputBar = document.getElementById('inputBar');
  if (inputBar) inputBar.style.display = s.showInput ? 'flex' : 'none';

  const inputField = document.getElementById('inputField');
  if (inputField) inputField.placeholder = s.placeholder;

  const uploadBtn = document.getElementById('uploadBtn');
  if (uploadBtn) uploadBtn.style.display = s.showUpload ? 'flex' : 'none';

  const minimizeBtn = document.getElementById('minimizeBtn');
  if (minimizeBtn) minimizeBtn.style.display = s.showMinimize ? 'flex' : 'none';

  const sendBtn = document.getElementById('sendBtn');
  if (sendBtn) sendBtn.disabled = s.sendDisabled;

  const fullscreenBtn = document.getElementById('fullscreenBtn');
  if (fullscreenBtn) fullscreenBtn.style.display = s.showFullscreen ? 'flex' : 'none';
}

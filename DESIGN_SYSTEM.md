# Lolo Dialog Design System

**Version:** 1.0.0
**Last Updated:** 2026-02-28

This document establishes the locked design system for the Lolo Dialog component. **No new components or styles should be created unless explicitly required.** All dialog flows must use these established patterns.

---

## Design Tokens

### Colors

```css
--white: #ffffff;
--canvas: #f6f5f2;

/* Neutrals */
--neutral-50: #ffffff;
--neutral-100: #f6f5f2;
--neutral-200: #f0eee6;
--neutral-800: #3d3935;

/* Text */
--text-primary: #3d3935;
--text-secondary: #6b665f;
--text-tertiary: #938d85;

/* Borders */
--borders-default: #f0eee6;

/* Lavender (Primary Brand) */
--lavender-100: #f0ecfa;
--lavender-200: #e0d9f4;
--lavender-500: #a599d9;
--lavender-700: #7e6fca;
--lavender-800: #6457a6;

/* User Bubble (Steel Blue) */
--user-bubble: #4E7195;
--user-bubble-dark: #3d5a76;

/* Surfaces */
--surfaces-default: #ffffff;
--surfaces-canvas: #f6f5f2;
```

### Spacing

```css
--sp-1: 4px;
--sp-2: 8px;
--sp-3: 12px;
--sp-4: 16px;
--sp-6: 24px;
--sp-8: 32px;
```

### Radius

```css
--r-sm: 4px;
--r-md: 6px;
--r-lg: 8px;
--r-xl: 12px;
--r-2xl: 16px;
--r-full: 9999px;
```

### Shadows

```css
--shadow-xxs: 0px 1px 1px rgba(16,24,40,0.07), 1px 1px 2px rgba(0,0,0,0.04);
--shadow-xl: 0px 12px 24px 4px rgba(16,24,40,0.07);
```

### Typography

**Font Family:** 'Plus Jakarta Sans', system-ui, sans-serif

---

## Core Components

### 1. Dialog Container

**Class:** `.dialog`

**Purpose:** Main container for the dialog interface

**Specs:**
- Fixed positioning: `bottom: 32px`, centered with `transform: translateX(-50%)`
- Width: `640px`
- Background: `var(--white)`
- Border radius: `var(--r-2xl)`
- Box shadow: `var(--shadow-xl)`
- Display: `flex`, `flex-direction: column`

**States:**
- `.dialog.fullscreen` - Expands to full viewport

---

### 2. Header

**Class:** `.dialog-header`

**Purpose:** Contains logo, header text, and action buttons

**Specs:**
- Display: `flex`, space-between alignment
- Padding: `var(--sp-2) var(--sp-3)`
- Min-height: `52px`

**Sub-components:**
- `.logo` - 36×36px container for Lolo logo SVG (20×21px)
- `.header-text` - Title text, 18px, weight 500, line-height 28px, letter-spacing -0.4px
- `.header-text.thinking` - Shimmer gradient animation state
- `.header-actions` - Container for icon buttons

---

### 3. Icon Buttons

**Class:** `.icon-btn`

**Purpose:** Circular action buttons (close, fullscreen, stop)

**Specs:**
- Size: 36×36px
- Border radius: `var(--r-full)`
- Border: `1px solid var(--borders-default)`
- Background: transparent
- SVG size: 16×16px
- Hover: `background: var(--neutral-100)`

**Variants:**
- `.icon-btn.stop` - Lavender border/hover for stop action

---

### 4. Suggestion Chips

**Class:** `.suggestion-chip`

**Purpose:** Initial action suggestions presented to user

**Container:** `.suggestions-row`

**Specs:**
- Display: `flex`, gap `var(--sp-1)`
- Padding: `var(--sp-2) var(--sp-3)`
- Border: `1px solid var(--borders-default)`
- Border radius: `var(--r-md)`
- Hover: `background: var(--lavender-100)`, `border-color: var(--lavender-200)`
- Icon: 24×24px SVG
- Text: 12px, weight 400, line-height 16px, color `var(--text-secondary)`

**Layout:** Horizontal flex row with `var(--sp-3)` gap

---

### 5. User Message Bubble

**Class:** `.user-bubble`

**Container:** `.user-message`

**Purpose:** Display user's input message

**Specs:**
- **Container:** `display: flex`, `justify-content: flex-end` (right-justified)
- **Bubble:** `display: inline-block` (hugs content)
- Background: `var(--user-bubble)` (#4E7195 steel blue)
- Color: `#ffffff`
- Font size: 13px, weight 500, line-height 20px
- Padding: `10px 16px`
- Border radius: `20px 20px 4px 20px` (bottom-right corner clipped)
- Max-width: `85%` (ensures wrapping on long messages)
- Word break: `break-word`

**Critical Rules:**
- ✅ MUST be right-justified via parent flex container
- ✅ MUST hug content width (no full-width stretching)
- ✅ Short messages = short bubble, long messages = wrapped bubble

---

### 6. Response Area

**Class:** `.response-area`

**Purpose:** Container for result rows

**Specs:**
- Display: `flex`, `flex-direction: column`, gap `var(--sp-2)`
- Padding: `var(--sp-2) var(--sp-3)`

**Sub-component: Result Row**

**Class:** `.result-row`

**Specs:**
- Display: `flex`, gap `var(--sp-3)`
- Padding: `var(--sp-2) var(--sp-3)`
- Border radius: `var(--r-md)`
- Cursor: pointer
- Hover: `background: var(--lavender-100)`
- Contains:
  - `.result-icon` - 24×24px icon
  - `.result-content` - Quote and source text
  - `.result-quote` - 14px, primary color, ellipsis overflow
  - `.result-source` - 13px, tertiary color

---

### 7. Canvas Area

**Class:** `.canvas-area`

**Purpose:** Display preview cards (documents, contacts, etc.)

**Specs:**
- Padding: `var(--sp-4)`

**Sub-component: Document Card**

**Class:** `.doc-card`

**Specs:**
- Width: `232px`
- Border: `1px solid var(--borders-default)`
- Border radius: `var(--r-xl)`
- Box shadow: `var(--shadow-xxs)`
- Contains:
  - `.doc-preview` - 126px height preview area
  - `.doc-preview-inner` - 184px wide document preview
  - `.doc-info` - Metadata and actions
  - `.doc-title` - 16px, weight 400, line-height 24px
  - `.doc-action-btn` - Primary action button (lavender-700)

---

### 8. Action Chips

**Class:** `.action-chip`

**Container:** `.action-suggestions`

**Purpose:** Contextual action suggestions after response

**Specs:**
- Display: `flex`, gap `var(--sp-2)`
- Padding: `var(--sp-2) var(--sp-3)`
- Border: `1px solid var(--borders-default)`
- Border radius: `var(--r-md)`
- Hover: `background: var(--lavender-100)`, `border-color: var(--lavender-200)`
- Icon: 24×24px SVG
- Text: 12px, secondary color

**Difference from Suggestion Chips:**
- Action chips appear AFTER a response
- Suggestion chips appear at dialog start

---

### 9. Success Indicator

**Class:** `.success-indicator`

**Purpose:** Replaces header text on successful completion

**Specs:**
- Display: `flex`, gap 8px
- `.success-check` - 22×22px circle, `#e8f5e9` background, `#388e3c` checkmark
- Text: 18px, weight 500, letter-spacing -0.4px

---

### 10. Input Bar

**Class:** `.input-bar`

**Purpose:** User input controls

**Specs:**
- Display: `flex`, gap `var(--sp-2)`
- Padding: `var(--sp-3)`

**Sub-components:**
- `.input-field` - Main text input (height 40px, canvas background, rounded `var(--r-lg)`)
- `.upload-btn` - 40×40px square button with `+` icon
- `.minimize-btn` - 40×40px square button
- `.send-btn` - 40×40px circular button (lavender-700, full radius)

---

## Animations

### Shimmer (Thinking State)

**Class:** `.header-text.thinking`

**Purpose:** Animated gradient during processing

```css
animation: shimmer 2.4s ease-in-out infinite;
```

### Fade In

**Class:** `.fade-in`

**Purpose:** Element entrance animation

```css
animation: fadeIn 0.25s cubic-bezier(0.4, 0, 0.2, 1) both;
```

### Slide Up

**Class:** `.slide-up`

**Purpose:** Dialog entrance animation

```css
animation: slideUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards;
```

---

## State Management

### Data Attributes

**Sections:** `[data-section]`

All major content sections use `data-section` attributes:
- `data-section="initial"` - Suggestion chips
- `data-section="user-message"` - User bubble
- `data-section="response"` - Response results
- `data-section="canvas"` - Canvas area
- `data-section="action-chips"` - Action suggestions

**Visibility:** `.visible` class added/removed to show/hide sections

### States Object

Pre-defined states control dialog appearance:

```javascript
states = {
  'initial': { ... },
  'thinking': { ... },
  'response-actions': { ... },
  'response-input': { ... },
  'canvas': { ... },
  'success': { ... }
}
```

Each state defines:
- `headerText` - Header text content
- `thinking` - Boolean for shimmer animation
- `sections` - Array of visible data-sections
- `placeholder` - Input placeholder text
- `showFullscreen` - Show fullscreen button
- `closeIsStop` - Close button becomes stop button
- `showUpload`, `showMinimize`, `sendDisabled`, `showInput` - Input bar controls

---

## DialogFlow Engine

### Purpose

Creates multi-step conversational flows

### Step Types

1. **`suggestions`** - Initial choice chips
2. **`results`** - Search/query results
3. **`canvas`** - Document/card preview with action

### Usage Pattern

```javascript
new DialogFlow({
  steps: [
    { id: 'step1', type: 'suggestions', question: '...', options: [...] },
    { id: 'step2', type: 'results', question: '...', results: [...] },
    { id: 'step3', type: 'canvas', question: '...', docTitle: '...', actionLabel: '...' }
  ],
  onComplete: () => triggerSuccess()
})
```

---

## Component Usage Rules

### DO ✅

1. Use existing components for all dialog flows
2. Customize content (text, icons, data) within components
3. Use state machine for UI transitions
4. Use DialogFlow engine for multi-step flows
5. Maintain established spacing, colors, and typography
6. Keep user bubbles right-justified with hugging width
7. Use fade-in animations for new content (stagger with `animation-delay`)
8. Use thinking state between steps

### DON'T ❌

1. Create new component classes unless absolutely necessary
2. Add new color variables
3. Add new spacing values
4. Change user bubble alignment or width behavior
5. Modify core animations
6. Skip state transitions
7. Hard-code colors/spacing instead of using CSS variables
8. Create inline styles (use classes)

---

## Flow Pattern Templates

### Pattern 1: Simple Question → Response

States: `initial` → `thinking` → `response-input`

1. Show suggestion chips
2. User selects → thinking shimmer
3. Display results with input bar

### Pattern 2: Question → Response → Action Selection

States: `initial` → `thinking` → `response-actions`

1. Show suggestion chips
2. User selects → thinking shimmer
3. Display results with action chips (no input bar)

### Pattern 3: Multi-Step Canvas Flow

States: `initial` → `thinking` → `canvas` → `success`

1. Show suggestion chips
2. User selects → thinking shimmer
3. Display canvas card with action button
4. User confirms → success indicator

### Pattern 4: DialogFlow Multi-Step

Uses DialogFlow engine with custom steps

1. Each step has thinking interstitial (2400ms)
2. Renders suggestions, results, or canvas based on step type
3. Completes with success state

---

## Customization Guidelines

### For New Flows

**Allowed Customizations:**
- Header text for each state
- Suggestion chip labels and icons
- Result row quotes and sources
- Canvas card content (title, preview, action label)
- Action chip labels and icons
- Success message text

**Preserved Structure:**
- Component HTML structure
- CSS class names
- State transition logic
- Animation timings
- Spacing and layout

### Example: Creating a New Flow for "Secure Password"

```javascript
// Use DialogFlow engine with existing components
const securePasswordFlow = new DialogFlow({
  steps: [
    {
      id: 'input-method',
      type: 'suggestions',
      question: 'How would you like to add this password?',
      options: [
        { label: 'Type it manually', value: 'manual', icon: '...' },
        { label: 'Generate secure password', value: 'generate', icon: '...' }
      ]
    },
    {
      id: 'vault-selection',
      type: 'results',
      question: 'Which vault should I use?',
      results: [
        { id: 'personal', quote: '<strong>Personal Vault</strong>', source: 'Private' },
        { id: 'household', quote: '<strong>Household Vault</strong>', source: 'Shared' }
      ]
    },
    {
      id: 'confirm',
      type: 'canvas',
      question: 'Ready to secure this password?',
      docTitle: 'Password Entry',
      docName: 'Amazon Account Login',
      actionLabel: 'Save to Vault',
      actionValue: 'save'
    }
  ],
  onComplete: () => triggerSuccess()
});
```

**No new CSS, no new components** - just different content in existing patterns.

---

## Testing Checklist

Before deploying any dialog flow:

- [ ] All states transition smoothly
- [ ] User bubble is right-justified
- [ ] User bubble width hugs content (short = narrow, long = wide up to 85%)
- [ ] Thinking shimmer appears between steps
- [ ] Animations use staggered fade-ins where appropriate
- [ ] No new CSS classes created
- [ ] All colors use CSS variables
- [ ] All spacing uses CSS variables
- [ ] Input bar shows/hides correctly per state
- [ ] Success state displays properly
- [ ] Fullscreen mode works (if applicable)

---

## Version History

**1.0.0** (2026-02-28)
- Initial design system documentation
- Locked component library
- Established usage rules and patterns

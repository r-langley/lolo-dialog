# Lolo Dialog Design System Skill

**Skill Name:** lolo-dialog
**Purpose:** Enforce Lolo Dialog design system rules and provide guidance for creating dialog flows

---

## Core Principles

When working with Lolo Dialog components:

1. **NEVER create new components or CSS classes** unless explicitly required
2. **ALWAYS use existing components** from the locked design system
3. **ONLY customize content** (text, icons, data) within established patterns
4. **MAINTAIN user bubble behavior** - right-justified, content-hugging width
5. **FOLLOW state transitions** - use thinking states between steps

---

## Design System Reference

The complete design system is documented in `DESIGN_SYSTEM.md`. Key points:

### Available Components

1. Dialog Container (`.dialog`)
2. Header (`.dialog-header`, `.header-text`, `.logo`, `.header-actions`)
3. Icon Buttons (`.icon-btn`)
4. Suggestion Chips (`.suggestion-chip` in `.suggestions-row`)
5. User Message Bubble (`.user-bubble` in `.user-message`)
6. Response Area (`.response-area` with `.result-row`)
7. Canvas Area (`.canvas-area` with `.doc-card`)
8. Action Chips (`.action-chip` in `.action-suggestions`)
9. Success Indicator (`.success-indicator`)
10. Input Bar (`.input-bar` with `.input-field`, buttons)

### Design Tokens

**Colors:** Use CSS variables only (`var(--lavender-700)`, `var(--text-primary)`, etc.)

**Spacing:** `--sp-1` through `--sp-8` (4px to 32px)

**Radius:** `--r-sm` through `--r-full`

**Shadows:** `--shadow-xxs`, `--shadow-xl`

**Font:** Plus Jakarta Sans

---

## Working with User Bubbles

### Critical Requirements

```css
/* Container - RIGHT-JUSTIFIED */
.user-message {
  display: flex;
  justify-content: flex-end; /* ← Forces right alignment */
  padding: var(--sp-1) var(--sp-3);
}

/* Bubble - HUGS CONTENT */
.user-bubble {
  display: inline-block; /* ← Hugs content width */
  background: var(--user-bubble);
  color: #ffffff;
  font-size: 13px;
  font-weight: 500;
  line-height: 20px;
  padding: 10px 16px;
  border-radius: 20px 20px 4px 20px;
  max-width: 85%; /* ← Ensures wrapping on long messages */
  word-break: break-word;
}
```

### Behavior

- **Short message:** Bubble is narrow, hugs text width
- **Long message:** Bubble expands up to 85% of container width, then wraps
- **Always:** Positioned on the right side of the dialog

### Do NOT

- ❌ Use `width: 100%` on bubble
- ❌ Use `display: block` on bubble
- ❌ Change `justify-content` on container
- ❌ Remove `inline-block` from bubble

---

## Creating New Dialog Flows

### Step 1: Identify the Flow Pattern

**Pattern A: Simple Question → Response**
- Use for: Basic queries with results
- States: `initial` → `thinking` → `response-input`
- Components: Suggestion chips → User bubble → Result rows + Input

**Pattern B: Question → Response → Action Selection**
- Use for: Queries requiring follow-up action
- States: `initial` → `thinking` → `response-actions`
- Components: Suggestion chips → User bubble → Result rows + Action chips

**Pattern C: Simple Canvas Flow**
- Use for: Single confirmation/preview
- States: `initial` → `thinking` → `canvas` → `success`
- Components: Suggestion chips → User bubble → Canvas card → Success indicator

**Pattern D: Multi-Step DialogFlow**
- Use for: Complex, multi-step interactions
- Engine: `DialogFlow` class
- Components: Mix of suggestions, results, and canvas steps

### Step 2: Use DialogFlow Engine (Recommended)

```javascript
const myFlow = new DialogFlow({
  steps: [
    {
      id: 'unique-step-id',
      type: 'suggestions', // or 'results' or 'canvas'
      question: 'Header text for this step',
      // ... step-specific config
    },
    // ... more steps
  ],
  onComplete: (answers) => {
    // Handle completion
    triggerSuccess();
  }
});

myFlow.start();
```

### Step 3: Configure Each Step Type

#### Suggestions Step

```javascript
{
  id: 'step-id',
  type: 'suggestions',
  question: 'What would you like to do?',
  options: [
    {
      label: 'Option text',
      value: 'option-value',
      icon: '<svg>...</svg>' // Optional SVG path content
    },
    // 2-3 options recommended
  ]
}
```

#### Results Step

```javascript
{
  id: 'step-id',
  type: 'results',
  question: 'I found these results',
  showInsights: true, // Optional: show fullscreen button
  results: [
    {
      id: 'result-id',
      quote: 'Quote text with <strong>highlights</strong>',
      source: 'Source document name'
    },
    // Multiple results
  ]
}
```

#### Canvas Step

```javascript
{
  id: 'step-id',
  type: 'canvas',
  question: 'Confirm this action?',
  showInsights: true, // Optional: show fullscreen button
  docTitle: 'Document preview title',
  docName: 'Document name',
  actionLabel: 'Button text',
  actionValue: 'action-value'
}
```

---

## Flow Templates for Three Use Cases

### Template 1: Create/Upload Document

```javascript
const createDocumentFlow = new DialogFlow({
  steps: [
    {
      id: 'method',
      type: 'suggestions',
      question: 'How would you like to add this document?',
      options: [
        { label: 'Upload from device', value: 'upload', icon: '<path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14,2 14,8 20,8"/>' },
        { label: 'Create new document', value: 'create', icon: '<line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>' },
        { label: 'Scan with camera', value: 'scan', icon: '<path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z"/><circle cx="12" cy="13" r="4"/>' }
      ]
    },
    {
      id: 'category',
      type: 'results',
      question: 'What type of document is this?',
      results: [
        { id: 'financial', quote: '<strong>Financial Document</strong>', source: 'Bank statements, tax forms' },
        { id: 'legal', quote: '<strong>Legal Document</strong>', source: 'Contracts, wills' },
        { id: 'medical', quote: '<strong>Medical Record</strong>', source: 'Health records' },
        { id: 'personal', quote: '<strong>Personal Document</strong>', source: 'IDs, certificates' }
      ]
    },
    {
      id: 'confirm',
      type: 'canvas',
      question: 'Ready to save this document?',
      docTitle: 'Preview',
      docName: 'New Document',
      actionLabel: 'Save to Vault',
      actionValue: 'save'
    }
  ],
  onComplete: () => {
    triggerSuccess();
    // Update success message
    const si = document.querySelector('.success-indicator span');
    if (si) si.textContent = 'Document saved successfully';
  }
});
```

### Template 2: Secure Password/Secret

```javascript
const securePasswordFlow = new DialogFlow({
  steps: [
    {
      id: 'input-method',
      type: 'suggestions',
      question: 'How would you like to add this password?',
      options: [
        { label: 'Type it manually', value: 'manual', icon: '<path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/>' },
        { label: 'Generate secure password', value: 'generate', icon: '<path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 11-7.778 7.778 5.5 5.5 0 017.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"/>' }
      ]
    },
    {
      id: 'vault-selection',
      type: 'results',
      question: 'Which vault should I use?',
      showInsights: true,
      results: [
        { id: 'personal', quote: '<strong>Personal Vault</strong>', source: 'Private - Only you' },
        { id: 'household', quote: '<strong>Household Vault</strong>', source: 'Shared with family' },
        { id: 'work', quote: '<strong>Work Vault</strong>', source: 'Professional use' }
      ]
    },
    {
      id: 'confirm',
      type: 'canvas',
      question: 'Save this password?',
      docTitle: 'Password Entry',
      docName: 'Account Login Credentials',
      actionLabel: 'Save Securely',
      actionValue: 'save-password'
    }
  ],
  onComplete: () => {
    triggerSuccess();
    const si = document.querySelector('.success-indicator span');
    if (si) si.textContent = 'Password saved securely';
  }
});
```

### Template 3: Invite to Household

```javascript
const inviteHouseholdFlow = new DialogFlow({
  steps: [
    {
      id: 'recipient',
      type: 'suggestions',
      question: 'Who would you like to invite?',
      options: [
        { label: 'Search contacts', value: 'search', icon: '<circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>' },
        { label: 'Enter email address', value: 'email', icon: '<path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>' },
        { label: 'Send invite link', value: 'link', icon: '<path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"/>' }
      ]
    },
    {
      id: 'access-level',
      type: 'results',
      question: 'What level of access should they have?',
      results: [
        { id: 'full', quote: '<strong>Full Access</strong>', source: 'View and edit all documents' },
        { id: 'view', quote: '<strong>View Only</strong>', source: 'Can view but not edit' },
        { id: 'limited', quote: '<strong>Limited Access</strong>', source: 'Select specific documents' }
      ]
    },
    {
      id: 'confirm',
      type: 'canvas',
      question: 'Ready to send the invitation?',
      docTitle: 'Household Invitation',
      docName: 'Johnson Household',
      actionLabel: 'Send Invitation',
      actionValue: 'send-invite'
    }
  ],
  onComplete: () => {
    triggerSuccess();
    const si = document.querySelector('.success-indicator span');
    if (si) si.textContent = 'Invitation sent successfully';
  }
});
```

---

## State Management

### Using Pre-defined States

For simple flows without DialogFlow:

```javascript
// Set a state
setState('thinking');

// After delay
setTimeout(() => setState('response-input'), 2400);
```

### Available States

- `initial` - Suggestion chips visible
- `thinking` - Shimmer animation, user bubble visible
- `response-actions` - Results + action chips
- `response-input` - Results + input bar
- `canvas` - Canvas card visible
- `success` - Success indicator replaces header

---

## Customization Rules

### Allowed ✅

- Change header text for each state/step
- Modify suggestion chip labels and icons (use existing SVG patterns)
- Update result quotes and sources
- Customize canvas card titles and action labels
- Adjust success message text
- Change placeholder text
- Modify DialogFlow step configuration

### Not Allowed ❌

- Create new component classes
- Add new CSS variables
- Change component HTML structure
- Modify animation timings (unless explicitly required)
- Change user bubble alignment or width behavior
- Remove `data-section` attributes
- Hard-code colors or spacing values
- Skip thinking states between steps

---

## Icon Library

Use existing SVG icon patterns. Common icons:

**Document:**
```svg
<path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
<polyline points="14,2 14,8 20,8"/>
```

**Lock:**
```svg
<rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
<path d="M7 11V7a5 5 0 0110 0v4"/>
```

**User:**
```svg
<path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/>
<circle cx="9" cy="7" r="4"/>
```

**Add:**
```svg
<line x1="12" y1="5" x2="12" y2="19"/>
<line x1="5" y1="12" x2="19" y2="12"/>
```

**Search:**
```svg
<circle cx="11" cy="11" r="8"/>
<path d="M21 21l-4.35-4.35"/>
```

---

## Testing Your Flow

Before deploying, verify:

1. User bubble is right-justified ✓
2. User bubble hugs content (narrow for short, wide for long) ✓
3. Thinking shimmer appears between steps ✓
4. Fade-in animations work ✓
5. No new CSS classes created ✓
6. All colors use CSS variables ✓
7. Success state displays correctly ✓

---

## Quick Reference: Implementing a New Flow

1. **Decide pattern:** Suggestions → Results → Canvas or custom multi-step
2. **Use DialogFlow engine** for multi-step flows
3. **Define steps** with type, question, and options/results/canvas config
4. **Customize content only** - no new components
5. **Set onComplete handler** to trigger success
6. **Test all states** and transitions
7. **Verify user bubble** behavior (right-justified, content-hugging)

---

## Example: Adding to prototype-dialog.html

To add your new flow to the prototype:

```javascript
// Add flow button to dev panel
<button class="flow-btn" onclick="startMyNewFlow(); toggleDevPanel()">
  <svg>...</svg>
  Run My New Flow
</button>

// Define flow function
function startMyNewFlow() {
  activeFlow = new DialogFlow({
    steps: [
      // Your steps here
    ],
    onComplete: () => triggerSuccess()
  });
  activeFlow.start();
}
```

**No other changes needed!** The DialogFlow engine handles all rendering.

---

## Summary

This skill ensures:
- **Consistency** - All flows use the same components
- **Maintainability** - Changes to design system apply globally
- **Efficiency** - No redundant CSS or components
- **Quality** - User bubble behavior is always correct
- **Flexibility** - Easy to create new flows by customizing content

**Remember:** When in doubt, check `DESIGN_SYSTEM.md` for the complete specification.

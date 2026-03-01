# Lolo Dialog Quick Reference

**For:** Creating new dialog flows quickly
**See:** `DESIGN_SYSTEM.md` for complete specs, `.claude/skills/lolo-dialog.md` for detailed guidance

---

## Component Checklist

✅ Dialog Container
✅ Header (with logo, text, actions)
✅ Suggestion Chips (initial options)
✅ User Message Bubble (right-justified, content-hugging)
✅ Response Area (result rows)
✅ Canvas Area (doc cards)
✅ Action Chips (follow-up options)
✅ Success Indicator
✅ Input Bar (field, upload, send, minimize)

**Rule:** Use existing components only. Customize content, not structure.

---

## User Bubble - Critical Rules

```css
/* RIGHT-JUSTIFIED */
.user-message { justify-content: flex-end; }

/* HUGS CONTENT */
.user-bubble { display: inline-block; max-width: 85%; }
```

Short message = narrow bubble
Long message = wide bubble (up to 85%)
Always on the right side

---

## Creating a Flow

### Option 1: DialogFlow Engine (Recommended)

```javascript
const myFlow = new DialogFlow({
  steps: [
    { id: 'step1', type: 'suggestions', question: '...', options: [...] },
    { id: 'step2', type: 'results', question: '...', results: [...] },
    { id: 'step3', type: 'canvas', question: '...', docName: '...', actionLabel: '...' }
  ],
  onComplete: () => triggerSuccess()
});
myFlow.start();
```

### Option 2: Manual States

```javascript
setState('thinking');
setTimeout(() => setState('response-input'), 2400);
```

---

## Step Types

**suggestions** - Choice chips for user
```javascript
{
  type: 'suggestions',
  question: 'Header text',
  options: [
    { label: 'Text', value: 'val', icon: '<svg>...' }
  ]
}
```

**results** - Search/query results
```javascript
{
  type: 'results',
  question: 'Header text',
  results: [
    { id: 'id', quote: 'Quote <strong>highlight</strong>', source: 'Source' }
  ]
}
```

**canvas** - Preview card with action
```javascript
{
  type: 'canvas',
  question: 'Header text',
  docTitle: 'Preview title',
  docName: 'Card title',
  actionLabel: 'Button text',
  actionValue: 'value'
}
```

---

## Design Tokens

**Colors:** `var(--lavender-700)`, `var(--text-primary)`, `var(--user-bubble)`
**Spacing:** `var(--sp-1)` to `var(--sp-8)` (4px to 32px)
**Radius:** `var(--r-sm)` to `var(--r-full)`
**Shadows:** `var(--shadow-xxs)`, `var(--shadow-xl)`

---

## Common Icons

**Document:** `<path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14,2 14,8 20,8"/>`

**Lock:** `<rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/>`

**User:** `<path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/>`

**Add:** `<line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>`

---

## Do / Don't

✅ Use existing components
✅ Customize content (text, icons, data)
✅ Use CSS variables
✅ Include thinking states between steps
✅ Keep user bubbles right-justified

❌ Create new component classes
❌ Add new CSS variables
❌ Hard-code colors/spacing
❌ Change user bubble alignment
❌ Skip state transitions

---

## Testing Checklist

- [ ] User bubble right-justified?
- [ ] User bubble hugs content (short = narrow, long = wide)?
- [ ] Thinking shimmer between steps?
- [ ] Animations smooth?
- [ ] No new CSS classes?
- [ ] Using CSS variables?
- [ ] Success state works?

---

## Need Help?

- **Complete specs:** `DESIGN_SYSTEM.md`
- **Detailed guidance:** `.claude/skills/lolo-dialog.md`
- **Live examples:** `prototype-dialog.html`

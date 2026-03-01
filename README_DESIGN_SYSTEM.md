# Lolo Dialog Design System

**Status:** Locked and finalized
**Version:** 1.0.0
**Date:** 2026-02-28

---

## Overview

This design system establishes a locked, consistent component library for the Lolo Dialog interface. All dialog flows must use these established components without creating new ones unless explicitly required.

**Key Principle:** Customize content, not structure.

---

## Documentation Structure

### 1. `DESIGN_SYSTEM.md` ⭐
**Complete specification** of all components, tokens, animations, and patterns.

**Use when:**
- Implementing new features
- Understanding component specs
- Needing detailed reference
- Onboarding new developers

**Contents:**
- Design tokens (colors, spacing, radius, shadows)
- Complete component specifications
- Animation definitions
- State management patterns
- DialogFlow engine documentation
- Flow pattern templates
- Testing checklists

### 2. `.claude/skills/lolo-dialog.md` 🤖
**Claude Code skill file** that enforces design system rules when working with AI assistance.

**Purpose:**
- Provides consistent instructions for AI-assisted development
- Enforces component usage rules
- Includes ready-to-use flow templates
- Prevents creation of redundant components

**Use when:**
- Working with Claude Code
- Need to ensure AI follows design system
- Want pre-built flow examples

### 3. `QUICK_REFERENCE.md` ⚡
**Quick lookup** for common patterns and rules.

**Use when:**
- Need quick answers
- Building flows rapidly
- Want a checklist
- Looking for common icons

**Contents:**
- Component checklist
- User bubble critical rules
- Step type syntax
- Design tokens cheat sheet
- Do/Don't guidelines
- Testing checklist

### 4. `prototype-dialog.html` 🎨
**Live demo** with three complete example flows.

**Use when:**
- Need visual reference
- Testing interactions
- Demonstrating flows
- Understanding state transitions

**Features:**
- Three complete demo flows (document upload, password, invite)
- State navigation (dev panel)
- Live examples of all components
- Interactive testing environment

---

## Component Library

### Core Components (10 total)

All components are **locked**. Do not create new ones.

1. **Dialog Container** - Main frame
2. **Header** - Logo, text, actions
3. **Icon Buttons** - 36×36px circular buttons
4. **Suggestion Chips** - Initial option chips
5. **User Message Bubble** - Right-justified, content-hugging
6. **Response Area** - Result rows
7. **Canvas Area** - Document cards
8. **Action Chips** - Follow-up action chips
9. **Success Indicator** - Completion state
10. **Input Bar** - Text field and controls

### Critical: User Message Bubble

**MUST be right-justified with content-hugging width.**

```css
/* Container */
.user-message {
  display: flex;
  justify-content: flex-end; /* RIGHT-JUSTIFIED */
}

/* Bubble */
.user-bubble {
  display: inline-block; /* HUGS CONTENT */
  max-width: 85%;
}
```

**Result:**
- Short message = narrow bubble
- Long message = wide bubble (up to 85% width)
- Always positioned on right side

---

## Creating New Flows

### Recommended Approach: DialogFlow Engine

```javascript
const myFlow = new DialogFlow({
  steps: [
    {
      id: 'unique-id',
      type: 'suggestions', // or 'results' or 'canvas'
      question: 'Header text',
      // ... type-specific config
    }
  ],
  onComplete: () => triggerSuccess()
});

myFlow.start();
```

### Three Step Types

**1. Suggestions** - Initial choices
```javascript
{
  type: 'suggestions',
  question: 'What would you like to do?',
  options: [
    { label: 'Option text', value: 'value', icon: '<svg>...</svg>' }
  ]
}
```

**2. Results** - Search/query results
```javascript
{
  type: 'results',
  question: 'I found these results',
  results: [
    { id: 'id', quote: 'Text with <strong>highlight</strong>', source: 'Source' }
  ]
}
```

**3. Canvas** - Preview with action
```javascript
{
  type: 'canvas',
  question: 'Confirm action?',
  docTitle: 'Preview title',
  docName: 'Card title',
  actionLabel: 'Button text'
}
```

---

## Three Demo Flows

### 1. Create/Upload Document
**Flow:** Upload method → Document type → Confirmation

**Steps:**
1. Suggestions: Upload, Create, or Scan
2. Results: Financial, Legal, Medical, or Personal
3. Canvas: Document preview with Save button

**Success:** "Document saved successfully"

### 2. Secure Password/Secret
**Flow:** Input method → Vault selection → Confirmation

**Steps:**
1. Suggestions: Manual, Generate, or Import
2. Results: Personal, Household, or Work vault
3. Canvas: Password entry preview with Save button

**Success:** "Password saved securely"

### 3. Invite to Household
**Flow:** Recipient method → Access level → Confirmation

**Steps:**
1. Suggestions: Search, Email, or Link
2. Results: Full, View Only, or Limited access
3. Canvas: Invitation preview with Send button

**Success:** "Invitation sent successfully"

---

## Design Tokens Quick Reference

### Colors
```css
--lavender-700: #7e6fca;     /* Primary action */
--lavender-100: #f0ecfa;     /* Hover background */
--user-bubble: #4E7195;      /* User message (steel blue) */
--text-primary: #3d3935;     /* Main text */
--text-secondary: #6b665f;   /* Secondary text */
--borders-default: #f0eee6;  /* Borders */
```

### Spacing
```css
--sp-1: 4px;   --sp-2: 8px;   --sp-3: 12px;
--sp-4: 16px;  --sp-6: 24px;  --sp-8: 32px;
```

### Radius
```css
--r-sm: 4px;   --r-md: 6px;    --r-lg: 8px;
--r-xl: 12px;  --r-2xl: 16px;  --r-full: 9999px;
```

---

## Usage Rules

### ✅ DO

1. Use existing components for all flows
2. Customize content (text, icons, data)
3. Use DialogFlow engine for multi-step flows
4. Use CSS variables for all styling
5. Include thinking states between steps
6. Keep user bubbles right-justified
7. Follow established animation patterns
8. Test all state transitions

### ❌ DON'T

1. Create new component classes
2. Add new CSS variables
3. Hard-code colors or spacing
4. Change user bubble alignment
5. Modify component HTML structure
6. Skip thinking states
7. Use inline styles
8. Remove data-section attributes

---

## Testing Your Flow

Before deployment, verify:

- [ ] User bubble is right-justified
- [ ] User bubble hugs content (short = narrow, long = wide)
- [ ] Thinking shimmer appears between steps
- [ ] Fade-in animations work smoothly
- [ ] No new CSS classes created
- [ ] All colors use CSS variables
- [ ] All spacing uses CSS variables
- [ ] Success state displays correctly
- [ ] Fullscreen mode works (if applicable)
- [ ] State transitions are smooth

---

## File Structure

```
/Sharing/
├── prototype-dialog.html          # Live demo with 3 flows
├── DESIGN_SYSTEM.md               # Complete specification
├── QUICK_REFERENCE.md             # Quick lookup guide
├── README_DESIGN_SYSTEM.md        # This file
└── .claude/
    └── skills/
        └── lolo-dialog.md         # Claude Code skill
```

---

## Getting Started

### For Developers

1. **Read:** `DESIGN_SYSTEM.md` for complete understanding
2. **Reference:** `QUICK_REFERENCE.md` during development
3. **View:** `prototype-dialog.html` for live examples
4. **Build:** Create new flows using DialogFlow engine

### For Designers

1. **Review:** `prototype-dialog.html` for visual reference
2. **Customize:** Only content within existing components
3. **Maintain:** Consistency with established patterns

### For AI Assistance

1. **Use:** `.claude/skills/lolo-dialog.md` skill
2. **Reference:** Design system docs as needed
3. **Follow:** Established component patterns

---

## Key Principles

1. **Consistency** - All flows use the same components
2. **Maintainability** - Changes apply globally via CSS variables
3. **Efficiency** - No redundant CSS or components
4. **Quality** - User bubble behavior always correct
5. **Flexibility** - Easy to create flows by customizing content
6. **Locked** - Components are finalized, content is flexible

---

## Examples

### Adding a New Flow

```javascript
// Define your flow
const myNewFlow = new DialogFlow({
  steps: [
    {
      id: 'step1',
      type: 'suggestions',
      question: 'Custom question?',
      options: [/* your options */]
    }
    // ... more steps
  ],
  onComplete: () => {
    triggerSuccess();
    // Customize success message
    setTimeout(() => {
      const si = document.querySelector('.success-indicator span');
      if (si) si.textContent = 'Custom success message';
    }, 50);
  }
});

// Add trigger button to dev panel (optional)
<button class="flow-btn" onclick="myNewFlow.start()">
  Run My Flow
</button>
```

**That's it!** No new CSS, no new components needed.

---

## Support

**Questions?**
- Check `DESIGN_SYSTEM.md` for detailed specs
- Review `prototype-dialog.html` for working examples
- Use `QUICK_REFERENCE.md` for quick answers

**Need to modify the design system?**
- Propose changes to the design team
- Update version number
- Document all changes in `DESIGN_SYSTEM.md`
- Update all reference docs
- Test all existing flows

---

## Version History

**1.0.0** (2026-02-28)
- Initial design system lock
- 10 core components established
- 3 demo flows implemented
- Complete documentation suite
- Claude Code skill created

---

## Summary

This design system provides:

✅ **Consistency** across all dialog flows
✅ **Speed** through reusable components
✅ **Quality** with tested, proven patterns
✅ **Flexibility** to create varied flows with same building blocks
✅ **Maintainability** via centralized design tokens

**Remember:** The prototype is perfect functionally. We're extending it with more use cases while maintaining the exact same design system and component structure.

Start building with confidence!

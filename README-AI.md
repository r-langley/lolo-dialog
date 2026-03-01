# Lolo Dialog UI Kit - AI Agent Guide

**Version:** 1.3.0
**Purpose:** Generative UI component library for building conversational dialog flows

---

## 🤖 Quick Start for AI Agents

This is a **JSON-driven, component-based UI kit** for creating conversational dialog interfaces. You can generate complete flows from natural language prompts by outputting valid JSON.

### How It Works

```
User Prompt → AI generates JSON → Playground renders flow → User interacts
```

---

## 📦 What's Available

### Core Components (10)
1. **suggestion-chip** - Interactive option buttons
2. **action-chip** - Secondary action buttons
3. **user-bubble** - User message display
4. **result-row** - Clickable results (simple or detailed)
5. **doc-card** - Document preview with action
6. **header** - Dialog header with states
7. **input-bar** - Bottom input with buttons
8. **success-indicator** - Success feedback
9. **dialog-container** - Main dialog wrapper
10. **dev-panel** - Development/testing panel

### Step Types (3)
1. **suggestions** - Show option chips for user selection
2. **results** - Display clickable result rows
3. **canvas** - Show document preview card

### States (6)
- `initial` - Starting state with suggestions
- `thinking` - Loading/processing state
- `response-actions` - Results with action chips
- `response-input` - Results with input bar
- `canvas` - Document preview
- `success` - Completion state

---

## 🎯 Creating Flows

### Basic Structure

```json
{
  "userMessage": "Text shown in user bubble (optional)",
  "steps": [
    {
      "id": "unique-step-id",
      "type": "suggestions|results|canvas",
      "question": "Header text for this step",
      "...stepSpecificProps"
    }
  ],
  "successMessage": "Optional custom success message"
}
```

### Step Type: `suggestions`

**Use when:** User needs to select from predefined options

```json
{
  "id": "upload-method",
  "type": "suggestions",
  "question": "How would you like to add this document?",
  "options": [
    {
      "label": "Upload from device",
      "value": "upload",
      "icon": "<path d=\"...\"/>"
    },
    {
      "label": "Create new",
      "value": "create",
      "icon": "<path d=\"...\"/>"
    }
  ]
}
```

**Props:**
- `question` (string, required) - Header text
- `options` (array, required) - Array of chip objects
  - `label` (string) - Button text
  - `value` (string) - Identifier passed to next step
  - `icon` (string, optional) - SVG path only (20x20)

---

### Step Type: `results`

**Use when:** Showing search results, options, or items to select

#### Simple Variant

```json
{
  "id": "search-results",
  "type": "results",
  "question": "I found these documents",
  "showInsights": false,
  "results": [
    {
      "id": "doc-1",
      "quote": "Text with <strong>highlights</strong>",
      "source": "Context or source info"
    }
  ]
}
```

#### Detailed Variant (with badges and metadata)

```json
{
  "id": "detailed-results",
  "type": "results",
  "question": "I found Taylor Johnson in these documents",
  "showInsights": true,
  "results": [
    {
      "id": "will-2024",
      "detailed": true,
      "title": "Living Will, 2024",
      "status": "archived",
      "role": "Witness",
      "details": "Taylor was listed as a witness to this will",
      "meta": "This will is no longer current"
    },
    {
      "id": "will-2025",
      "detailed": true,
      "title": "Living Will, 2025",
      "status": "current",
      "details": "Taylor is not listed in the current will",
      "meta": "Updated January 2025"
    }
  ]
}
```

**Props:**
- `question` (string, required) - Header text
- `showInsights` (boolean, optional) - Show fullscreen button
- `results` (array, required) - Array of result objects

**Simple Result Props:**
- `id` (string) - Unique identifier
- `quote` (string) - Main text (HTML allowed)
- `source` (string) - Secondary text

**Detailed Result Props:**
- `id` (string) - Unique identifier
- `detailed` (boolean) - Must be `true`
- `title` (string) - Main title
- `status` (string, optional) - `"current"` or `"archived"` (shows badge)
- `role` (string, optional) - Role badge text
- `details` (string, optional) - Explanation text
- `meta` (string, optional) - Metadata text

---

### Step Type: `canvas`

**Use when:** Previewing a document or confirming an action

```json
{
  "id": "confirm-save",
  "type": "canvas",
  "question": "Save this to your vault?",
  "docTitle": "Texas Driver License",
  "docName": "Alice Marie Johnson",
  "actionLabel": "Save to Personal Vault",
  "actionValue": "save",
  "showInsights": false
}
```

**Props:**
- `question` (string, required) - Header text
- `docTitle` (string, required) - Document type shown in preview
- `docName` (string, required) - Document name shown below preview
- `actionLabel` (string, required) - Action button text
- `actionValue` (string, optional) - Value passed to completion
- `showInsights` (boolean, optional) - Show fullscreen button

---

## 🎨 Common Patterns

### Pattern 1: Quick Selection
**Use case:** User selects an option, sees confirmation, done

```
suggestions → canvas → success
```

### Pattern 2: Search & Select
**Use case:** User searches, browses results, confirms

```
results → canvas → success
```

### Pattern 3: Multi-Step Decision
**Use case:** Multiple decision points leading to action

```
suggestions → suggestions → results → canvas → success
```

### Pattern 4: Contextual Search
**Use case:** Search with detailed context, then action

```
results (detailed) → canvas → success
```

---

## 📚 Templates

Use these as starting points:

### `/templates/simple-selection.json`
Basic 3-step flow: choose option → see results → confirm

### `/templates/detailed-search.json`
Search flow with detailed results showing status and metadata

### `/templates/multi-step-flow.json`
Complex 4-step flow with multiple decision points

---

## 🔍 Icon Library

All icons are 20x20 SVG paths. Common icons:

### Document
```
<path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14,2 14,8 20,8"/>
```

### Upload
```
<path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="17,8 12,3 7,8"/><line x1="12" y1="3" x2="12" y2="15"/>
```

### Lock
```
<rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0110 0v4"/>
```

### People
```
<path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/>
```

### Plus
```
<line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
```

### Search
```
<circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
```

---

## ✅ Design Rules

### User Bubble Behavior
- **Always** right-aligned (`justify-content: flex-end`)
- **Always** content-hugging (`display: inline-block`, `max-width: 85%`)
- Short message = narrow bubble, long message = wide bubble
- Animates up from bottom (12px, 300ms)

### Button Styling
- Padding: `8px 12px` (var(--sp-2) var(--sp-3))
- Gap: `8px` (var(--sp-2))
- Border radius: `8px` (var(--r-lg))
- Icons: `20x20`

### Text Behavior
- Single line, no wrapping
- Overflow with ellipsis (`text-overflow: ellipsis`)

### State Transitions
- Always show thinking state between steps (2.4s)
- Fade-in animations on results (100ms stagger)
- User bubble slides up on entry

---

## 🎯 AI Agent Workflow

### Step 1: Understand User Intent
Parse the user's natural language request to identify:
- What they want to accomplish
- How many decision points are needed
- What type of results to show
- Whether detailed context is needed

### Step 2: Select Pattern
Choose from common patterns:
- Simple selection (1-2 steps)
- Search & select (2 steps)
- Multi-step decision (3-4 steps)
- Contextual search (detailed results)

### Step 3: Generate JSON
Build the flow JSON with:
- Appropriate step types
- Contextual questions
- Realistic options/results
- Clear action labels

### Step 4: Customize Content
- Use specific, clear labels
- Add icons where helpful
- Include detailed context when relevant
- Write natural, conversational text

### Step 5: Output
Return valid JSON matching the schema

---

## 📋 Validation Checklist

Before outputting JSON, verify:

- [ ] All required props present
- [ ] Step IDs are unique
- [ ] Icons are SVG paths only (no `<svg>` wrapper)
- [ ] Questions are clear and specific
- [ ] Option labels are concise (1-5 words)
- [ ] Result text uses `<strong>` for highlights
- [ ] Status badges use valid values (`"current"` or `"archived"`)
- [ ] Success message is specific to the flow
- [ ] Flow has logical progression

---

## 🚀 Example: Generate from Prompt

**User Prompt:**
"I want to invite my sister Sarah to access my legal documents with view-only permission"

**AI Output:**

```json
{
  "userMessage": "Invite someone to your Household",
  "steps": [
    {
      "id": "select-contact",
      "type": "results",
      "question": "Who would you like to invite?",
      "results": [
        {
          "id": "sarah",
          "detailed": true,
          "title": "Sarah Johnson (Sister)",
          "details": "sarah.m.johnson@email.com • Lives in Austin, TX",
          "meta": "Not yet in household • Added to contacts 2 years ago"
        },
        {
          "id": "other",
          "quote": "Someone else",
          "source": "Search or add new contact"
        }
      ]
    },
    {
      "id": "access-level",
      "type": "suggestions",
      "question": "What level of access for Sarah Johnson?",
      "options": [
        {
          "label": "Full Access (recommended for family)",
          "value": "full",
          "icon": "<path d=\"M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2\"/><circle cx=\"9\" cy=\"7\" r=\"4\"/>"
        },
        {
          "label": "View Only (can see but not edit)",
          "value": "view",
          "icon": "<path d=\"M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z\"/><circle cx=\"12\" cy=\"12\" r=\"3\"/>"
        }
      ]
    },
    {
      "id": "document-access",
      "type": "results",
      "question": "She'll have view-only access to these documents",
      "showInsights": true,
      "results": [
        {
          "id": "legal",
          "detailed": true,
          "title": "Legal Documents (8 files)",
          "details": "Living Will, Power of Attorney, Estate Plan, Property Deeds",
          "meta": "View only access"
        },
        {
          "id": "financial",
          "detailed": true,
          "title": "Financial Records (12 files)",
          "details": "Tax returns, Bank statements, Investment accounts",
          "meta": "View only access"
        }
      ]
    },
    {
      "id": "confirm",
      "type": "canvas",
      "question": "Send invitation to Sarah Johnson?",
      "docTitle": "Household Invitation",
      "docName": "Sarah Johnson - View Only Access",
      "actionLabel": "Send Invitation",
      "actionValue": "send"
    }
  ],
  "successMessage": "Invitation sent to Sarah Johnson"
}
```

---

## 🔧 Technical Details

### File Structure
```
/lib/dialog-engine.js    - Core DialogFlow class
/lib/components.json     - Component specifications
/templates/              - Flow templates
/examples/               - Demo flows
playground.html          - Interactive builder
index.html               - Component showcase
```

### Integration
```javascript
import { DialogFlow, showUserMessage } from './lib/dialog-engine.js';

// From JSON
const flowData = /* your JSON */;
const flow = new DialogFlow({
  steps: flowData.steps,
  onComplete: () => {
    triggerSuccess(flowData.successMessage || 'Done!');
  }
});

// Show user message, then start
showUserMessage(flowData.userMessage, () => {
  flow.start();
});
```

---

## 💡 Tips for AI Agents

1. **Be Specific:** Use concrete, contextual text instead of generic placeholders
2. **Show Intelligence:** Use detailed results to demonstrate context awareness
3. **Keep it Natural:** Write conversational questions, not robotic prompts
4. **Use Badges Wisely:** Status/role badges add context but shouldn't overwhelm
5. **Progressive Disclosure:** Start broad, get specific as flow progresses
6. **Clear Actions:** Button labels should be clear about what happens next
7. **Meaningful Success:** Success messages should reference what was accomplished

---

## 📖 Reference

**Component Specs:** `/lib/components.json`
**Templates:** `/templates/*.json`
**Demo Flows:** `/examples/demo-flows.html`
**Engine API:** `/lib/dialog-engine.js`

**Design System Docs:**
- `DESIGN_SYSTEM.md` - Complete specifications
- `QUICK_REFERENCE.md` - One-page cheat sheet
- `COMPREHENSIVE_REVIEW_V1.2.md` - Detailed flow examples

---

**Built for AI agents. Designed for conversation.**

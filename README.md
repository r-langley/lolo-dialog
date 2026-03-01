# Lolo Dialog UI Kit

**A generative, AI-friendly component library for conversational interfaces**

[![Version](https://img.shields.io/badge/version-1.3.0-blue.svg)](https://github.com/r-langley/lolo-dialog)
[![License](https://img.shields.io/badge/license-Private-red.svg)](LICENSE)

---

## 🎯 What Is This?

Lolo Dialog is a **JSON-driven component library** designed for building sophisticated conversational dialog interfaces. It's optimized for **AI agent consumption**, allowing natural language prompts to be transformed into working UI flows.

### Key Features

- **🤖 AI-First Design** - Generate flows from natural language using JSON templates
- **⚡ Zero Dependencies** - Pure HTML/CSS/JavaScript, no frameworks
- **🎨 10 Core Components** - Locked design system with complete specifications
- **📦 Reusable Patterns** - Template library for common conversation flows
- **🔧 Interactive Playground** - Build and test flows in real-time
- **📖 Comprehensive Docs** - Complete guide for humans and AI agents

---

## 🚀 Quick Start

### For Humans

**1. View Components**
```bash
open index.html
```
Browse the component library and see all available UI elements.

**2. Try the Playground**
```bash
open playground.html
```
Build and test conversational flows interactively.

**3. See Demo Flows**
```bash
open examples/demo-flows.html
```
Experience 4 complete, sophisticated demo flows.

### For AI Agents

**Read the AI Guide:**
```bash
cat README-AI.md
```

**Use Templates:**
```javascript
// Load a template
const template = await fetch('./templates/simple-selection.json');
const flow = await template.json();

// Customize it
flow.steps[0].question = "Your custom question?";
flow.steps[0].options[0].label = "Your option";

// Render it
// (See README-AI.md for complete integration guide)
```

---

## 📁 Project Structure

```
lolo-dialog/
├── index.html                    # Component library showcase
├── playground.html               # Interactive flow builder
├── README.md                     # This file
├── README-AI.md                  # Complete AI agent guide
├── README_DESIGN_SYSTEM.md       # Original design system overview
│
├── lib/                          # Core library
│   ├── dialog-engine.js          # DialogFlow class & state machine
│   └── components.json           # Component specifications
│
├── templates/                    # Reusable flow patterns
│   ├── simple-selection.json     # Basic selection flow
│   ├── detailed-search.json      # Search with detailed results
│   └── multi-step-flow.json      # Complex multi-step flow
│
├── examples/                     # Demo implementations
│   └── demo-flows.html           # 4 complete demo flows
│
└── docs/                         # Documentation
    ├── DESIGN_SYSTEM.md          # Complete design specifications
    ├── QUICK_REFERENCE.md        # One-page cheat sheet
    ├── COMPREHENSIVE_REVIEW_V1.2.md  # Flow examples
    ├── CONTEXTUAL_FLOWS_GUIDE.md # Detailed results guide
    └── CHANGELOG.md              # Version history
```

---

## 🎨 Components

### Buttons
- **Suggestion Chip** - Primary option buttons with icons
- **Action Chip** - Secondary action buttons

### Messages
- **User Bubble** - Right-aligned, content-hugging message display

### Results
- **Result Row (Simple)** - Icon + quote + source
- **Result Row (Detailed)** - Multi-line with badges and metadata

### Canvas
- **Document Card** - Preview card with action button

### Layout
- **Dialog Header** - Top bar with logo, text, buttons
- **Input Bar** - Bottom input with upload/send buttons
- **Success Indicator** - Checkmark with success message

---

## 🔧 How It Works

### 1. JSON-Driven Flows

Define conversational flows using JSON:

```json
{
  "userMessage": "Create a new document",
  "steps": [
    {
      "id": "upload-method",
      "type": "suggestions",
      "question": "How would you like to add this?",
      "options": [
        {"label": "Upload from device", "value": "upload", "icon": "..."},
        {"label": "Create new", "value": "create", "icon": "..."}
      ]
    },
    {
      "id": "confirm",
      "type": "canvas",
      "question": "Save to your vault?",
      "docTitle": "New Document",
      "docName": "Untitled",
      "actionLabel": "Save"
    }
  ],
  "successMessage": "Document saved!"
}
```

### 2. Three Step Types

- **`suggestions`** - Show option chips for user selection
- **`results`** - Display clickable result rows (simple or detailed)
- **`canvas`** - Show document preview card

### 3. State Machine

6 predefined states handle all UI transitions:
- `initial` → `thinking` → `response` → `canvas` → `success`

---

## 💡 Use Cases

### For Product Teams
- **Rapid Prototyping** - Build conversational flows in minutes
- **Consistent Design** - Locked components ensure visual consistency
- **Design Documentation** - Complete specs for handoff

### For AI Agents
- **Natural Language → UI** - Generate flows from prompts
- **Template System** - Reusable patterns for common flows
- **Structured Output** - JSON schema ensures validity

### For Developers
- **Zero Setup** - No build tools or dependencies
- **Component Library** - Reusable, well-documented components
- **Interactive Testing** - Playground for rapid iteration

---

## 📚 Documentation

### For Everyone
- **`index.html`** - Visual component catalog
- **`README_DESIGN_SYSTEM.md`** - Design system overview
- **`DESIGN_SYSTEM.md`** - Complete specifications

### For Developers
- **`QUICK_REFERENCE.md`** - One-page cheat sheet
- **`lib/components.json`** - Component API reference
- **`lib/dialog-engine.js`** - Engine source code

### For AI Agents
- **`README-AI.md`** - Complete AI integration guide
- **`templates/*.json`** - Reusable flow templates
- **`lib/components.json`** - Structured component specs

---

## 🎯 Design Principles

1. **Consistency First** - Same components everywhere
2. **Content Over Structure** - Customize data, not markup
3. **AI-Friendly** - JSON-driven, structured, validatable
4. **User Bubble Fidelity** - Always right-aligned, content-hugging
5. **State-Driven** - Predictable transitions via state machine
6. **Zero New Components** - Extend existing, don't create new
7. **Template-Based** - Reuse patterns, don't reinvent

---

## 🚦 Getting Started

### 1. Explore the Library
```bash
open index.html
```
See all components, states, and variants.

### 2. Try a Template
```bash
open playground.html
# Select "Simple Selection" from dropdown
# Click "Test Flow"
```

### 3. Build Your Own
Edit JSON in playground:
```json
{
  "userMessage": "Your prompt here",
  "steps": [/* your steps */],
  "successMessage": "Success!"
}
```

### 4. Integrate
```javascript
import { DialogFlow, showUserMessage } from './lib/dialog-engine.js';

const flow = new DialogFlow({
  steps: yourSteps,
  onComplete: () => alert('Done!')
});

showUserMessage("User's message", () => flow.start());
```

---

## 🤝 Contributing

This is a private project, but suggestions are welcome:

1. **Found a bug?** Open an issue
2. **Have an idea?** Start a discussion
3. **Want to contribute?** Submit a PR

---

## 📊 Versions

- **v1.3.0** (Current) - Generative UI kit with playground
- **v1.2.1** - Bug fixes and responsive design
- **v1.2.0** - Comprehensive flow enhancements
- **v1.1.0** - Contextual results with badges
- **v1.0.0** - Initial design system lock

See [`CHANGELOG.md`](./CHANGELOG.md) for full history.

---

## 📖 Learn More

- [Component Library](./index.html) - Visual catalog
- [Playground](./playground.html) - Interactive builder
- [AI Guide](./README-AI.md) - For AI agents
- [Design System](./DESIGN_SYSTEM.md) - Complete specs
- [Demo Flows](./examples/demo-flows.html) - Live examples
- [GitHub](https://github.com/r-langley/lolo-dialog) - Source code

---

## 🏆 Key Achievements

✅ **10 locked components** with complete documentation
✅ **JSON-driven architecture** for AI consumption
✅ **Interactive playground** for rapid prototyping
✅ **Template library** for common patterns
✅ **Zero dependencies** - pure HTML/CSS/JS
✅ **Fully responsive** - mobile to desktop
✅ **State machine** for predictable UI transitions
✅ **Comprehensive docs** for humans and AI

---

## 📄 License

Copyright © 2026 Lolo. All rights reserved.

---

**Built for AI agents. Designed for conversation.**

# Lolo Dialog Design System

A sophisticated, conversational dialog interface design system for Lolo's AI-powered document management platform.

## Overview

This repository contains a complete design system and interactive prototype for Lolo's dialog interface, featuring:

- **10 locked core components** with comprehensive specifications
- **4 sophisticated demo flows** showcasing real-world use cases
- **Context-aware AI responses** with detailed information display
- **Complete design documentation** and implementation guides

## Quick Start

1. **View the prototype:**
   - Open `prototype-dialog.html` in your browser
   - Click the "States" button (top-left) to open the dev panel
   - Try all four demo flows

2. **Build new flows:**
   - Read `QUICK_REFERENCE.md` for component usage
   - Use `DESIGN_SYSTEM.md` for complete specifications
   - Follow the DialogFlow engine patterns

## Demo Flows

### 1. Contextual Search
Search for people in your documents with intelligent context about their roles, document versions, and suggested actions.

### 2. Create/Upload Document
Upload documents with automatic type detection, similar document discovery, and smart storage recommendations.

### 3. Secure Password/Secret
Save passwords with active website detection, related credential grouping, and intelligent vault placement.

### 4. Invite to Household
Invite members with existing member status, detailed permission previews, and access level customization.

## Key Features

- **User Bubble Alignment:** Right-justified, content-hugging (short message = narrow bubble)
- **Thinking States:** Smooth 2.4s shimmer animation between steps
- **Multi-Step Flows:** Three step types (suggestions, results, canvas)
- **Design Tokens:** CSS variables for colors, spacing, radius, shadows
- **Animations:** Fade-in, slide-up, shimmer effects

## Documentation

- `START_HERE.md` - Entry point and quick guide
- `DESIGN_SYSTEM.md` - Complete component specifications
- `QUICK_REFERENCE.md` - One-page cheat sheet
- `COMPREHENSIVE_REVIEW_V1.2.md` - Detailed flow breakdowns
- `CONTEXTUAL_FLOWS_GUIDE.md` - Contextual results patterns
- `CHANGELOG.md` - Version history
- `.claude/skills/lolo-dialog.md` - Claude Code skill

## Design Principles

1. **Consistency First** - Same components everywhere
2. **Content Over Structure** - Customize data, not markup
3. **Locked Components** - No new classes without approval
4. **User Bubble Fidelity** - Always right-justified, content-hugging
5. **Variable-Based Styling** - CSS variables only

## Version History

- **v1.2.1** (2026-02-28) - Bug fixes: syntax errors, global function access, UI polish
- **v1.2.0** (2026-02-28) - Comprehensive flow review with user bubbles
- **v1.1.0** (2026-02-28) - Contextual results enhancement
- **v1.0.0** (2026-02-28) - Initial design system lock

## Technologies

- Pure HTML/CSS/JavaScript
- No frameworks or dependencies
- CSS Variables for theming
- Custom DialogFlow state machine

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)

## License

Copyright © 2026 Lolo. All rights reserved.

---

**Built with precision. Designed for conversation.**

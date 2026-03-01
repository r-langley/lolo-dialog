# Contextual Flows Guide

**Version:** 1.1.0
**Date:** 2026-02-28
**Enhancement:** Detailed Results with Context

---

## Overview

Building on the locked design system (v1.0.0), we've extended the result row component to support **detailed, contextual information** without creating new components or breaking the existing structure.

This guide shows how to create sophisticated flows that display:
- Document status (current vs archived)
- Role information (witness, beneficiary, attorney, etc.)
- Version comparisons (in v2 but not v3)
- Temporal context (dates, currency, changes)
- Intelligent next-action suggestions

---

## What's New

### Enhanced Result Row Component

The existing `.result-row` now supports a **detailed mode** that displays multi-line, contextual information with status badges.

**Structure:**
```
[Icon] [Title + Badges]
       [Details line]
       [Meta line]
```

**CSS Classes (Added):**
- `.result-row.detailed` - Multi-line layout
- `.result-badge` - Status/role indicators
  - `.current` - Green badge for current documents
  - `.archived` - Gray badge for archived documents
  - `.role` - Lavender badge for roles
- `.result-title` - Bold title text
- `.result-details` - Secondary detail line
- `.result-meta` - Tertiary metadata line

**No new HTML structure** - just extensions of existing `.result-row`.

---

## Usage Patterns

### Simple Result (Original)

**Use when:** Basic search results with quote and source

```javascript
{
  id: 'result-1',
  quote: '"My brother, <strong>Taylor Johnson</strong>, will…"',
  source: 'Power of Attorney'
}
```

**Renders as:**
```
[Icon] "My brother, Taylor Johnson, will…"  Found in Power of Attorney
```

---

### Detailed Result (New)

**Use when:** Need to show context, status, roles, or multi-line info

```javascript
{
  id: 'result-1',
  detailed: true,  // ← Enables detailed mode
  title: 'Living Will of Damien and Abigail, 2024',
  status: 'archived',  // 'current' or 'archived'
  role: 'Witness',     // Optional role badge
  details: 'Taylor Johnson was listed as a witness to this will.',
  meta: 'This will is no longer current'
}
```

**Renders as:**
```
[Icon] Living Will of Damien and Abigail, 2024  [ARCHIVED] [WITNESS]
       Taylor Johnson was listed as a witness to this will.
       This will is no longer current
```

---

## Real-World Example: Finding Taylor Johnson

### The Scenario

User asks: "Is Taylor Johnson mentioned in any documents?"

**Context to surface:**
1. Found in 2024 Will as Witness (archived)
2. NOT in 2025 Will (current) - replaced by James Rollen & Jessica Myers
3. Email address found from 2024 correspondence
4. Possible intent: Creating 2026 Will, need witness

### The Flow

```javascript
const contextualSearchFlow = new DialogFlow({
  steps: [
    {
      id: 'search-results',
      type: 'results',
      question: 'We found Taylor Johnson in these documents',
      showInsights: true,
      results: [
        {
          id: 'will-2024',
          detailed: true,
          title: 'Living Will of Damien and Abigail, 2024',
          status: 'archived',
          role: 'Witness',
          details: 'Taylor Johnson was listed as a witness to this will.',
          meta: 'This will is no longer current'
        },
        {
          id: 'will-2025',
          detailed: true,
          title: 'Living Will of Damien and Abigail, 2025',
          status: 'current',
          details: 'Taylor Johnson is NOT listed. Current witnesses: James Rollen, Jessica Myers.',
          meta: 'Last updated 3 months ago'
        },
        {
          id: 'email-found',
          detailed: true,
          title: 'Contact Information Found',
          details: 'Located email: taylor.johnson@email.com',
          meta: 'From 2024 correspondence'
        }
      ]
    },
    {
      id: 'intent',
      type: 'suggestions',
      question: 'What would you like to do?',
      options: [
        {
          label: 'Draft email for 2026 Will witness',
          value: 'draft-email',
          icon: '...'
        },
        {
          label: 'Add Taylor to Contacts only',
          value: 'add-contact',
          icon: '...'
        },
        {
          label: 'Compare will versions',
          value: 'compare',
          icon: '...'
        }
      ]
    }
  ],
  onComplete: (answers) => {
    // Handle based on user choice
    if (answers.intent === 'draft-email') {
      // Show draft email...
    }
  }
});
```

---

## Badge Usage Guidelines

### Status Badges

**`.current`** (Green)
- Use for: Active/current documents
- Example: Current will, active policy, latest version

**`.archived`** (Gray)
- Use for: Historical/superseded documents
- Example: Old wills, expired policies, previous versions

### Role Badges

**`.role`** (Lavender)
- Use for: Person's role in document
- Examples: Witness, Beneficiary, Attorney, Executor, Guardian, Trustee

**Best Practices:**
- Use UPPERCASE for badge text
- Keep badges concise (1-2 words max)
- Order: Status badge first, then role badge
- Don't overuse - only when context is critical

---

## Content Guidelines

### Title Line

**Do:**
- ✅ Clear document name with year/version
- ✅ "Living Will of Damien and Abigail, 2024"
- ✅ "Power of Attorney - Healthcare, v3"

**Don't:**
- ❌ Overly long titles (ellipsis after ~50 chars)
- ❌ Technical IDs (show human-readable names)

### Details Line

**Do:**
- ✅ Explain the context clearly
- ✅ "Taylor Johnson was listed as a witness to this will."
- ✅ "This person is NOT in the current version."
- ✅ State changes explicitly

**Don't:**
- ❌ Be vague: "Found some info"
- ❌ Assume user knows context

### Meta Line

**Do:**
- ✅ Temporal info: "Last updated 3 months ago"
- ✅ Currency: "This will is no longer current"
- ✅ Additional context: "From 2024 correspondence"

**Don't:**
- ❌ Repeat info from details line
- ❌ Technical jargon

---

## Comparison Scenarios

### Showing Version Changes

```javascript
{
  id: 'doc-v2',
  detailed: true,
  title: 'Estate Plan, Version 2 (2023)',
  status: 'archived',
  role: 'Executor',
  details: 'Sarah Miller was named as executor.',
  meta: 'Replaced by Version 3 in 2024'
}
```

```javascript
{
  id: 'doc-v3',
  detailed: true,
  title: 'Estate Plan, Version 3 (2024)',
  status: 'current',
  details: 'Sarah Miller removed. New executor: David Chen.',
  meta: 'Currently in effect'
}
```

### Showing Role Evolution

```javascript
{
  id: 'will-old',
  detailed: true,
  title: 'Last Will & Testament, 2020',
  status: 'archived',
  role: 'Attorney',
  details: 'John Smith listed as legal representative.',
  meta: 'Attorney retired in 2022'
}
```

```javascript
{
  id: 'will-current',
  detailed: true,
  title: 'Last Will & Testament, 2025',
  status: 'current',
  role: 'Attorney',
  details: 'Updated to Lisa Wong of Wong & Associates.',
  meta: 'Active since March 2023'
}
```

---

## Intelligent Next Actions

After showing contextual results, offer **specific, smart actions** based on the context.

### Pattern: Draft Email for Missing Person

**When:** Person was in old doc but not current one

```javascript
{
  label: 'Draft email to invite as witness',
  value: 'draft-email',
  icon: '<email-icon>'
}
```

### Pattern: Add to Contacts Only

**When:** Found contact info but no immediate action needed

```javascript
{
  label: 'Add Taylor to Contacts only',
  value: 'add-contact',
  icon: '<contact-icon>'
}
```

### Pattern: Compare Versions

**When:** Multiple versions with differences

```javascript
{
  label: 'Compare will versions',
  value: 'compare',
  icon: '<compare-icon>'
}
```

### Pattern: View Document

**When:** Need to see full context

```javascript
{
  label: 'View full 2024 Will',
  value: 'view-doc',
  icon: '<document-icon>'
}
```

---

## Draft Email Pattern

After selecting "Draft email", show email canvas:

```javascript
onComplete: (answers) => {
  if (answers.intent === 'draft-email') {
    const c = document.querySelector('[data-section="canvas"]');
    c.innerHTML = `
      <div style="max-width: 520px; padding: var(--sp-4);">
        <div style="font-size: 12px; color: var(--text-tertiary); margin-bottom: var(--sp-2);">
          To: taylor.johnson@email.com
        </div>
        <div style="font-size: 12px; color: var(--text-tertiary); margin-bottom: var(--sp-3);">
          Subject: Witness Request for 2026 Living Will
        </div>
        <div style="padding: var(--sp-4); background: var(--neutral-100); border-radius: var(--r-lg);">
          <p>Hi Taylor,</p>
          <p>I hope this email finds you well. I'm updating my Living Will for 2026
          and would like to ask if you'd be willing to serve as a witness, as you
          did for our 2024 will.</p>
          <p>The witnessing process is straightforward and can be done at your
          convenience. Please let me know if you're available.</p>
          <p>Best regards,<br>Damien & Abigail</p>
        </div>
        <div style="display: flex; gap: var(--sp-2); margin-top: var(--sp-4);">
          <button class="doc-action-btn" onclick="triggerSuccess()">Send Email</button>
          <button class="action-chip" onclick="editDraft()">Edit Draft</button>
        </div>
      </div>
    `;
    c.classList.add('visible');
    document.getElementById('headerText').textContent = 'Draft email ready to send';
  }
}
```

---

## More Use Cases

### Use Case: Finding Attorney in Multiple Documents

```javascript
results: [
  {
    id: 'poa-2020',
    detailed: true,
    title: 'Power of Attorney - Healthcare, 2020',
    status: 'archived',
    role: 'Attorney',
    details: 'Robert Chen was designated as healthcare attorney.',
    meta: 'Superseded by 2024 version'
  },
  {
    id: 'poa-2024',
    detailed: true,
    title: 'Power of Attorney - Healthcare, 2024',
    status: 'current',
    role: 'Attorney',
    details: 'Robert Chen still designated. No changes.',
    meta: 'Active and current'
  }
]
```

### Use Case: Contact Info from Multiple Sources

```javascript
results: [
  {
    id: 'email-2022',
    detailed: true,
    title: 'Email from 2022 Tax Documents',
    details: 'Found email: accountant@taxfirm.com',
    meta: 'May be outdated'
  },
  {
    id: 'email-2025',
    detailed: true,
    title: 'Email from Recent Correspondence',
    details: 'Found email: accountant@newtaxfirm.com',
    meta: 'From January 2025 - likely current'
  }
]
```

---

## Design System Compliance

### Component Reuse ✅

- Uses existing `.result-row` structure
- Extends with `.detailed` modifier class
- No new top-level components created

### CSS Variables ✅

All new styles use design system tokens:
- Colors: `var(--text-primary)`, `var(--lavender-700)`, etc.
- Spacing: `var(--sp-2)`, `var(--sp-3)`, etc.
- Radius: `var(--r-sm)`, `var(--r-lg)`, etc.

### User Bubble ✅

- Remains right-justified
- Remains content-hugging
- No changes to alignment behavior

### Animations ✅

- Same `.fade-in` animation
- Same staggered timing (animation-delay)
- Same thinking states between steps

---

## Testing Checklist

When using detailed results:

- [ ] Status badges show correct color (current=green, archived=gray)
- [ ] Role badges show in lavender
- [ ] Title is bold and prominent
- [ ] Details line is readable (13px, secondary color)
- [ ] Meta line is subtle (12px, tertiary color)
- [ ] Hover state works (lavender-100 background)
- [ ] Multi-line layout doesn't break on long text
- [ ] Animations stagger correctly
- [ ] No horizontal scrolling

---

## Summary

**What Changed:**
- ✅ Enhanced result rows to support detailed, contextual display
- ✅ Added status and role badges
- ✅ Extended DialogFlow to render detailed results
- ✅ Created example: Contextual Taylor Johnson search

**What Stayed the Same:**
- ✅ No new top-level components
- ✅ Same HTML structure (extended, not replaced)
- ✅ Same design tokens
- ✅ Same user bubble behavior
- ✅ Same state machine
- ✅ Same DialogFlow engine

**Result:**
- ✅ Can now show sophisticated, contextual information
- ✅ Maintains design system consistency
- ✅ No breaking changes to existing flows
- ✅ Simple and detailed results coexist

---

## Quick Reference

**Simple Result:**
```javascript
{ id: 'r1', quote: 'Text', source: 'Source' }
```

**Detailed Result:**
```javascript
{
  id: 'r1',
  detailed: true,
  title: 'Document Name, Year',
  status: 'current' | 'archived',
  role: 'Role Name',  // optional
  details: 'Explanation line',
  meta: 'Additional context'
}
```

**Use detailed results when you need to show context about:**
- Document currency (current vs archived)
- Person's role in document
- Changes over time / versions
- Why something matters
- Temporal information

---

**End of Guide**

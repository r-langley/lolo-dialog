# Lolo Sharing & Access Control — Development Skill

You are a solution architect and product designer working on **Lolo's sharing, trust, and access control system**. This skill gives you full context of the current model so you can continue developing it without re-explaining from scratch.

---

## Context: What Lolo Is

Lolo is a personal financial operating system for households. It organizes a family's complete financial life across four domains:
- **Vault** — Documents, scanned files, important papers
- **Wealth** — Accounts, investments, net worth tracking
- **Legacy** — Estate planning, wills, beneficiaries
- **Health** — Medical records, insurance, directives

Sharing sits as an **access layer over the entire platform** — not a feature, but the foundational model that determines what any user can see and do.

---

## Current Trust Framework (v2.1)

### 4-Tier Model (Member role removed)

| Level | Name | Who | Capabilities |
|-------|------|-----|--------------|
| 4 | **Owner** | Primary account holder | Full control including workspace deletion |
| 3 | **Co-Owner** | Spouse / equal partner | Full control except delete workspace |
| 2 | **Collaborator** | Adult children, attorney, CPA, executor | Manage content + invite Viewers. Domain-scoped. |
| 1 | **Viewer** | Advisor, extended family, beneficiaries | Read-only access to granted domains |

**Key decision:** Member was dropped. Differentiation now comes from **domain grants**, not role granularity. A CPA and a daughter both get Collaborator — but CPA gets Wealth, daughter gets Vault + Legacy.

---

## The Three UI Layers

### Layer 1: Advisor (B2B)
- Manages **many households** from one workspace
- Full platform density: tables, search, sort, filter
- Can add members to any household they manage
- Access to households is **Viewer by default** (client-granted, client-revocable)
- Cannot self-elevate permissions
- Key surfaces: Multi-household dashboard, contacts table, pending invitations

### Layer 2: Client (B2B2C)
- Manages **one household** with family + professional access
- Household-focused, less dense than Advisor
- Richer sharing controls than Consumer
- Manages advisor access in a dedicated section
- Key surfaces: Household member list, domain controls, advisor access panel

### Layer 3: Consumer (B2C)
- Sees **only what they've been shared** (default: Vault domain)
- No access controls — only requests
- Can request expanded access (sent to Owner/Co-Owner for approval)
- Key surfaces: Shared files view, locked section indicators, pending request status

---

## AI-Native Behaviors (Cross-layer)

1. **Semantic Name Search** — AI scans documents for named individuals even before they authenticate. Shows "Recognized from Estate Plan.pdf" with confidence.
2. **Relationship → Permission Inference** — "attorney" → Collaborator + Legacy. "spouse" → Co-Owner + All. "daughter" → Collaborator + Vault + Legacy.
3. **Document-triggered Suggestions** — Will detects "executor: Sophie" → suggest invite. POA detects healthcare proxy → suggest Health domain.
4. **Conflict Detection** — Beneficiary in will ≠ account beneficiary → alert Owner.

---

## Advisor Add Member Flow (Key Interaction)

```
Dashboard (contacts table)
  → [Add Member] button
  → Modal: "Existing Household" or "New Household + Member"

IF Existing Household:
  → AI Semantic Search (doubles as the name input field)
     • Type name → results appear (even for unauthenticated users)
     • Results show: "Recognized from [document]" or "Active on Lolo"
     • No results → amber inline notice; form stays open, typed name carries through
     • No skip option — the name field IS the search field
  → Select household (if not pre-selected from a card)
  → Invite Form: email + relationship + trust level (always shown) + optional note
  → AI hint appears below trust level radios after relationship is chosen (if no level selected yet)
  → Send → pending row appears in contacts table

IF New Household:
  → Create household name/details
  → Same invite form flow
  → Household appears in advisor workspace
```

---

## Prototypes Built

| File | Description | Layer |
|------|-------------|-------|
| `prototype-advisor-add-member.html` | Full add member flow with AI search | Advisor |
| `prototype-client-sharing.html` | Household member management | Client |
| `prototype-client-access-config.html` | Trust level permission matrix + exceptions | Client |
| `prototype-consumer-access.html` | Shared content view + request access | Consumer |

Open these in a browser to interact with the current flows.

---

## Pending Decisions (Open Questions)

1. **Co-Owner conflict on advisor revocation** — Can one Co-Owner revoke without the other? (Recommendation: Yes, client sovereignty)
2. **Collaborator invite limits** — Unlimited or tier-gated? (Recommendation: Tier-gated)
3. **Advisor access expiry** — Annual renewal or perpetual? (Recommendation: Annual with auto-prompt)
4. **Beneficiary auto-access** — Auto-grant when detected, or suggest only? (Recommendation: Suggest only)
5. **New Household flow** — Advisor creating a household on behalf of client vs. client self-onboarding. Who owns what?

---

## Component Architecture (Designed in Pencil)

All 5 components exist in the Pencil design file (`/Users/fresh/Projects/Lolo/Sharing`):

1. **Permission Selector — Consumer Variant** — Simplified invite: AI suggestion + 1 confirm
2. **Permission Selector — Client/Advisor Variant** — Full: radio (4 tiers) + domain checkboxes + AI suggestion
3. **Advisor Access Panel** — Client-facing: advisor card, modify/remove, audit log
4. **Household Access Dashboard** — Members + professional access in sectioned list
5. **My Access Level Indicator** — Advisor-view banner showing "Your Access: Viewer (Wealth, Vault)"

---

## How to Continue Development

When the user asks to develop this further, you should:

### For Trust Framework Work
- Reference the 4-tier model above
- Decisions go in `00-SOLUTION-ARCHITECTURE.md` under "Decisions Made"
- When changing tier definitions, update the Domain Permission Matrix in the architecture doc

### For UX / Prototype Work
- Follow the three-layer principle: Advisor = dense, Client = household-focused, Consumer = minimal
- Build HTML prototypes as self-contained files with Tailwind CDN
- Name them `prototype-[layer]-[feature].html`
- Consumer layer should never show access management controls

### For Design Work (Pencil)
- Active file: The `.pen` file in `/Users/fresh/Projects/Lolo/Sharing`
- Uses Lunaris design system components
- Key component IDs: Card (`ERkuB`), Button Primary (`ZETEA`), Button Outline (`4x7RU`), Button Destructive (`ftEoU`), Input Group (`gKpi4`), Checkbox Checked (`r91nP`), Radio Selected (`u61z6`)

### For Schema / Data Model Work
- Firestore schema lives in `00-SOLUTION-ARCHITECTURE.md` under "Data Model & Schema"
- `household_members` collection handles family/professional access
- `advisor_access` collection is separate (compliance requirement)
- `audit_logs` collection is append-only, 7-year retention

### For New Feature Scoping
Ask: Which layer does this affect? What's the AI angle? What's the compliance risk?
Add a use case to the solution architecture doc following the UC-N format.

---

## Key Principles (Never Compromise These)

1. **Client Sovereignty** — Clients always retain control. No irrevocable access.
2. **Advisor Enablement** — Advisors get power tools without touching client ownership.
3. **Progressive Disclosure** — Complexity scales with layer. Consumer sees none of it.
4. **AI-Assisted, Human-Confirmed** — Trust level selector always shown. AI hint appears as supplementary guidance after relationship is chosen, not as a replacement for explicit selection. Target: 80%+ accept AI suggestion.
5. **Audit Everything** — Every access change is logged. No exceptions.

---

## Files in This Folder

```
Sharing/
├── 00-SOLUTION-ARCHITECTURE.md          ← Main reference doc (start here)
├── README.md                             ← Index (if created)
├── prototype-advisor-add-member.html    ← Interactive Advisor flow
├── prototype-client-sharing.html        ← Interactive Client flow
├── prototype-consumer-access.html       ← Interactive Consumer flow
├── R2 0 - Permission Model & Trust Framework [...].md   ← Original product req
├── ✐ R2 0 - Trust Level Framework Definition [...].md  ← Original product req
├── ✐ R2 0 - Advisor Access Controls [...].md           ← Original product req
└── .claude/commands/lolo-sharing.md    ← This file (skill)
```

---

*Invoke this skill at the start of any session working on Lolo's sharing/access system to restore full context.*

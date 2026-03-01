# Lolo Platform: Security & Access Control Architecture

**Version:** 2.1
**Status:** Reference Architecture
**Last Updated:** 2026-02-18
**Owner:** Solution Architecture

---

## Executive Summary

This document defines Lolo's comprehensive security and access control model—a **sharing-as-access-layer** architecture that overlays every platform surface and functionality. The model operates across three distinct UI layers (Advisor, Client, Consumer), each with different density, capability, and access controls, unified by a **4-tier trust framework**.

**Core Principle:** *Sharing is not a feature—it's the foundational access layer that determines what users can see, do, and manage across the entire platform.*

### The Three-Layer Hierarchy

```
┌─────────────────────────────────────────────────────────────┐
│  ADVISOR LAYER  —  Many Households                          │
│  Full platform density. Manages client households,          │
│  professionals, permissions. Advisory-grade controls.        │
└─────────────────┬───────────────────────────────────────────┘
                  │ Grants access to ↓
┌─────────────────▼───────────────────────────────────────────┐
│  CLIENT LAYER  —  One Household                             │
│  Rich sharing controls, household-focused. Manages family   │
│  + external parties. Less dense than Advisor.               │
└─────────────────┬───────────────────────────────────────────┘
                  │ Grants access to ↓
┌─────────────────▼───────────────────────────────────────────┐
│  CONSUMER LAYER  —  What I've Been Given                    │
│  Simplified. Sees only shared content (default: Vault).     │
│  No access controls—only requests. No management UI.        │
└─────────────────────────────────────────────────────────────┘
```

---

## Table of Contents

1. [Architecture Overview](#architecture-overview)
2. [Trust Framework Foundation](#trust-framework-foundation)
3. [User Segments & Personas](#user-segments--personas)
4. [Security Model](#security-model)
5. [Use Cases & User Journeys](#use-cases--user-journeys)
6. [Component Architecture](#component-architecture)
7. [Interaction Patterns](#interaction-patterns)
8. [Data Model & Schema](#data-model--schema)
9. [AI-Native Access Intelligence](#ai-native-access-intelligence)
10. [Compliance & Audit](#compliance--audit)

---

## Architecture Overview

### The Sharing-as-Access-Layer Paradigm

```
┌─────────────────────────────────────────────────────────────┐
│                    APPLICATION SURFACES                      │
│  (Vault, Wealth, Legacy, Health, Tasks, Documents, etc.)   │
└─────────────────────────────────────────────────────────────┘
                           ▲
                           │ Every interaction filtered through
                           │
┌─────────────────────────────────────────────────────────────┐
│              SHARING & ACCESS CONTROL LAYER                  │
│  • Trust Levels (Owner → Viewer)                            │
│  • Domain Permissions (Vault, Wealth, Legacy, Health)       │
│  • Role-Based Defaults (Family, Professional, Extended)     │
│  • Advisor Access Controls                                  │
│  • Inheritance & Override Logic                             │
│  • AI Permission Intelligence                               │
└─────────────────────────────────────────────────────────────┘
                           ▲
                           │
┌─────────────────────────────────────────────────────────────┐
│                   AUTHENTICATION LAYER                       │
│  (Identity, MFA, Session Management)                        │
└─────────────────────────────────────────────────────────────┘
```

### Design Principles

1. **Client Sovereignty:** Clients retain ultimate control; no irrevocable access grants
2. **Advisor Enablement:** Advisors get elevated workspace access without compromising client ownership
3. **Progressive Disclosure:** Show complexity proportional to user sophistication
4. **AI-First Defaults:** 80%+ users accept AI-suggested permissions without modification
5. **Household-Centric:** Co-ownership (spouses) as first-class pattern
6. **Audit Everything:** Complete trail of all access grants/changes/revocations

---

## Trust Framework Foundation

### 4-Tier Trust Levels

> **v2.1 Change:** Member role removed. Distinction between Member and Collaborator was not meaningful enough to justify the complexity. Merged into **Collaborator** with domain-based scoping providing the necessary differentiation.

| Level | Name | Typical Role | Capabilities | Default Domain Access |
|-------|------|--------------|--------------|----------------------|
| **4** | **Owner** | Self, Primary Account Holder | Full control: invite, manage, delete workspace | All domains |
| **3** | **Co-Owner** | Spouse, Joint Account Holder | Full control except cannot delete workspace | All domains |
| **2** | **Collaborator** | Adult child, attorney, CPA, executor | Manage content + invite Viewers. Scoped by domain grants. | Vault (default) |
| **1** | **Viewer** | Advisors, extended family, beneficiaries | Read-only access to granted domains | Vault or Wealth (advisor default) |

**What differentiation now comes from domains, not roles:** A CPA and an adult daughter both get Collaborator, but the CPA's domain is scoped to Wealth; the daughter may have Vault + Legacy. This is simpler to communicate to users while preserving precision.

### Domain Permission Matrix

| Trust Level | Vault | Wealth | Legacy | Health | Workspace Settings |
|-------------|-------|--------|--------|--------|-------------------|
| **Owner** | Full | Full | Full | Full | Full |
| **Co-Owner** | Full | Full | Full | Full | Full (except delete workspace) |
| **Collaborator** | Edit (granted domains) | Edit (granted domains) | Edit (granted domains) | Edit (granted domains) | Invite Viewers only |
| **Viewer** | View (if granted) | View (if granted) | View (if granted) | View (if granted) | None |

**Domain Inheritance:** Default = all domains. Can be restricted per-user (e.g., "Advisor: Wealth + Vault only")

---

## User Segments & Personas

### Segment 1: Advisors (B2B Users)

**Context:** Manages 50-500 client households via Lolo platform

**Needs:**
- Rapid client onboarding (configure household in <5 min)
- Multi-household dashboard with permission overview
- Clear boundaries between advisory access vs. client ownership
- Audit logs for compliance

**Access Pattern:**
- **Advisor Workspace** (owns) → **Client Household** (Viewer access, client-granted)
- Cannot self-grant access to client households
- Can invite clients to their own household during onboarding

**Key Constraint:** Client must be able to revoke advisor access post-handover

---

### Segment 2: Clients (B2B2C Users)

**Context:** Individual/couple with financial advisor relationship

**Needs:**
- Manage family access (spouse, children, parents)
- Grant/modify/revoke advisor access
- Understand who can see what
- Confidence in data privacy

**Access Pattern:**
- **Primary Client = Owner**, Spouse = Co-Owner (most common)
- Can invite: Family (Collaborator/Viewer), Professionals (Collaborator/Viewer)
- Controls advisor access via dedicated "Advisor Access" section

---

### Segment 3: Consumers (B2C Users)

**Context:** Self-serve individuals without advisor relationship

**Needs:**
- Share with spouse in <60 seconds
- Minimal cognitive load
- "It just works" experience

**Access Pattern:**
- Simplified 3-option flow:
  - "Full Access" → Co-Owner (spouse)
  - "Can Help Manage" → Collaborator (adult child, sibling)
  - "View Only" → Viewer (extended family)
- AI suggests based on relationship ("my wife" → Co-Owner)

---

## Security Model

### Access Control Architecture

```
User Authentication
  ↓
Role Assignment (Owner, Co-Owner, Collaborator, Viewer)
  ↓
Domain Permission Check (Vault, Wealth, Legacy, Health)
  ↓
Action Authorization (Read, Write, Invite, Delete)
  ↓
Audit Log Entry
```

### Permission Inheritance & Override

**Default Inheritance:**
```
Workspace Level Permission
  ├─ Default: All domains (Vault, Wealth, Legacy, Health)
  └─ Override: Per-user domain restrictions
      Example: "Advisor John: Wealth + Vault only"
```

**Override Rules:**
1. Owner/Co-Owner can restrict domains for any lower trust level
2. Collaborator can restrict domains for Viewer
3. User cannot elevate their own permissions
4. Domain restriction persists even if trust level elevated (must explicitly re-grant)

### Advisor-Specific Security Rules

| Rule | Enforcement |
|------|-------------|
| **Client-Initiated Grant** | Advisor cannot add themselves; must receive invite |
| **Visible Access Level** | Advisor sees "My Access: Viewer" (read-only indicator) |
| **Client Revocation** | Client can revoke anytime; advisor notified, loses access immediately |
| **No Self-Elevation** | Advisor cannot change their own trust level |
| **Audit Trail** | All advisor access changes logged with timestamp + initiator |
| **Firm Oversight** | (Future) Advisory firm admin can view all advisor-client access grants |

---

## Use Cases & User Journeys

### UC-1: Advisor Onboards New Client Household

**Actors:** Advisor (Sarah), Client (David & Emma - married couple)

**Flow:**
1. **Advisor workspace** → "Add Client Household"
2. Sarah enters David's email → System creates client household, sets David as Owner
3. Sarah's access = Viewer (Wealth + Vault domains only) — *client-granted by default during setup*
4. Sarah invites Emma → Suggests Co-Owner (AI detects "spouse" mention)
5. David receives email → Reviews permissions → Accepts
6. Emma receives email → Accepts Co-Owner
7. **Result:** David (Owner), Emma (Co-Owner), Sarah (Viewer - Wealth/Vault)

**Time to Complete:** 4 minutes
**Advisor Actions:** 5 clicks
**Client Actions:** 1 review + accept

---

### UC-2: Client Manages Family Access Post-Onboarding

**Actors:** Client (David - Owner), Adult daughter (Sophie), Mother-in-law (Grace)

**Flow:**
1. David → Household Settings → "Family Access"
2. "Invite Family Member" → Enter Sophie's email
3. AI prompts: "Sophie can help manage? (Collaborator)" → David accepts
4. Domain selection: All except Health (Sophie doesn't need medical)
5. Sophie receives invite → Accepts → Now Collaborator (Vault, Wealth, Legacy only)
6. David invites Grace → AI suggests "View Only" → David accepts
7. Grace = Viewer (all domains)

**Time to Complete:** 2 minutes
**Decisions:** 2 (trust level + domain selection)

---

### UC-3: Consumer Shares with Spouse (Self-Serve)

**Actors:** Consumer (Jordan), Spouse (Taylor)

**Flow:**
1. Jordan → "Share with Family" button (persistent in nav)
2. Enter Taylor's email
3. AI detects "my partner Taylor" (from onboarding) → Auto-selects "Full Access"
4. Jordan confirms → Taylor receives invite
5. Taylor accepts → Now Co-Owner (all domains)

**Time to Complete:** 45 seconds
**Decisions:** 0 (AI auto-selected, user confirmed)

---

### UC-4: Client Modifies Advisor Access

**Actors:** Client (David - Owner), Advisor (Sarah)

**Flow:**
1. David → Settings → "Advisor Access" section
2. Sees: "Sarah Chen (sarah@wealthadvisors.com) - Viewer - Wealth, Vault"
3. "Modify Access" → Change domains: Add Legacy
4. Confirm → Sarah receives notification: "David granted you access to Legacy"
5. Sarah's dashboard updates immediately

**Alternative Flow - Revocation:**
1. David → "Remove Advisor Access"
2. Confirmation: "Sarah will lose access to your household. Continue?"
3. Confirm → Sarah receives notification, loses access
4. Audit log: "2026-02-16 14:32 - David revoked advisor access (Sarah Chen)"

---

### UC-5: Collaborator Invites Viewer (Delegated Invite)

**Actors:** Collaborator (Sophie - daughter), Viewer (Uncle Robert - attorney)

**Flow:**
1. Sophie → "Invite Professional"
2. Enter Robert's email + role "Attorney"
3. AI suggests: Viewer - Legacy only
4. Sophie adjusts: Add Vault (estate planning docs)
5. Robert receives invite from "Sophie (on behalf of David's household)"
6. Robert accepts → Viewer (Legacy + Vault)

**Permission Check:**
- ✅ Sophie (Collaborator) can invite Viewers
- ❌ Sophie cannot invite Owner/Co-Owner/Collaborator

---

## Component Architecture

### Core Components

#### 1. Permission Selector Component

**Location:** Invite flows, access management modals

**Props:**
- `userSegment`: "advisor" | "client" | "consumer"
- `inviterTrustLevel`: 1-5
- `suggestedLevel`: AI-inferred level
- `availableDomains`: string[]

**UI Variants:**

**Consumer Variant** (Simplified):
```
┌────────────────────────────────────┐
│ Who are you inviting?              │
│ ┌────────────────────────────────┐ │
│ │ my wife Sarah                  │ │
│ └────────────────────────────────┘ │
│                                    │
│ ✨ Suggested: Full Access          │
│ Sarah will be able to:             │
│ • View and edit everything         │
│ • Invite family members            │
│ • Manage accounts                  │
│                                    │
│ [Change] [Continue]                │
└────────────────────────────────────┘
```

**Client/Advisor Variant** (Full):
```
┌────────────────────────────────────┐
│ Invite to Household                │
│ ┌────────────────────────────────┐ │
│ │ robert@lawfirm.com             │ │
│ └────────────────────────────────┘ │
│                                    │
│ Access Level:                      │
│ ○ Co-Owner (full control)         │
│ ○ Collaborator (can help manage)  │
│ ● Viewer (view only)              │
│                                    │
│ Grant access to:                   │
│ ☑ Vault    ☑ Wealth               │
│ ☑ Legacy   ☐ Health               │
│                                    │
│ ✨ AI Suggestion: Viewer - Legacy  │
│    (Based on "attorney" role)      │
│                                    │
│ [Cancel] [Send Invite]             │
└────────────────────────────────────┘
```

---

#### 2. Advisor Access Panel

**Location:** Client household settings

**Features:**
- Read-only display of advisor's current access
- Modify domains (keep trust level)
- Revoke access with confirmation
- Audit log of changes

```
┌────────────────────────────────────────────┐
│ Advisor Access                             │
│                                            │
│ ┌────────────────────────────────────────┐ │
│ │ 👤 Sarah Chen                          │ │
│ │    sarah@wealthadvisors.com            │ │
│ │                                        │ │
│ │    Access Level: Viewer                │ │
│ │    Domains: Wealth, Vault              │ │
│ │    Since: Jan 15, 2026                 │ │
│ │                                        │ │
│ │    [Modify Access] [Remove Access]     │ │
│ └────────────────────────────────────────┘ │
│                                            │
│ Recent Changes:                            │
│ • Feb 10 - You added Legacy domain        │
│ • Jan 15 - You granted advisor access     │
│                                            │
└────────────────────────────────────────────┘
```

---

#### 3. Household Access Dashboard

**Location:** Settings → Sharing & Access

**Sections:**
1. **Household Members** (Family)
2. **Professional Access** (CPA, Attorney, etc.)
3. **Advisor Access** (separated, client-controlled)

**Row Component:**
```
┌──────────────────────────────────────────────────────┐
│ 👤 Emma Johnson (Co-Owner)                           │
│    emma@email.com                                    │
│    Access: All domains | Since: Jan 2026             │
│    [Modify]                                          │
├──────────────────────────────────────────────────────┤
│ 👤 Sophie Johnson (Collaborator)                     │
│    sophie@email.com                                  │
│    Access: Vault, Wealth, Legacy | Since: Feb 2026   │
│    [Modify] [Remove]                                 │
└──────────────────────────────────────────────────────┘
```

---

#### 4. My Access Level Indicator (Advisor View)

**Location:** Client household header (when advisor viewing)

```
┌────────────────────────────────────────────┐
│ Johnson Household                          │
│ ℹ️ Your Access: Viewer (Wealth, Vault)     │
│    Client can modify your access anytime   │
└────────────────────────────────────────────┘
```

**Behavior:**
- Always visible when advisor in client household
- Click → Modal explaining access level
- Link to "Request Additional Access" (sends message to client)

---

#### 5. Access Request Flow (Future)

**Trigger:** Advisor needs access to restricted domain

```
Advisor clicks "Health" tab (no access)
  ↓
Modal: "You don't have access to Health information"
  [Request Access from Client]
  ↓
Client receives notification:
  "Sarah Chen requested access to Health domain"
  [Approve] [Deny] [Message Sarah]
```

---

## Interaction Patterns

### Pattern 1: Permission Inheritance Visualization

**Where:** Invite flow, member detail view

**Visual Language:**
```
Workspace Permission: All Domains
  └─ User Override: Wealth + Vault only
     └─ Effective Permission: Wealth, Vault
```

**UI Treatment:**
- Default permissions: Light blue background
- Overridden permissions: Yellow indicator
- Tooltip: "Custom domain selection applied"

---

### Pattern 2: Confidence Indicators for AI Suggestions

**Confidence Levels:**
- 🟢 High (>90%): Auto-select, user can change
- 🟡 Medium (70-90%): Suggest prominently, require confirmation
- 🔴 Low (<70%): Show as option, don't pre-select

**Example:**
```
✨ Suggested: Co-Owner (95% confidence)
   Based on: "my husband" mentioned
```

---

### Pattern 3: Bulk Permission Management

**Use Case:** Advisor setting up multi-member household

```
┌─────────────────────────────────────────┐
│ Add Multiple Members                    │
│                                         │
│ david@email.com     Owner        [All]      │
│ emma@email.com      Co-Owner     [All]      │
│ sophie@email.com    Collaborator [Custom]   │
│   └─ Vault, Wealth, Legacy                 │
│ robert@lawfirm.com  Viewer       [Legacy]   │
│                                         │
│ Apply advisor access preset:            │
│ ● Standard (Viewer - Wealth, Vault)     │
│ ○ Comprehensive (Collaborator - All)   │
│ ○ Custom                                │
│                                         │
│ [Cancel] [Send All Invites]             │
└─────────────────────────────────────────┘
```

---

### Pattern 4: Progressive Permission Requests

**Scenario:** User tries to perform restricted action

```
User (Viewer) attempts to edit document
  ↓
Inline message: "You need Collaborator access to edit"
  [Request Access] [Cancel]
  ↓
Owner receives notification with context:
  "Sophie tried to edit 'Estate Plan.pdf' but has view-only access"
  [Upgrade to Collaborator] [Keep Current Access]
```

---

### Pattern 5: Access Change Notifications

**Trigger Events:**
- Access granted
- Access level changed
- Domain added/removed
- Access revoked

**Notification Format:**
```
📧 Email + 🔔 In-app

Subject: Your access to Johnson Household updated

Hi Sarah,

David Johnson modified your access:
• Added: Legacy domain
• You can now view estate planning documents

View household →

---

⚠️ If you didn't expect this change, contact David immediately.
```

---

## Data Model & Schema

### Firestore Schema (Recommended)

```typescript
// Collection: households
{
  id: "household_abc123",
  name: "Johnson Household",
  owners: ["user_david", "user_emma"], // Co-ownership
  created_at: timestamp,
  subscription_tier: "premium",

  // Metadata for AI
  household_type: "married_couple_with_children",
  relationship_graph: {
    user_david: { role: "primary", relationships: ["spouse:user_emma", "child:user_sophie"] },
    user_emma: { role: "spouse", relationships: ["spouse:user_david", "child:user_sophie"] },
  }
}

// Collection: household_members
{
  id: "member_xyz789",
  household_id: "household_abc123",
  user_id: "user_sophie",
  email: "sophie@email.com",

  // Access Control
  trust_level: 2, // Collaborator
  domains: ["vault", "wealth", "legacy"], // Health excluded
  granted_by: "user_david",
  granted_at: timestamp,

  // Role Context
  role_type: "family", // family | professional | advisor | extended
  relationship: "daughter", // For AI inference

  // State
  status: "active", // pending | active | revoked
  last_accessed: timestamp,

  // Audit
  access_log_ref: "audit_logs/member_xyz789",

  // AI Metadata
  ai_suggested: true,
  ai_confidence: 0.95,
  custom_override: false, // True if user modified AI suggestion
}

// Collection: advisor_access (separate for compliance)
{
  id: "advisor_access_456",
  household_id: "household_abc123",
  advisor_user_id: "user_sarah",
  advisor_email: "sarah@wealthadvisors.com",

  // Access Control
  trust_level: 1, // Always Viewer for advisors
  domains: ["wealth", "vault"],

  // Client Control
  granted_by: "user_david", // Must be Owner/Co-Owner
  granted_at: timestamp,
  modified_at: timestamp,
  can_self_modify: false, // Always false

  // Advisory Firm Context
  firm_id: "firm_wealthadvisors",
  firm_compliance_reviewer: "user_compliance_officer", // Future

  // State
  status: "active",
  revoked_at: null,
  revoked_by: null,

  // Audit
  change_history: [
    { timestamp, action: "granted", domains: ["wealth", "vault"], by: "user_david" },
    { timestamp, action: "domain_added", domain: "legacy", by: "user_david" },
  ]
}

// Collection: audit_logs
{
  id: "audit_log_001",
  household_id: "household_abc123",
  timestamp: timestamp,
  actor_id: "user_david",
  action: "revoke_advisor_access",
  target_user_id: "user_sarah",
  metadata: {
    previous_access: { trust_level: 1, domains: ["wealth", "vault", "legacy"] },
    reason: "client_initiated", // client_initiated | compliance | security_concern
  },
  ip_address: "192.168.1.1", // For security
  user_agent: "Mozilla/5.0...",
}
```

---

### Access Control Query Patterns

```typescript
// Check if user can access resource
function canAccess(userId: string, householdId: string, domain: string, action: 'read' | 'write' | 'delete'): boolean {
  const member = getMember(userId, householdId);

  // Domain check
  if (!member.domains.includes(domain)) return false;

  // Action authorization based on trust level
  const permissions = {
    4: { read: true, write: true, delete: true },  // Owner
    3: { read: true, write: true, delete: true },  // Co-Owner
    2: { read: true, write: true, delete: false }, // Collaborator
    1: { read: true, write: false, delete: false }, // Viewer
  };

  return permissions[member.trust_level][action];
}

// Get all households where user has access
function getAccessibleHouseholds(userId: string) {
  return db.collection('household_members')
    .where('user_id', '==', userId)
    .where('status', '==', 'active')
    .get();
}

// Advisor-specific: Get all client households
function getAdvisorClients(advisorUserId: string) {
  return db.collection('advisor_access')
    .where('advisor_user_id', '==', advisorUserId)
    .where('status', '==', 'active')
    .get();
}
```

---

## AI-Native Access Intelligence

### AI Capabilities

#### 1. Relationship → Permission Inference

**Training Data:**
- "my wife Sarah" → Co-Owner (all domains)
- "my daughter who's the executor" → Collaborator (Vault, Legacy)
- "our financial advisor" → Viewer (Wealth only)
- "my accountant" → Collaborator (Wealth, Vault)
- "my mom" → Collaborator (all except Wealth)

**Gemini 3.0 Prompt Pattern:**
```
Context: User is inviting "{relationship}" to household
User input: "{natural_language_description}"
Household context: {household_type}, {existing_members}

Suggest:
1. Trust level (1-5)
2. Domains (vault, wealth, legacy, health)
3. Confidence score (0-1)
4. Explanation (1 sentence)
```

---

#### 2. Document-Based Access Suggestions

**Trigger:** AI detects named individuals in documents

**Examples:**
- Will mentions "Executor: Sophie Johnson" → Prompt to invite Sophie as Collaborator (Legacy)
- POA names "Grace Miller as healthcare proxy" → Suggest Grace as Collaborator (Health)
- Account beneficiary "Robert Miller" not in household → Guidance card: "Add Robert?"

**Proactive Notification:**
```
┌──────────────────────────────────────────┐
│ 💡 Suggestion from your documents        │
│                                          │
│ Your will names Sophie Johnson as        │
│ executor. Would you like to invite her?  │
│                                          │
│ Suggested access: Collaborator - Legacy  │
│                                          │
│ [Invite Sophie] [Dismiss]                │
└──────────────────────────────────────────┘
```

---

#### 3. Conflict Detection

**Scenarios:**
- Beneficiary in will ≠ beneficiary in account → Alert Owner
- Executor in POA ≠ person with Collaborator access → Suggest alignment
- Advisor access expired but still referenced in notes → Prompt renewal

**Alert Format:**
```
⚠️ Access Mismatch Detected

Your estate plan names Robert Miller as executor, but he
has Viewer access (can't manage Legacy documents).

[Upgrade Robert to Collaborator] [Review Access]
```

---

#### 4. Smart Defaults by User Segment

| User Segment | AI Behavior |
|--------------|-------------|
| **Consumer** | Hide trust levels, show 3 presets, auto-suggest based on relationship |
| **Client** | Show 4 trust levels, suggest domains based on role, offer bulk invite |
| **Advisor** | Pre-fill client household template, offer compliance-approved presets |

---

## Compliance & Audit

### Regulatory Requirements

#### Financial Advisor Access (SEC/FINRA)

1. **Client Consent:** Must be explicit, documented, revocable
2. **Audit Trail:** All access must be logged with timestamp + purpose
3. **Data Minimization:** Advisor access limited to necessary domains
4. **Firm Oversight:** (Future) Advisory firm must be able to review advisor-client access

**Implementation:**
- Separate `advisor_access` collection (not mixed with family members)
- Client-initiated grant only (no self-service for advisors)
- Immutable audit log (append-only)
- Annual access review prompt to clients

---

#### HIPAA (Health Domain)

1. **Minimum Necessary:** Default exclude Health from Advisor access
2. **Authorization:** Explicit opt-in required for Health domain
3. **Audit:** Track all Health domain access attempts

**Implementation:**
- Health domain grayed out by default in advisor invite flow
- Explicit checkbox: "Grant access to health information"
- Separate audit log for Health domain access

---

### Audit Log Requirements

**Retention:** 7 years (compliance standard)

**Logged Events:**
- Access granted (who, to whom, level, domains)
- Access modified (what changed, who initiated)
- Access revoked (who, when, reason if provided)
- Failed access attempts (user tried to access restricted resource)
- Domain access (user viewed document in specific domain)
- Invite sent/accepted/declined

**Audit Dashboard (Owner/Co-Owner):**
```
┌─────────────────────────────────────────────────┐
│ Access Activity (Last 30 Days)                  │
│                                                 │
│ Feb 16, 2:45 PM - Sarah Chen viewed Vault      │
│ Feb 15, 9:12 AM - You modified Sophie's access │
│ Feb 10, 4:30 PM - Robert Miller accepted invite│
│ Feb 8, 11:20 AM - You granted advisor access   │
│                                                 │
│ [Download Full Audit Log] [Filter]             │
└─────────────────────────────────────────────────┘
```

---

## Implementation Roadmap

### Phase 1: Core Framework (R2.0)

- [ ] 4-tier trust level implementation
- [ ] Domain permission system
- [ ] Permission Selector Component (all variants)
- [ ] Household Access Dashboard
- [ ] Basic audit logging

### Phase 2: Advisor-Specific (R2.1)

- [ ] Advisor Access Panel (client view)
- [ ] My Access Level Indicator (advisor view)
- [ ] Advisor-client access grant flow
- [ ] Advisor access audit trail
- [ ] Client revocation flow with notifications

### Phase 3: AI Intelligence (R2.2)

- [ ] Relationship → permission inference
- [ ] Document-based access suggestions
- [ ] Conflict detection (will vs. account beneficiaries)
- [ ] Smart defaults by user segment

### Phase 4: Advanced Features (R2.3+)

- [ ] Access request flow (advisor → client)
- [ ] Firm compliance dashboard
- [ ] Bulk permission management
- [ ] Annual access review automation
- [ ] Progressive permission requests

---

## Open Questions & Decisions Needed

### Critical Decisions

1. **Co-Owner Conflict Resolution:**
   *Q:* What happens if two Co-Owners disagree on revoking advisor access?
   *Options:*
   - A) Either Co-Owner can revoke (simpler, client-protective)
   - B) Both must agree (prevents unilateral decisions)
   - **Recommendation:** Option A (client sovereignty principle)

2. **Collaborator Invite Limits:**
   *Q:* How many Viewers can a Collaborator invite?
   *Options:*
   - A) Unlimited (trust-based)
   - B) Tiered by subscription (5 for basic, 20 for premium, unlimited for enterprise)
   - **Recommendation:** Option B (prevents abuse, revenue opportunity)

3. **Advisor Access Defaults:**
   *Q:* Should advisor access default to time-limited (e.g., 1 year auto-expire)?
   *Options:*
   - A) Perpetual until revoked
   - B) Annual renewal required (compliance-friendly)
   - **Recommendation:** Option B with auto-renewal prompt

4. **Beneficiary Auto-Access:**
   *Q:* When AI detects beneficiary in will, auto-grant Viewer access?
   *Options:*
   - A) Auto-grant + notify Owner
   - B) Suggest only, require Owner approval
   - **Recommendation:** Option B (avoid surprise access grants)

---

## Success Metrics

### Quantitative

- **Advisor Efficiency:** <5 min to configure new client household (95th percentile)
- **AI Adoption:** >80% accept suggested permissions without modification
- **Consumer Simplicity:** >90% share with spouse in <60 seconds
- **Client Confidence:** <5% revoke access within 30 days (stability indicator)
- **Zero Unauthorized Access:** 0 incidents of users accessing restricted domains

### Qualitative

- Advisors report "feels professional, builds client trust"
- Clients report "I understand who can see what"
- Consumers report "easier than other financial apps"
- Compliance teams approve for regulatory use

---

## References

- [Permission Model & Trust Framework](./R2%200%20-%20Permission%20Model%20&%20Trust%20Framework%202e7c2ecdcd9280d78056f361ec541e77.md)
- [Trust Level Framework Definition](./✐%20R2%200%20-%20Trust%20Level%20Framework%20Definition%202e7c2ecdcd9280fba0d7ebea5527d731.md)
- [Advisor Access Controls](./✐%20R2%200%20-%20Advisor%20Access%20Controls%202e7c2ecdcd9280a286c9ebfb71f161fb.md)

---

**Document Control:**
- Next Review: 2026-03-16
- Change Log: See Git history
- Stakeholders: Product, Engineering, Design, Compliance

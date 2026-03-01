# ✐ R2.0 - Trust Level Framework Definition

ID: PE-169
Release: 2
Status: In Design
Audience: All
Area: Sharing
Assigned to: Stuart Guest-Smith, Ross Langley
Progress: 30
Effort: M
Product Flow: R2.0 - Permission Model & Trust Framework (https://www.notion.so/R2-0-Permission-Model-Trust-Framework-2e7c2ecdcd9280d78056f361ec541e77?pvs=21)

## The Problem

---

*2-3 sentences. What's broken or missing? Who's affected and why does it matter now?*

Dev team cannot build without a locked permission spec. The framework must work for Advisors configuring clients, Clients managing family, and Consumers self-serving—each with different complexity tolerances.

---

### Success Looks Like

*How will we know this design solved the problem? Be specific.*

- Complete trust level definitions applicable to all user types
- Role-specific defaults documented (Family vs. Professional vs. Advisor)
- Consumer simplification rules defined (which options to hide)
- Dev can implement without design clarification

---

### Constraints & Context

*Technical limitations, timeline, dependencies, or business constraints.*

- Advisors need **elevated workspace-level access** without compromising **client ownership**
- Client must retain ability to revoke advisor access post-onboarding
- Consumer flow hides complexity (AI suggests "Spouse" → auto-assigns Co-Owner)
- Household co-ownership (2 equal Owners) must be first-class pattern
- Regulatory: Advisors cannot have irrevocable access to client financial data
- Firestorm schema pattern

---

### Scope

*What's included in this design task?*

- [x]  Trust level taxonomy (5 levels) with per-level capabilities
- [ ]  Role defaults: Family, Professional, Advisor, Extended Family
- [ ]  Consumer simplification mapping (5 levels → 3 visible options)
- [ ]  Domain permissions: Vault, Wealth, Legacy, Health
- [ ]  Advisor-specific: "Advisory Access" permission type
- [ ]  Inheritance rules with examples
- [ ]  Firestore schema recommendation

### 🤖 AI-Native Considerations

- Schema designed for Gemini 3.0 inference (relationship → permissions)
- Metadata fields for RAG indexing (role, relationship_type, household_context)
- User types "my daughter Sarah" in invite flow → AI suggests: "Organizer access to Vault + Legacy?"
- Document scan detects "executor: John Smith" → AI prompts: "Invite John as Collaborator?"
- Beneficiary mentioned in will ≠ listed in account → AI Guidance card: "Conflict detected..."

---

### Links & References

| Type | Link |
| --- | --- |
| Research |  |
| Related Cards |  |
| Prod Reference |  |

---

### Decisions Made

*Key design decisions and rationale. Add as you go.*

- **[Date]:**

---

### Concepts/Ideas (AI Prototypes or other site images)

*Any specific prototypes or similar sites/images for context.*

- [ ]

---

### Technical Considerations

*Inputs into the technical implementation of the design solution* 

- [ ]

---

### Open Questions

*Blockers, stakeholder questions, or items to resolve*

- [ ]  How many invites can Organizer send? **A:** Unlimited Members/Viewers, no Owners/Co-Owners
- [ ]  Can advisor have multiple clients in one household? **A:** No. 1 household = 1 primary client. Advisor workspace contains many households.
- [ ]  What happens if both spouses are Owners and disagree on revoking advisor?
- [ ]  Should beneficiaries auto-get Member access when detected in documents?

---

### Status Notes

*Running changelog, newest last.*

- **[Date]:** Card created

---
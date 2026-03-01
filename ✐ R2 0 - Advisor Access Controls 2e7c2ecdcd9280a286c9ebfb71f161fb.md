# ✐ R2.0 - Advisor Access Controls

ID: PE-172
Release: 2
Status: Ready
Audience: Advisor-facing
Area: Sharing
Priority: CRITICAL
Effort: M
Product Flow: R2.0 - Permission Model & Trust Framework (https://www.notion.so/R2-0-Permission-Model-Trust-Framework-2e7c2ecdcd9280d78056f361ec541e77?pvs=21)

## The Problem

---

*2-3 sentences. What's broken or missing? Who's affected and why does it matter now?*

Advisors need access to client households to provide service, but Clients must retain control. Advisors should not be able to grant themselves access or prevent Client revocation. This is critical for B2B2C trust.

---

### Success Looks Like

*How will we know this design solved the problem? Be specific.*

- Clients can grant/modify/revoke Advisor access anytime
- Advisors can see but not modify their own access level
- Advisory access clearly distinguished from family access
- Audit trail for all Advisor access changes

---

### Constraints & Context

*Technical limitations, timeline, dependencies, or business constraints.*

- Compliance requirement: Client must grant access explicitly
- Advisor cannot add themselves to client household
- Multiple Advisors may have access to same household
- Advisor firm may have compliance oversight needs (future)

---

### Scope

*What's included in this design task?*

- [ ]  "Advisor Access" section in sharing settings
- [ ]  Grant advisor access flow (Client-initiated)
- [ ]  Modify advisor access level
- [ ]  Revoke advisor access with confirmation
- [ ]  Advisor view: "My access level" (read-only)
- [ ]  Access change audit log
- [ ]  Notification to Advisor on access changes

### 🤖 AI-Native Considerations

- AI suggestion: "Your advisor needs Wealth access to review your portfolio"

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

*Blockers, stakeholder questions, or items to resolve.*

- [ ]  [ ]

---

### Status Notes

*Running changelog, newest last.*

- **[Date]:** Card created

---
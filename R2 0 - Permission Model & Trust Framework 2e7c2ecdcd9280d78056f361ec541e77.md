# R2.0 - Permission Model & Trust Framework

Status: Next
Area: Sharing
Audience: All
ID: PF-75
Priority: CRITICAL
Product Delivery: ✐ R2.0 - Trust Level Framework Definition (https://www.notion.so/R2-0-Trust-Level-Framework-Definition-2e7c2ecdcd9280fba0d7ebea5527d731?pvs=21), ✐ R2.0 - Permission Selector Component (https://www.notion.so/R2-0-Permission-Selector-Component-2e7c2ecdcd92804988bae3e4a6dc733c?pvs=21), ✐ R2.0 - Advisor Access Controls (https://www.notion.so/R2-0-Advisor-Access-Controls-2e7c2ecdcd9280a286c9ebfb71f161fb?pvs=21)
Release: 2

### **Problem**

*2-3 sentences. What's broken or missing? Who's affected and why does it matter now?*

Users across all segments (Advisors, Clients, Consumers) need a unified permission framework that's simple enough for Consumers to self-serve, yet powerful enough for Advisors to configure client households professionally. Without a clear model, Advisors can't efficiently onboard clients, Clients can't confidently manage family access, and Consumers abandon due to complexity.

---

### Outcome (Success looks like…)

*How will we know this design solved the problem? Be specific.*

- Advisors can configure a new client household's sharing in under 5 minutes (as part of direct onboarding through their interface as well)
- Clients can manage family permissions without advisor assistance
- Consumers can share with a spouse in under 60 seconds
- 80%+ accept AI-suggested defaults across all user types
- Zero critical documents inaccessible to those who need them

---

### Scope (intentionally loose)

*What's included in this design task?*

**In scope**

- [ ]  5-tier trust framework (Owner → Viewer) applicable to all user types
- [ ]  Role-aware defaults: Family, Professional (Advisor, Attorney, CPA), Extended (Adding other role types)
- [ ]  Advisor-specific permissions for client household access
- [ ]  Permission inheritance with override capability
- [ ]  AI-inferrable structure for smart suggestions

**Out of scope**

- [ ]  TBD

---

### Constraints / Known Risks

*Technical limitations, timeline, dependencies, or business constraints.*

- Advisors need elevated capabilities without compromising client control
- Client must be able to modify/revoke advisor access post-handover
- Consumer version must hide complexity (fewer options, smarter defaults)
- Must support household co-ownership (spouses as equal owners)
- Regulatory considerations for advisor access to client financial data

---

### Non-goals

*What goals aren’t part of this feature (E.g., not handling alerts)?* 

- [ ]  [ ]
- [ ]  [ ]

---

### Open Questions

*Blockers, stakeholder questions, or items to resolve.*

- [ ]  Think through trust levels and who that aligns to invites being sent
- [ ]  How many invites can be sent by an organizer? or other type of role
- [ ]  We should restrict the amount if members to a household per subscription tier
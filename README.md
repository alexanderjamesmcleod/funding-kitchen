# FundingKitchen

**AI-powered funding application service for NZ organizations**

> "90% of something is better than 100% of nothing"

## The Business Model

1. Organizations come to us with their funding needs
2. We match them with relevant funders from our database
3. AI generates complete, compelling applications
4. They submit and (if successful) pay us an admin fee

## What We've Built

### 1. Funder Database (RAG-powered)
- 30+ NZ funding opportunities ingested
- Semantic search for smart matching
- Detailed funder requirements stored

**Location:** `/docs/funders/`
- `funders.json` - Basic funder list
- `funding-detailed-sample.json` - Rich funder profiles with requirements

### 2. Organization Profile Schema
Captures everything needed to generate applications:

| Section | What It Captures | Why It Matters |
|---------|------------------|----------------|
| Organization | Name, type, region, size | Eligibility matching |
| Legal | Charities #, constitution | Compliance verification |
| Mission | Purpose, activities, impact | Narrative generation |
| Financials | Revenue, accounts | Financial credibility |
| Affiliations | Regional/national bodies | Required by many funders |
| Current Request | What they need, quotes | Application specifics |
| Documents | All supporting docs | Application attachments |

**Location:** `/projects/funding-kitchen/schemas/`
- `org-profile-schema.json` - Full JSON schema
- `sample-org-profile.json` - Example completed profile

### 3. Funder Matching Engine
Semantic matching between org profile and funder database.

```bash
# Match an org to funders
python3 src/rag/match-funders.py "sports club Taranaki equipment funding"
```

## How It All Connects

```
┌─────────────────────────────────────────────────────────────┐
│                    CLIENT JOURNEY                           │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  1. INTAKE                                                  │
│     └─> Client fills org profile (web form)                │
│     └─> Uploads documents (constitution, accounts, etc)     │
│                                                             │
│  2. MATCHING                                                │
│     └─> AI searches funder database                        │
│     └─> Returns ranked matches with eligibility scores      │
│     └─> Client selects which funders to apply to           │
│                                                             │
│  3. APPLICATION GENERATION                                  │
│     └─> AI parses funder's application form                │
│     └─> Maps org profile data to form fields               │
│     └─> Generates compelling narratives                     │
│     └─> Produces complete draft application                 │
│                                                             │
│  4. REVIEW & SUBMIT                                         │
│     └─> Client reviews and approves                        │
│     └─> Application submitted to funder                     │
│     └─> Outcome tracked in system                          │
│                                                             │
│  5. PAYMENT (on success)                                    │
│     └─> Admin fee charged on successful grants             │
│     └─> Application added to patterns database              │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## Profile → Funder Requirement Mapping

Here's how our org profile schema maps to actual funder requirements:

### Pub Charity Requirements:
| Requirement | Our Profile Field |
|-------------|-------------------|
| Bank deposit slip in org's name | `bank_details.account_name` |
| Resolution to apply | Generated from `contact` |
| At least two quotes | `current_funding_request.quotes` |
| Proof of non-profit status | `legal.charities_number` |
| Financial accounts | `documents.financial_accounts` |
| Affiliation evidence | `affiliations` + `documents.affiliation_evidence` |

### Common Requirements Across Funders:
| Common Need | Our Profile Field |
|-------------|-------------------|
| Legal name | `organization.name` |
| Charity number | `legal.charities_number` |
| Contact details | `contact.*` |
| Region/location | `organization.region`, `organization.districts` |
| What you do | `mission.purpose`, `mission.activities` |
| Who you serve | `mission.target_population` |
| Impact achieved | `mission.impact_statement` |
| Financial health | `financials.*` |
| What funding is for | `current_funding_request.*` |
| Supporting documents | `documents.*` |

## Next Steps

### Immediate
- [ ] Build web intake form for org profiles
- [ ] Add more funders to database (target: 200+)
- [ ] Build PDF/Word application form parser

### Soon
- [ ] Application narrative generator
- [ ] Client portal with dashboard
- [ ] Outcome tracking and analytics

### Later
- [ ] Proactive opportunity finder agents
- [ ] Success pattern learning
- [ ] Multi-application batch submission

## Tech Stack

- **Database:** ChromaDB (vector search)
- **Embeddings:** sentence-transformers (all-MiniLM-L6-v2)
- **Backend:** Node.js (AI Kitchen framework)
- **AI:** Claude for narrative generation
- **Frontend:** React (to be built)

## Files

```
projects/funding-kitchen/
├── README.md                      # This file
├── schemas/
│   ├── org-profile-schema.json    # Organization profile JSON schema
│   └── sample-org-profile.json    # Example completed profile
└── (more to come)

docs/funders/
├── funders.json                   # Basic funder database
└── funding-detailed-sample.json   # Rich funder profiles

src/rag/
├── ingest-funders.py             # Ingest funders into RAG
└── match-funders.py              # Match orgs to funders
```

---

*FundingKitchen - Cooking up successful applications*

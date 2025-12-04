# FundingKitchen

**AI-powered funding application service for NZ organizations**

> "90% of something is better than 100% of nothing"

## The Business Model

1. Organizations come to us with their funding needs
2. We match them with relevant funders from our database
3. AI generates complete, compelling applications
4. They submit and (if successful) pay us an admin fee

## What We've Built

### 1. React Frontend (Complete!)
A 5-step intake wizard that guides organizations through:
- **Organization** - Name, type, region, legal details, contacts
- **Mission & Impact** - Purpose, activities, target population, categories
- **Financials** - Revenue, expenses, reserves, funding sources
- **Funding Request** - Project details, amount needed, timeline
- **Review & Match** - Profile review and funder matching

**Features:**
- Demo mode for testing (click "Load Demo Data & Skip to Matching")
- Click any step to jump directly
- Real-time funder matching via AI Kitchen RAG

### 2. Funder Database (RAG-powered)
- **47 unique NZ funding opportunities** ingested into ChromaDB
- Semantic search for intelligent matching
- Rich metadata: fund names, funder names, regions, amounts, deadlines, categories

**Data Location:** `/docs/funders/funders.json`

### 3. Funder Matching Engine
Semantic matching between org profile and funder database using:
- Sentence-transformers embeddings (all-MiniLM-L6-v2)
- ChromaDB vector search
- AI Kitchen RAG API integration

### 4. Organization Profile Schema
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

**Location:** `/schemas/org-profile-schema.json`

## How It All Connects

```
┌─────────────────────────────────────────────────────────────┐
│                    CLIENT JOURNEY                           │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  1. INTAKE (React Wizard)                                   │
│     └─> Client fills org profile via web form              │
│     └─> 5-step wizard guides through all sections          │
│                                                             │
│  2. MATCHING (AI Kitchen RAG)                               │
│     └─> Profile sent to AI Kitchen API                     │
│     └─> Semantic search against 47 funders                 │
│     └─> Returns ranked matches with relevance scores       │
│                                                             │
│  3. APPLICATION GENERATION (Coming Soon)                    │
│     └─> AI parses funder's application form                │
│     └─> Maps org profile data to form fields               │
│     └─> Generates compelling narratives                    │
│                                                             │
│  4. REVIEW & SUBMIT                                         │
│     └─> Client reviews and approves                        │
│     └─> Application submitted to funder                    │
│                                                             │
│  5. PAYMENT (on success)                                    │
│     └─> Admin fee charged on successful grants             │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## Running the Application

### Prerequisites
- Node.js 18+
- AI Kitchen backend running on port 8081

### Start the Frontend
```bash
cd src/frontend
npm install
npm run dev
```

The frontend runs on `http://localhost:3000`

### Demo Mode
Click **"Load Demo Data & Skip to Matching"** to test with sample data:
- **Demo Org:** Taranaki Youth Rugby Trust
- **Request:** $45,000 for equipment upgrade and clubroom improvements
- Instantly see matching funders ranked by relevance

## Architecture

FundingKitchen is a **satellite project** that connects to AI Kitchen:

```
┌─────────────────────┐         ┌─────────────────────┐
│   FundingKitchen    │  HTTP   │     AI Kitchen      │
│   (React Frontend)  │ ──────> │   (Platform API)    │
│   Port: 3000        │         │   Port: 8081        │
└─────────────────────┘         └─────────────────────┘
                                         │
                                         ▼
                                ┌─────────────────────┐
                                │     ChromaDB        │
                                │  (Vector Database)  │
                                │  47 NZ Funders      │
                                └─────────────────────┘
```

## Tech Stack

- **Frontend:** React 18 + Vite
- **Styling:** Custom CSS (warm orange/green theme)
- **Backend:** AI Kitchen API (Node.js/Express)
- **Database:** ChromaDB (vector search)
- **Embeddings:** sentence-transformers (all-MiniLM-L6-v2)
- **AI:** Claude (for future application generation)

## Project Structure

```
projects/funding-kitchen/
├── README.md                          # This file
├── schemas/
│   └── org-profile-schema.json        # Organization profile JSON schema
├── src/
│   ├── frontend/                      # React application
│   │   ├── src/
│   │   │   ├── components/
│   │   │   │   ├── IntakeWizard.jsx   # Main wizard component
│   │   │   │   ├── IntakeWizard.css   # Wizard styles
│   │   │   │   ├── FunderMatches.jsx  # Matching results display
│   │   │   │   └── steps/             # Individual step components
│   │   │   │       ├── StepOrganization.jsx
│   │   │   │       ├── StepMission.jsx
│   │   │   │       ├── StepFinancials.jsx
│   │   │   │       ├── StepFundingRequest.jsx
│   │   │   │       └── StepReview.jsx
│   │   │   └── services/
│   │   │       └── ai-kitchen.js      # AI Kitchen API client
│   │   ├── package.json
│   │   └── vite.config.js
│   └── backend/                       # (Future: dedicated backend)
├── docs/
│   └── architecture.md                # Architecture notes
└── tests/                             # (Future: test files)

# Related files in AI Kitchen:
docs/funders/
├── funders.json                       # 47 NZ funding opportunities

src/rag/
├── ingest-funders.py                  # Ingest funders into ChromaDB
├── match-funders.py                   # CLI matching tool
└── search.py                          # RAG search (returns metadata)
```

## Next Steps

### Immediate
- [x] Build web intake form for org profiles
- [x] Funder matching with relevance scores
- [x] Demo mode for testing
- [ ] Add more funders to database (target: 200+)
- [ ] Application generation for selected funders

### Soon
- [ ] Document upload handling
- [ ] Client accounts and saved profiles
- [ ] PDF/Word application form parser
- [ ] Application narrative generator

### Later
- [ ] Client portal with dashboard
- [ ] Outcome tracking and analytics
- [ ] Proactive opportunity finder agents
- [ ] Success pattern learning

---

*FundingKitchen - Cooking up successful applications*

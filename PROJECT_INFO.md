# Skill Gap Tracker - Project Overview
**Capstone Project — Coding Camp 2026 — CC26-PS088**

Platform untuk menganalisis skill gap dan generate personalized learning roadmap menggunakan AI.

## 🚀 Quick Start

**📖 Mulai di sini:** [README.md](README.md)  
**📖 Panduan Lengkap:** [GETTING_STARTED.md](GETTING_STARTED.md)

### Backend Setup (5 menit)
```bash
cd backend
npm install
cp .env.example .env
# Edit .env dengan Supabase & Gemini credentials
# Run schema.sql di Supabase SQL Editor
npm run setup-complete
npm run dev
```

### Frontend Setup (3 menit)
```bash
cd frontend
npm install
cp .env.example .env.local
# Edit .env.local dengan Supabase credentials
npm run dev
```

**Backend:** `http://localhost:5000`  
**Frontend:** `http://localhost:3000`

**📖 Panduan detail:** [GETTING_STARTED.md](GETTING_STARTED.md)

---

## 📁 Project Structure

```
backend/
├── src/
│   │   ├── index.js              # Express server
│   │   ├── routes/               # API endpoints
│   │   │   ├── analysis.js       # Gap analysis
│   │   │   ├── roadmap.js        # AI roadmap generator
│   │   │   ├── roles.js          # Job roles API
│   │   │   ├── skills.js         # Skills API
│   │   │   └── roadmapProgress.js # Progress tracking
│   │   ├── services/             # Business logic
│   │   │   ├── supabaseClient.js # Database client
│   │   │   ├── geminiService.js  # AI service
│   │   │   ├── gapAnalysis.js    # Gap calculation
│   │   │   └── vectorSearch.js   # Semantic search
│   │   ├── middleware/           # Auth & error handling
│   │   └── scripts/              # Database utilities
│   ├── .env                      # Environment variables
│   └── package.json
├── database/
│   ├── schema.sql                # Database schema
│   └── README.md                 # Database docs
├── dataset_baru/                 # Master dataset (source of truth)
│   ├── job_roles.json            # 138 job roles
│   ├── skills.json               # 393 skills
│   ├── job_role_skills.json      # 1000 mappings
│   ├── resources.json            # 482 resources
│   └── README.md
├── API_DOCUMENTATION.md          # API reference
├── SETUP_GUIDE.md                # Setup instructions
└── README.md                     # This file
```

---

## ✨ Features

- **Gap Analysis** - Analisis skill gap berdasarkan target role
- **AI Roadmap Generator** - Generate personalized learning roadmap dengan Gemini AI
- **Progress Tracking** - Track learning progress per fase roadmap
- **Rich Resources** - 482 curated learning resources
- **138 Job Roles** - Front-End, Back-End, Data Science, DevOps, Security, Mobile, dll
- **393 Skills** - Programming languages, frameworks, tools, soft skills

---

## 🛠️ Tech Stack

- **Runtime:** Node.js 20+
- **Framework:** Express.js
- **Database:** Supabase (PostgreSQL + Auth + RLS)
- **AI:** Google Gemini AI (text-generation & embeddings)
- **Vector Search:** pgvector for semantic search

---

## 📊 Database Statistics

Setelah setup berhasil:
- **138** Job Roles
- **393** Skills
- **1,000** Role-Skill Mappings
- **482** Learning Resources

---

## 🔧 NPM Commands

### Development
```bash
npm run dev              # Start server dengan hot reload
npm start                # Start server production mode
```

### Database Setup
```bash
npm run setup-complete   # Full database setup (seed all data)
npm run seed:master      # Seed roles & skills only
npm run seed:role-skills # Seed role-skill mappings only
npm run seed:resources   # Seed learning resources only
```

### Database Utilities
```bash
npm run check:stats      # Show database statistics
npm run check:db         # Check database connection
npm run export:dataset   # Export database → dataset_baru/
npm run validate:dataset # Validate dataset consistency
```

---

## 📝 API Endpoints

### Public Endpoints
```
GET  /api/roles                    # List all job roles
GET  /api/roles/:id                # Get specific role
GET  /api/roles/:id/skills         # Get skills for role
GET  /api/roles/search?q=frontend  # Search roles

GET  /api/skills                   # List all skills
GET  /api/skills?category=programming  # Filter by category
GET  /api/skills/:id               # Get specific skill
GET  /api/skills/:id/resources     # Get resources for skill
GET  /api/skills/search?q=react    # Search skills
```

### Protected Endpoints (require auth)
```
GET    /api/analysis               # Get skill gap analysis
POST   /api/roadmap/generate       # Generate AI roadmap
GET    /api/roadmap                # Get latest roadmap
PATCH  /api/roadmap/:id/status     # Update roadmap status

GET    /api/roadmap-progress/:roadmapId  # Get phase progress
POST   /api/roadmap-progress             # Update phase status
DELETE /api/roadmap-progress/:roadmapId  # Clear progress
```

**📖 Full API docs:** [API_DOCUMENTATION.md](API_DOCUMENTATION.md)

---

## 🎯 How It Works

1. **User sets target role** (e.g., "Back-End Developer")
2. **User adds current skills** (e.g., JavaScript, Git)
3. **System calculates gap:**
   - Required skills: SQL, REST API, Node.js, Docker
   - User's skills: JavaScript, Git
   - Gap: SQL, REST API, Node.js, Docker
4. **AI generates roadmap:**
   - Phase 1: Learn SQL & REST API basics (2-3 weeks)
   - Phase 2: Master Node.js & Express (3-4 weeks)
   - Phase 3: Learn Docker & deployment (2 weeks)
   - Each phase includes curated learning resources
5. **User tracks progress:**
   - Mark phases as "berjalan" or "selesai"
   - Progress saved to database

---

## 🔐 Environment Variables

```env
# Supabase (required)
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Gemini AI (required for roadmap generation)
GEMINI_API_KEY=your_gemini_api_key

# Server (optional)
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

---

## 📖 Documentation

- **[README.md](README.md)** - Start here guide
- **[GETTING_STARTED.md](GETTING_STARTED.md)** - Panduan lengkap setup
- **[API_DOCUMENTATION.md](API_DOCUMENTATION.md)** - API reference lengkap
- **[database/README.md](database/README.md)** - Database schema & setup
- **[dataset_baru/README.md](dataset_baru/README.md)** - Dataset documentation
- **[Spec.md](Spec.md)** - Project specification

---

## 🚀 Deployment

### Backend (Vercel/Railway/Render)
1. Set environment variables
2. Deploy dengan `npm start`
3. Pastikan PORT sesuai dengan platform

### Database (Supabase)
1. Create Supabase project
2. Run `database/schema.sql` di SQL Editor
3. Run `npm run setup-complete` untuk seed data
4. RLS policies sudah enabled otomatis

---

## 🐛 Troubleshooting

### Error: "relation does not exist"
**Solusi:** Run `database/schema.sql` di Supabase SQL Editor

### Error: "No roles found"
**Solusi:** Run `npm run setup-complete` untuk seed data

### Error: "Invalid API key"
**Solusi:** Cek `.env`, pastikan credentials benar

### Data tidak lengkap
**Solusi:** 
1. Cek `dataset_baru/` ada dan lengkap
2. Run `npm run check:stats` untuk verifikasi
3. Run `npm run setup-complete` lagi jika perlu

---

## 👥 Team

Capstone Project CC26-PS088 - Coding Camp 2026

| Nama | Role |
|------|------|
| Pasha Raditya Putra | Frontend |
| Neezar Abdurrahman Ahnaf Abiyyi | Backend |
| Zaky Mubarok | Frontend |
| Dhanis Fathan Gunawan | Project Manager & Frontend |
| Muhammad Raihan | Backend |

---

## 📄 License

MIT License - feel free to use for learning and projects.

---

**Need help?** Check [README.md](README.md) atau [GETTING_STARTED.md](GETTING_STARTED.md).

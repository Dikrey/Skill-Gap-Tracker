# 🚀 Getting Started - Skill Gap Tracker

Panduan lengkap setup Backend + Frontend dari NOL sampai RUNNING.

**⏱️ Total waktu: ~15 menit**

---

## 📋 Prerequisites

Pastikan sudah terinstall:
- ✅ Node.js v18+ ([Download](https://nodejs.org/))
- ✅ Git ([Download](https://git-scm.com/))
- ✅ Text Editor (VS Code recommended)

Buat akun gratis di:
- ✅ [Supabase](https://supabase.com) - Database & Authentication
- ✅ [Google AI Studio](https://makersuite.google.com/) - Gemini API

---

## 🎯 Quick Overview

```
Project Structure:
├── backend/                      # Backend API (Express.js)
└── frontend/                     # Frontend (Next.js)
```

**Backend:** Express.js API running on port 5000  
**Frontend:** Next.js app running on port 3000  
**Database:** Supabase (PostgreSQL)

**⚠️ PENTING:** Frontend (GapS) dan Backend (Skill-Gap-Tracker) adalah folder TERPISAH di level yang sama!

---

## 📦 PART 1: Setup Backend

### Step 1: Install Backend Dependencies

```bash
cd backend
npm install
```

### Step 2: Setup Supabase Project

#### 2.1 Buat Project Baru
1. Buka [supabase.com](https://supabase.com) dan login
2. Klik **"New Project"**
3. Isi form:
   - **Name**: `skill-gap-tracker`
   - **Database Password**: Buat password kuat (SIMPAN!)
   - **Region**: Southeast Asia (Singapore)
4. Klik **"Create new project"**
5. Tunggu ~2 menit

#### 2.2 Dapatkan API Credentials
1. Di Supabase Dashboard → **Settings** → **API**
2. Copy 2 credentials:
   - **Project URL**: `https://xxxxx.supabase.co`
   - **service_role key**: Klik "Reveal" → Copy

⚠️ **PENTING:** `service_role` key adalah SECRET, jangan share!

### Step 3: Setup Gemini API

1. Buka [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Login dengan Google
3. Klik **"Create API Key"**
4. Copy API key

### Step 4: Configure Backend Environment

```bash
# Di folder backend
cp .env.example .env
```

Edit `.env` dengan text editor:

```env
# Supabase Configuration
SUPABASE_URL=https://xxxxx.supabase.co          # Ganti dengan Project URL
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc...            # Ganti dengan service_role key

# Gemini AI Configuration
GEMINI_API_KEY=AIzaSy...                        # Ganti dengan Gemini API key

# Server Configuration
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

### Step 5: Setup Database Schema

**⚠️ WAJIB dilakukan manual di Supabase Dashboard:**

1. Buka file `database/schema.sql` dengan text editor
2. Copy **SELURUH ISI FILE** (Ctrl+A → Ctrl+C)
3. Buka Supabase Dashboard → **SQL Editor**
4. Klik **"New query"**
5. Paste isi file
6. Klik **"Run"** (atau Ctrl+Enter)
7. Tunggu sampai **"Success. No rows returned"**

**✅ Verifikasi:**
- Buka **Table Editor** di Supabase
- Pastikan ada 10 tables: `job_roles`, `skills`, `job_role_skills`, `job_requirements`, `profiles`, `user_skills`, `user_progress`, `roadmaps`, `skill_resources`, `roadmap_phase_progress`

### Step 6: Seed Database

```bash
npm run setup-complete
```

Tunggu 1-2 menit. Output yang diharapkan:

```
✅ Master Data (Roles & Skills) completed
✅ Role-Skill Mappings completed
✅ Learning Resources completed

📊 DATABASE STATISTICS:
Job Roles:           138 roles
Skills:              393 skills
Role-Skill Mappings: 1000 mappings
Learning Resources:  482 resources

✅ SETUP COMPLETE - DATABASE READY!
```

### Step 7: Start Backend Server

```bash
npm run dev
```

Backend running di: `http://localhost:5000`

**✅ Test Backend:**

```bash
# Health check
curl http://localhost:5000/

# Get roles
curl http://localhost:5000/api/roles
```

**Jangan tutup terminal ini!** Backend harus tetap running.

---

## 🎨 PART 2: Setup Frontend

### Step 1: Install Frontend Dependencies

**Buka terminal BARU**, jangan tutup terminal backend:

```bash
# Keluar dari folder backend dulu
cd ..

# Masuk ke folder frontend
cd frontend

# Install dependencies
npm install
```

**⚠️ Path yang benar:**
```
project-root/
├── backend/                   # Backend folder
└── frontend/                  # Frontend folder
```

### Step 2: Configure Frontend Environment

```bash
cp .env.example .env.local
```

Edit `.env.local`:

```env
# Supabase Configuration (SAMA dengan backend)
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...

# Backend API URL
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

**Cara dapat ANON KEY:**
1. Buka Supabase Dashboard → **Settings** → **API**
2. Copy **anon public** key (bukan service_role!)

### Step 3: Setup Google OAuth (Optional)

Jika ingin fitur "Login with Google":

1. Buka Supabase Dashboard → **Authentication** → **Providers**
2. Enable **Google**
3. Ikuti instruksi untuk setup Google OAuth
4. Masukkan Client ID & Client Secret

**Skip step ini jika hanya ingin test dengan email/password.**

### Step 4: Start Frontend Server

```bash
npm run dev
```

Frontend running di: `http://localhost:3000`

**✅ Buka browser:** `http://localhost:3000`

---

## 🎉 Selesai! Aplikasi Sudah Running

Sekarang Anda punya:
- ✅ Backend API di `http://localhost:5000`
- ✅ Frontend di `http://localhost:3000`
- ✅ Database Supabase dengan 138 roles, 393 skills, 1000 mappings, 482 resources

---

## 🧪 Testing Aplikasi

### 1. Register User Baru
1. Buka `http://localhost:3000`
2. Klik **"Register"**
3. Isi form dan submit
4. Cek email untuk verifikasi (jika email confirmation enabled)

### 2. Login
1. Klik **"Login"**
2. Masukkan email & password
3. Akan redirect ke Dashboard

### 3. Test Fitur Utama

#### Onboarding (Set Target Role)
1. Setelah login pertama kali, akan muncul onboarding
2. Pilih posisi saat ini
3. Pilih target role (misal: "Back-End Developer")
4. Pilih skills yang sudah dikuasai
5. Submit

#### Dashboard
- Lihat readiness score
- Lihat skill gap analysis
- Lihat mastered skills vs gap skills

#### Analytics
- Lihat detail gap analysis
- Generate roadmap dengan AI
- Lihat rekomendasi learning path

#### Roadmap
- Lihat roadmap yang sudah di-generate
- Track progress per fase
- Mark fase sebagai "berjalan" atau "selesai"
- Lihat learning resources per fase

#### Profile
- Update profile information
- Change password
- Update current position & skills

---

## 🔧 Development Commands

### Backend Commands

```bash
# Development
npm run dev              # Start dengan hot reload
npm start                # Start production mode

# Database
npm run setup-complete   # Full database setup
npm run seed:master      # Seed roles & skills only
npm run seed:role-skills # Seed mappings only
npm run seed:resources   # Seed resources only
npm run check:stats      # Show database statistics
npm run export:dataset   # Export database → dataset_baru/
```

### Frontend Commands

```bash
# Development
npm run dev              # Start development server
npm run build            # Build for production
npm start                # Start production server
npm run lint             # Run ESLint
```

---

## 🐛 Troubleshooting

### Backend Issues

#### ❌ Error: "Environment variables belum lengkap"
**Solusi:** Cek file `.env`, pastikan semua value sudah diisi (tidak ada `your_` atau `your-`)

#### ❌ Error: "Connection failed"
**Solusi:** 
- Cek `SUPABASE_URL` benar (harus `https://`)
- Cek `SUPABASE_SERVICE_ROLE_KEY` benar
- Pastikan internet connection aktif

#### ❌ Error: "Schema belum di-run"
**Solusi:** Run `database/schema.sql` di Supabase SQL Editor

#### ❌ Port 5000 already in use
**Solusi:** 
1. Edit backend `.env`: `PORT=5001`
2. Edit frontend `.env.local`: `NEXT_PUBLIC_API_URL=http://localhost:5001/api`
3. Restart kedua server

### Frontend Issues

#### ❌ Error: "Failed to fetch"
**Solusi:** 
- Pastikan backend running di `http://localhost:5000`
- Cek `NEXT_PUBLIC_API_URL` di `.env.local` benar

#### ❌ Error: "Invalid API key" (Supabase)
**Solusi:** 
- Cek `NEXT_PUBLIC_SUPABASE_URL` benar
- Cek `NEXT_PUBLIC_SUPABASE_ANON_KEY` benar (bukan service_role key!)

#### ❌ Login/Register tidak berfungsi
**Solusi:**
- Cek Supabase Dashboard → **Authentication** → **Email Auth** enabled
- Cek email confirmation settings
- Lihat browser console untuk error details

#### ❌ Port 3000 already in use
**Solusi:** 
```bash
# Kill process di port 3000
npx kill-port 3000

# Atau gunakan port lain
npm run dev -- -p 3001
```

---

## 📂 Project Structure

### Backend Structure

```
backend/
├── src/
│   │   ├── index.js              # Express server entry point
│   │   ├── routes/               # API endpoints
│   │   │   ├── analysis.js       # Gap analysis API
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
│   └── README.md
├── dataset_baru/                 # Master dataset
│   ├── job_roles.json            # 138 roles
│   ├── skills.json               # 393 skills
│   ├── job_role_skills.json      # 1000 mappings
│   └── resources.json            # 482 resources
└── README.md
```

### Frontend Structure

```
frontend/
├── app/
│   ├── (main)/                   # Protected routes
│   │   ├── dashboard/            # Dashboard page
│   │   ├── analytics/            # Analytics & roadmap generator
│   │   ├── roadmap/              # Roadmap tracking
│   │   └── profile/              # User profile
│   ├── onboarding/               # First-time setup
│   ├── signin/                   # Login page
│   ├── signup/                   # Register page
│   ├── lupa-kata-sandi/          # Forgot password
│   └── reset-kata-sandi/         # Reset password
├── components/                   # Reusable components
│   └── Loading.jsx               # Loading spinner
├── lib/
│   ├── supabase.js               # Supabase client
│   └── api.js                    # API functions
├── .env.local                    # Environment variables
└── package.json
```

---

## 🚀 Production Deployment

### Backend Deployment (Vercel/Railway/Render)

1. **Set Environment Variables:**
   ```
   SUPABASE_URL=xxx
   SUPABASE_SERVICE_ROLE_KEY=xxx
   GEMINI_API_KEY=xxx
   PORT=5000
   NODE_ENV=production
   FRONTEND_URL=https://your-frontend-domain.com
   ```

2. **Deploy:**
   - Vercel: `vercel deploy`
   - Railway: Connect GitHub repo
   - Render: Connect GitHub repo

3. **Update Frontend `.env.local`:**
   ```
   NEXT_PUBLIC_API_URL=https://your-backend-domain.com/api
   ```

### Frontend Deployment (Vercel)

1. **Set Environment Variables:**
   ```
   NEXT_PUBLIC_SUPABASE_URL=xxx
   NEXT_PUBLIC_SUPABASE_ANON_KEY=xxx
   NEXT_PUBLIC_API_URL=https://your-backend-domain.com/api
   ```

2. **Deploy:**
   ```bash
   npm run build
   vercel deploy --prod
   ```

3. **Update Supabase Redirect URLs:**
   - Supabase Dashboard → **Authentication** → **URL Configuration**
   - Add production URL: `https://your-domain.com`

---

## 📚 Additional Documentation

- **[README.md](README.md)** - Start here guide
- **[PROJECT_INFO.md](PROJECT_INFO.md)** - Project overview
- **[API_DOCUMENTATION.md](API_DOCUMENTATION.md)** - API reference
- **[database/README.md](database/README.md)** - Database documentation
- **[dataset_baru/README.md](dataset_baru/README.md)** - Dataset documentation

---

## 🆘 Need Help?

1. **Check logs:**
   - Backend: Terminal output dari `npm run dev`
   - Frontend: Browser console (F12)

2. **Verify setup:**
   ```bash
   # Backend
   npm run check:stats
   
   # Frontend
   curl http://localhost:3000
   ```

3. **Common issues:**
   - Port conflicts → Change port in `.env`
   - Database empty → Run `npm run setup-complete`
   - Auth issues → Check Supabase settings

4. **Still stuck?**
   - Read troubleshooting section above
   - Check Supabase logs
   - Review environment variables

---

## 🎓 Learning Resources

- [Supabase Docs](https://supabase.com/docs)
- [Next.js Docs](https://nextjs.org/docs)
- [Express.js Guide](https://expressjs.com/en/guide/routing.html)
- [Gemini API Docs](https://ai.google.dev/docs)

---

**🎉 Happy Coding!**

Jika ada pertanyaan atau menemukan bug, silakan buka issue di repository.

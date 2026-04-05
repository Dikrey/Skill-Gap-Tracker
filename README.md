# 👋 START HERE - Skill Gap Tracker

Selamat datang! Ini adalah panduan cepat untuk memulai project.

---

## 📚 Dokumentasi Tersedia

1. **[GETTING_STARTED.md](GETTING_STARTED.md)** ⭐ **MULAI DI SINI!**
   - Setup lengkap Backend + Frontend
   - Step-by-step dari NOL sampai RUNNING
   - Troubleshooting lengkap
   - **⏱️ 15 menit**

2. **[PROJECT_INFO.md](PROJECT_INFO.md)**
   - Overview project
   - Tech stack
   - Quick reference

3. **[API_DOCUMENTATION.md](API_DOCUMENTATION.md)**
   - API endpoints reference
   - Request/response examples
   - Authentication

4. **[database/README.md](database/README.md)**
   - Database schema
   - Table structure
   - SQL files guide

5. **[dataset_baru/README.md](dataset_baru/README.md)**
   - Dataset documentation
   - Data structure
   - How to update data

---

## 🚀 Quick Start (TL;DR)

### Backend (5 menit)
```bash
cd backend
npm install
cp .env.example .env
# Edit .env dengan Supabase & Gemini credentials
# Run database/schema.sql di Supabase SQL Editor
npm run setup-complete
npm run dev
```

### Frontend (3 menit)
```bash
cd frontend
npm install
cp .env.example .env.local
# Edit .env.local dengan Supabase credentials
npm run dev
```

**Backend:** http://localhost:5000  
**Frontend:** http://localhost:3000

---

## 📋 Prerequisites

- Node.js 18+
- Akun Supabase (gratis)
- Akun Google AI Studio (gratis)

---

## 🎯 Untuk Penguji/Reviewer

Jika Anda ingin test aplikasi dengan cepat:

1. **Baca:** [GETTING_STARTED.md](GETTING_STARTED.md)
2. **Setup:** Ikuti Part 1 (Backend) dan Part 2 (Frontend)
3. **Test:** Buka http://localhost:3000 dan coba fitur-fitur

**Total waktu:** ~15 menit

---

## 🆘 Butuh Bantuan?

1. Cek [GETTING_STARTED.md](GETTING_STARTED.md) - Section Troubleshooting
2. Cek terminal output untuk error messages
3. Cek browser console (F12) untuk frontend errors
4. Verifikasi environment variables sudah benar

---

## 📁 Struktur Project

```
.
├── backend/                      # Backend API
│   ├── src/                      # Source code
│   ├── database/                 # SQL files
│   ├── dataset_baru/             # Master data
│   └── package.json
│
├── frontend/                     # Frontend
│   ├── app/                      # Next.js pages
│   ├── components/               # React components
│   ├── lib/                      # Utilities
│   └── package.json
│
├── GETTING_STARTED.md            # ⭐ Panduan utama
├── README.md                     # Project overview
├── SETUP_GUIDE.md                # Detail setup
└── API_DOCUMENTATION.md          # API reference
```

---

## ✨ Fitur Utama

- **Gap Analysis** - Analisis skill gap otomatis
- **AI Roadmap** - Generate learning roadmap dengan Gemini AI
- **Progress Tracking** - Track learning progress per fase
- **138 Job Roles** - Front-End, Back-End, Data Science, dll
- **393 Skills** - Programming, tools, frameworks
- **482 Resources** - Curated learning materials

---

## 🎓 Tech Stack

**Backend:**
- Node.js + Express.js
- Supabase (PostgreSQL)
- Google Gemini AI

**Frontend:**
- Next.js 16 + React 19
- Tailwind CSS 4
- Supabase Auth

---

**🎉 Selamat mencoba!**

Jika ada pertanyaan, baca [GETTING_STARTED.md](GETTING_STARTED.md) terlebih dahulu.

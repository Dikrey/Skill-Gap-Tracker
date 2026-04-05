# 🚀 Quick Start - Skill Gap Tracker

Panduan ringkas untuk menjalankan project setelah clone.

---

## ⚡ Langkah Cepat (15 menit)

### 1️⃣ Setup Backend (7 menit)

```bash
# Masuk ke folder backend
cd backend

# Install dependencies
npm install

# Copy environment template
cp .env.example .env
```

**Edit file `.env`** dengan kredensial Anda:
```env
SUPABASE_URL=https://xxxxx.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
GEMINI_API_KEY=your_gemini_api_key
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

**Setup Database:**
1. Buka [Supabase Dashboard](https://supabase.com/dashboard) → SQL Editor
2. Copy seluruh isi file `database/schema.sql`
3. Paste dan klik **Run**
4. Tunggu sampai selesai

**Seed Data:**
```bash
npm run setup-complete
```

**Jalankan Backend:**
```bash
npm run dev
```

✅ Backend running di: `http://localhost:5000`

---

### 2️⃣ Setup Frontend (5 menit)

**Buka terminal baru:**

```bash
# Masuk ke folder frontend
cd frontend

# Install dependencies
npm install

# Copy environment template
cp .env.example .env.local
```

**Edit file `.env.local`:**
```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

**Jalankan Frontend:**
```bash
npm run dev
```

✅ Frontend running di: `http://localhost:3000`

---

## 📋 Kredensial yang Dibutuhkan

### Supabase (Gratis)
1. Buat akun di [supabase.com](https://supabase.com)
2. Buat project baru
3. Ambil kredensial di **Settings → API**:
   - `SUPABASE_URL` = Project URL
   - `SUPABASE_SERVICE_ROLE_KEY` = service_role key (untuk backend)
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = anon public key (untuk frontend)

### Google Gemini AI (Gratis)
1. Buka [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Login dengan Google
3. Klik **Create API Key**
4. Copy `GEMINI_API_KEY`

---

## ✅ Verifikasi Setup

### Test Backend:
```bash
curl http://localhost:5000/
curl http://localhost:5000/api/roles
```

### Test Frontend:
Buka browser: `http://localhost:3000`

---

## 🐛 Troubleshooting Cepat

### Backend tidak jalan:
- Cek `.env` sudah diisi semua
- Pastikan schema.sql sudah di-run di Supabase
- Cek port 5000 tidak dipakai aplikasi lain

### Frontend tidak connect:
- Pastikan backend sudah running
- Cek `NEXT_PUBLIC_API_URL` di `.env.local` benar
- Cek kredensial Supabase benar

### Database kosong:
```bash
cd backend
npm run setup-complete
```

---

## 📚 Dokumentasi Lengkap

- **[README.md](README.md)** - Start here guide
- **[GETTING_STARTED.md](GETTING_STARTED.md)** - Panduan lengkap step-by-step
- **[PROJECT_INFO.md](PROJECT_INFO.md)** - Overview project
- **[API_DOCUMENTATION.md](API_DOCUMENTATION.md)** - API reference

---

## 🎯 Struktur Project

```
project-root/
├── backend/              # Express.js API
│   ├── src/             # Source code
│   ├── database/        # SQL schema
│   ├── dataset_baru/    # Master data
│   └── .env             # Backend config
│
├── frontend/            # Next.js app
│   ├── app/            # Pages
│   ├── components/     # Components
│   └── .env.local      # Frontend config
│
└── QUICK_START.md      # File ini
```

---

**🎉 Selesai! Aplikasi siap digunakan.**

Untuk panduan lengkap, baca [GETTING_STARTED.md](GETTING_STARTED.md)

# Skill Gap Tracker

Skill Gap Tracker adalah aplikasi analitik dan manajemen karir yang dirancang untuk membantu pengguna mengukur kesenjangan keterampilan (skill gap) mereka terhadap target peran pekerjaan tertentu. Melalui integrasi dengan kecerdasan buatan (Google Gemini AI), aplikasi ini membandingkan keahlian pengguna dengan tren industri standar berdasarkan database internal, lalu menghasilkan peta jalan pembelajaran (learning roadmap) yang dipersonalisasi. 

Fitur utama aplikasi ini meliputi:
- Analisis kesenjangan keterampilan (Skill Gap Analysis) secara otomatis.
- Pembuatan rekomendasi roadmap belajar bertahap menggunakan bantuan algoritma AI.
- Pelacakan progres perkembangan keterampilan per fase.
- Modul data lengkap yang mencakup 138 peran pekerjaan, 393 kategori keterampilan, dan 482 pilihan materi belajar/sumber daya (resources).

Proyek ini dibangun menggunakan arsitektur terpisah (Client-Server), di mana Node.js dan Express.js bertugas menangani logika API sisi peladen (Backend), PostgreSQL via Supabase berperan sebagai penyimpanan basis data relasional, dan Next.js dengan React bertugas sebagai wadah antarmuka pengguna (Frontend).

---

## Panduan Instalasi dan Penggunaan (Setup)

Pastikan sistem perangkat Anda telah memenuhi prasyarat awal berikut sebelum instalasi:
- Node.js versi 18 atau versi LTS yang lebih baru.
- Akun Supabase yang aktif untuk mengelola basis data di awan.
- Akun Google AI Studio yang valid untuk mendapatkan integrasi kredensial Gemini API.

Aplikasi ini mengharuskan Anda untuk menjalankan modul Backend dan Frontend secara bersamaan. Ikuti instruksi di bawah ini dengan berurutan.

### 1. Menjalankan Server Backend

Server backend berfungsi menjembatani database dan mengeksekusi operasi AI.
1. Buka terminal atau konsol command line Anda.
2. Pindah ke dalam direktori backend proyek:
   ```bash
   cd backend
   ```
3. Pasang semua paket dependensi yang dibutuhkan:
   ```bash
   npm install
   ```
4. Gandakan file contoh konfigurasi menjadi konfigurasi aktif:
   ```bash
   cp .env.example .env
   ```
5. Buka dan edit file `.env` yang baru saja dibuat. Lengkapi variabel berikut ini dengan kredensial Anda:
   - `SUPABASE_URL`: Tautan utama proyek dari menu pengaturan API di dasbor Supabase.
   - `SUPABASE_SERVICE_ROLE_KEY`: Kunci rahasia untuk akses admin (service_role secret) dari dasbor Supabase Anda.
   - `GEMINI_API_KEY`: Kunci akses API aktif dari akun Google AI Studio Anda.
6. Masuk ke halaman dasbor organisasi Supabase Anda dan buka opsi SQL Editor. Lakukan eksekusi query SQL dengan menempelkan isi file struktur tabel dari direktori `database` (contohnya `schema.sql`) untuk menginisialisasi skema basis data di instance awan.
7. Jalankan perintah baris konfigurasi awal jika ada data referensi khusus yang harus dimasukkan:
   ```bash
   npm run setup-complete
   ```
8. Jalankan servis backend ke mode pengembangan lokal:
   ```bash
   npm run dev
   ```
   (Server API seharusnya sekarang beroperasi di URL referensi: http://localhost:5000)

### 2. Menjalankan Aplikasi Frontend

Aplikasi frontend berfungsi sebagai tatap muka antar-pengguna untuk melakukan transaksi data dengan server backend. Tolong buka tab terminal / jendela baris perintah baru untuk langkah ini.
1. Pindah ke dalam direktori frontend proyek:
   ```bash
   cd frontend
   ```
2. Instal pustaka paket berbasis React/Next.js:
   ```bash
   npm install
   ```
3. Gandakan file contoh konfigurasi lingkungan untuk antarmuka web:
   ```bash
   cp .env.example .env.local
   ```
4. Buka dan konfigurasikan file `.env.local` tersebut:
   - Tambahkan `NEXT_PUBLIC_SUPABASE_URL` dan `NEXT_PUBLIC_SUPABASE_ANON_KEY` dengan kredensial anonim bersangkutan dari pengaturan bawaan Supabase Anda.
5. Nyalakan layanan aplikasi web frontend untuk tahap pengembangan lokal:
   ```bash
   npm run dev
   ```

Jika telah berhasil tereksekusi tanpa gagal (error), Anda dapat mulai menggunakan layanan Skill Gap Tracker dengan membuka http://localhost:3000 pada aplikasi peramban (browser) web yang Anda gunakan.

---

## Struktur Proyek (Project Structure)

```text
.
├── backend/                      # Logika server API (Express.js)
│   └── src/                      # Kode sumber utama aplikasi backend
├── database/                     # Skrip formasi SQL untuk basis data
├── dataset_baru/                 # Master referensi data (JSON/CSV)
└── frontend/                     # Antarmuka web pengguna (Next.js)
    ├── app/                      # Rute halaman (App Router)
    ├── components/               # Komponen visual (React)
    ├── context/                  # Manajemen state global (React Context)
    └── lib/                      # Fungsi utilitas dan konfigurasi pendukung
```

---

## Teknologi yang Digunakan (Tech Stack)

**Backend:**
- Node.js & Express.js: Kerangka kerja utama untuk membangun server API.
- Supabase (PostgreSQL): Layanan basis data (relasional) di awan.
- Google Gemini AI: Kecerdasan buatan untuk proses analisis dan pembuatan pemetaan jalan (roadmap).

**Frontend:**
- Next.js & React: Kerangka kerja tatap muka pengguna dan manajemen komponen dinamis.
- Tailwind CSS: Pustaka penggayaan (styling) tampilan eksterior antarmuka.
- Supabase Auth: Modul penanganan otentikasi dan sesi pengguna yang aman.

---

## Tim Kami

**Tim ID: CC26-PS088**

| Nama | ID Cohort |
| :--- | :--- |
| Pasha Raditya Putra | CFS216D6Y067 |
| Neezar Abdurrahman Ahnaf Abiyyi | CFS054D6Y012 |
| Zaky Mubarok | CFS202D6Y038 |
| Dhanis Fathan Gunawan | CFS202D6Y039 |
| Muhammad Raihan | CFS122D6Y041 |


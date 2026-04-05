# Skill Gap Tracker
Capstone Project — Coding Camp 2026 — CC26-PS088

---

## Deskripsi Proyek

Skill Gap Tracker adalah aplikasi web yang membantu individu mengetahui skill apa yang harus dipelajari untuk mencapai posisi karir yang diinginkan. Sistem menganalisis perbedaan antara skill yang dimiliki user dengan kebutuhan pasar kerja aktual, lalu menghasilkan roadmap belajar yang personal dan terstruktur.

---

## Masalah yang Diselesaikan

Banyak individu yang ingin memulai atau mengembangkan karier di bidang tertentu, namun tidak tahu secara spesifik skill apa yang kurang dari profil mereka dibandingkan kebutuhan pasar kerja aktual. Informasi tersebar di berbagai platform dan tidak terstruktur, sehingga proses pengembangan karier menjadi tidak efisien dan tidak terarah.

---

## Target Pengguna

- Pekerja kantoran yang ingin naik jabatan
- Fresh graduate yang ingin masuk ke bidang tertentu
- Career switcher yang ingin pindah ke bidang baru

---

## Fitur Utama

1. Register dan Login — autentikasi user menggunakan Supabase Auth
2. Input Profil Karir — user isi posisi sekarang, skill yang dimiliki, dan posisi yang dituju
3. Analisis Gap Skill — sistem bandingkan skill user dengan dataset job description
4. Readiness Score — persentase kesiapan user terhadap posisi target
5. Generate Roadmap — AI buat roadmap belajar berdasarkan gap yang ditemukan, lengkap dengan rekomendasi resource gratis
6. Progress Tracker — user centang skill yang sudah dipelajari, readiness score otomatis update
7. Dashboard — visualisasi progress karir user

---

## Alur Aplikasi

1. User register dan login
2. User input posisi sekarang, skill yang dimiliki, dan posisi target
3. Sistem analisis gap berdasarkan dataset job description
4. Sistem tampilkan gap skill dan readiness score
5. AI generate roadmap belajar dan rekomendasi resource
6. User tracking progress pembelajaran
7. Readiness score update otomatis setiap progress bertambah

---

## Tech Stack

- Frontend: Next.js + Tailwind CSS
- Backend: Express.js
- Database & Auth: Supabase
- AI: Gemini API

---

## Sumber Data

Dataset skill dan job description dikurasi manual oleh tim dari Glints, Jobstreet, dan LinkedIn. Data mencakup role seperti Frontend Developer, Backend Developer, Data Analyst, UI/UX Designer, dan Digital Marketing.

---

## Struktur Repo (Monorepo)

```
Skill-Gap-Tracker/
├── frontend/   (Next.js + Tailwind CSS)
├── backend/    (Express.js)
└── README.md
```

---

## Tim

| Nama | Peran |
|---|---|
| Pasha Raditya Putra | Frontend |
| Neezar Abdurrahman Ahnaf Abiyyi | Backend |
| Zaky Mubarok | Frontend |
| Dhanis Fathan Gunawan | Project Manager & Frontend |
| Muhammad Raihan | Backend |
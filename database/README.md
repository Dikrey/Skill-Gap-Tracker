# Database Setup Files

## Files Overview

### 1. `schema.sql` - Main Database Schema
**Untuk:** Setup database baru dari awal

**Berisi:**
- Semua tabel (10 tables)
- RLS policies
- Functions dan triggers
- Indexes

**Cara pakai:**
1. Buka Supabase SQL Editor
2. Copy-paste seluruh isi `schema.sql`
3. Klik Run
4. Selesai!

**Tables yang dibuat:**
1. `job_roles` - Master data role pekerjaan
2. `skills` - Master data skills
3. `job_role_skills` - Relasi role ↔ skill
4. `job_requirements` - Job descriptions dengan embeddings (RAG)
5. `profiles` - Profil user
6. `user_skills` - Skills yang dimiliki user
7. `user_progress` - Tracking belajar user
8. `roadmaps` - Cache AI roadmap
9. `skill_resources` - Learning resources per skill
10. `roadmap_phase_progress` - Status progress per fase roadmap

---

### 2. `seed_master_data.sql` - Sample Data (Optional)
**Untuk:** Testing dengan data sample

**Berisi:**
- 5 sample job roles
- 20 sample skills
- Sample relationships

**Cara pakai:**
1. Jalankan setelah `schema.sql`
2. Hanya untuk development/testing
3. Production sebaiknya pakai script seeding dari `dataset_baru/`

---

## Quick Decision Guide

### Saya setup database baru:
✅ Gunakan: `schema.sql`
- Jalankan di Supabase SQL Editor
- Lanjut dengan `npm run setup-complete` untuk seed data

### Database saya sudah ada dan perlu update:
✅ Copy section yang diperlukan dari `schema.sql`
- Untuk menambahkan tabel baru, copy section tabel tersebut
- Contoh: Jika perlu `roadmap_phase_progress`, copy baris 139-169 dari `schema.sql`
- Data existing tetap aman
- Lihat `ROADMAP_PROGRESS_SETUP.md` untuk detail

### Saya ingin reset database:
⚠️ **HATI-HATI: Ini akan menghapus semua data!**
1. Drop semua tabel di Supabase Table Editor
2. Jalankan `schema.sql` lagi
3. Seed ulang dengan `npm run setup-complete`

---

## Troubleshooting

### Error: "relation already exists"
- Tabel sudah ada di database
- Jika ingin update struktur, drop tabel dulu atau gunakan ALTER TABLE

### Error: "permission denied"
- Pastikan menggunakan service_role key (bukan anon key)
- Cek RLS policies sudah benar

### Tabel tidak muncul di Table Editor
- Refresh browser
- Cek di SQL Editor: `SELECT * FROM information_schema.tables WHERE table_schema = 'public';`

### Data tidak bisa diakses dari frontend
- Cek RLS policies
- Pastikan user sudah login (auth.uid() harus ada)
- Test dengan service_role key dulu untuk bypass RLS

---

## Schema Version History

### v1.0 (Current)
- 10 tables lengkap termasuk `roadmap_phase_progress`
- RLS policies
- Vector search untuk RAG
- Roadmap progress tracking per fase

---

## Need Help?

- 📖 Main setup guide: `../GETTING_STARTED.md`
- 📖 API documentation: `../API_DOCUMENTATION.md`

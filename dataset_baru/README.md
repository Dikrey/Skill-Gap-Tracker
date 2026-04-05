# Dataset Baru - Skill Gap Tracker

Dataset ini berisi data lengkap yang telah diekspor dari database Supabase yang sudah terverifikasi dan siap digunakan untuk setup database baru.

## 📁 Struktur File

### 1. `job_roles.json`
Berisi daftar lengkap job roles dengan deskripsi masing-masing.

**Format:**
```json
[
  {
    "name": "Frontend Developer",
    "description": "Membangun antarmuka pengguna berbasis web..."
  }
]
```

**Statistik:**
- Total: 152 job roles
- Mencakup berbagai bidang: Software Development, Data Science, Security, Cloud, AI/ML, dll.

### 2. `skills.json`
Berisi daftar lengkap skills yang dikategorikan.

**Format:**
```json
[
  {
    "name": "React.js",
    "category": "programming"
  }
]
```

**Kategori:**
- `programming`: Bahasa pemrograman dan framework
- `tools`: Software tools dan platform
- `knowledge`: Konsep dan metodologi
- `soft_skill`: Kemampuan interpersonal

**Statistik:**
- Total: 413 skills
- Mencakup teknologi modern dan fundamental

### 3. `job_role_skills.json`
Berisi mapping antara job roles dan skills yang dibutuhkan.

**Format:**
```json
[
  {
    "role_name": "Frontend Developer",
    "skill_name": "React.js",
    "importance": "required"
  }
]
```

**Importance Levels:**
- `required`: Skill wajib untuk role tersebut
- `nice_to_have`: Skill opsional tapi menguntungkan

**Statistik:**
- Total: 674+ mappings
- Setiap role memiliki 3-15 skills

### 4. `resources.json`
Berisi learning resources untuk setiap skill.

**Format:**
```json
[
  {
    "skill_name": "React.js",
    "resources": [
      {
        "title": "React Official Documentation",
        "type": "article",
        "url": "https://react.dev",
        "platform": "Official Documentation"
      }
    ]
  }
]
```

**Resource Types:**
- `article`: Dokumentasi, tutorial tertulis
- `video`: Video tutorial, course

**Platform Sources:**
- Official Documentation
- YouTube (FreeCodeCamp, Traversy Media, dll.)
- Tutorial websites (MDN, W3Schools, dll.)

**Statistik:**
- Total: 484+ resources
- Rata-rata 2-3 resources per skill

## 🔄 Cara Penggunaan

Dataset ini digunakan oleh script setup untuk mengisi database:

1. **seedMasterData.js** → Membaca `job_roles.json` dan `skills.json`
2. **seedRoleSkills.js** → Membaca `job_role_skills.json`
3. **seedResources.js** → Membaca `resources.json`

## ✅ Validasi Data

Dataset ini sudah melalui proses validasi:
- ✅ Tidak ada duplikasi
- ✅ Semua referensi valid (role_name dan skill_name ada di master data)
- ✅ Format JSON konsisten
- ✅ URL resources valid dan accessible

## 📊 Perbandingan dengan Dataset Lama

| Aspek | Dataset Lama | Dataset Baru |
|-------|--------------|--------------|
| Job Roles | 152 | 152 |
| Skills | 192 | 413 |
| Mappings | 358 | 674+ |
| Resources | 189 | 484+ |
| Kualitas | Baseline | Enhanced & Verified |

## 🚀 Update Dataset

Jika ingin mengupdate dataset dengan data terbaru dari database:

```bash
npm run export:dataset
```

Script ini akan:
1. Export semua data dari database
2. Overwrite file JSON di folder ini
3. Generate README.md baru

## 📝 Catatan Penting

- Dataset ini adalah **source of truth** untuk setup database baru
- Jangan edit manual kecuali untuk perbaikan data
- Setelah edit, jalankan `npm run validate:dataset` untuk memastikan konsistensi
- Backup dataset sebelum melakukan perubahan besar

## 🔗 Referensi

- [README.md](../README.md) - Start here guide
- [GETTING_STARTED.md](../GETTING_STARTED.md) - Panduan setup lengkap
- [CONSISTENCY.md](../dataset/CONSISTENCY.md) - Aturan konsistensi data
- [PROJECT_INFO.md](../PROJECT_INFO.md) - Project overview

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
);

const run = async () => {
    console.log('Checking roadmaps table for status column...');

    // Cek apakah kolom status sudah ada dengan fetch satu row
    const { data: sample, error: sampleError } = await supabase
        .from('roadmaps')
        .select('status')
        .limit(1);

    if (!sampleError) {
        console.log('✅ Kolom status sudah ada di tabel roadmaps. Tidak perlu migrasi.');
        process.exit(0);
    }

    // Kolom belum ada — jalankan migrasi via rpc exec_sql jika tersedia
    console.log('Kolom status belum ada. Menjalankan migrasi...');

    const { error } = await supabase.rpc('exec_sql', {
        sql: `
            ALTER TABLE roadmaps
            ADD COLUMN IF NOT EXISTS status TEXT NOT NULL DEFAULT 'belum selesai'
            CHECK (status IN ('selesai', 'belum selesai', 'berjalan'));
        `,
    });

    if (error) {
        console.error('❌ Gagal via rpc exec_sql:', error.message);
        console.log('');
        console.log('Jalankan SQL berikut secara manual di Supabase SQL Editor:');
        console.log('------------------------------------------------------------');
        console.log(`ALTER TABLE roadmaps
ADD COLUMN IF NOT EXISTS status TEXT NOT NULL DEFAULT 'belum selesai'
CHECK (status IN ('selesai', 'belum selesai', 'berjalan'));`);
        console.log('------------------------------------------------------------');
        process.exit(1);
    }

    console.log('✅ Kolom status berhasil ditambahkan ke tabel roadmaps.');
    console.log('   Default value: "belum selesai"');
    console.log('   Allowed values: selesai | belum selesai | berjalan');
};

run();

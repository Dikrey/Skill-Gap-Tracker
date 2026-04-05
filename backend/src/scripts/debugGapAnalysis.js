import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function debug() {
    console.log('\n=== DEBUG GAP ANALYSIS ===\n');

    // 1. Cek total data master
    const { count: roleCount } = await supabase.from('job_roles').select('*', { count: 'exact', head: true });
    const { count: skillCount } = await supabase.from('skills').select('*', { count: 'exact', head: true });
    const { count: roleSkillCount } = await supabase.from('job_role_skills').select('*', { count: 'exact', head: true });

    console.log(`job_roles       : ${roleCount} rows`);
    console.log(`skills          : ${skillCount} rows`);
    console.log(`job_role_skills : ${roleSkillCount} rows`);

    if (roleSkillCount === 0) {
        console.log('\n❌ MASALAH: job_role_skills KOSONG! Jalankan seed dulu:');
        console.log('   node src/scripts/seedMasterData.js');
        console.log('   node src/scripts/seedRoleSkills.js');
        return;
    }

    // 2. Cek sample job_role_skills
    const { data: sampleRoleSkills } = await supabase
        .from('job_role_skills')
        .select('job_role_id, skill_id, importance, job_roles(name), skills(name)')
        .limit(5);

    console.log('\nSample job_role_skills:');
    sampleRoleSkills?.forEach(rs => {
        console.log(`  - ${rs.job_roles?.name} → ${rs.skills?.name} (${rs.importance})`);
    });

    // 3. Cek semua user profiles
    const { data: profiles } = await supabase
        .from('profiles')
        .select('id, current_position, target_role_id, job_roles(name)');

    console.log(`\nProfiles (${profiles?.length} users):`);
    profiles?.forEach(p => {
        console.log(`  - user: ${p.id.slice(0, 8)}... | target: ${p.job_roles?.name || 'BELUM DI-SET'} (${p.target_role_id || 'null'})`);
    });

    if (!profiles?.length) {
        console.log('  ❌ Tidak ada profile user!');
        return;
    }

    // 4. Untuk setiap user, cek skill gap-nya
    for (const profile of profiles) {
        if (!profile.target_role_id) {
            console.log(`\n  ⚠️  User ${profile.id.slice(0, 8)}... belum set target role, skip.`);
            continue;
        }

        console.log(`\n--- User ${profile.id.slice(0, 8)}... | Target: ${profile.job_roles?.name} ---`);

        // Required skills untuk role ini
        const { data: requiredSkills } = await supabase
            .from('job_role_skills')
            .select('skill_id, skills(name)')
            .eq('job_role_id', profile.target_role_id)
            .eq('importance', 'required');

        console.log(`  Required skills untuk role ini: ${requiredSkills?.length || 0}`);
        if (!requiredSkills?.length) {
            console.log('  ❌ MASALAH: Role ini tidak punya required skills di job_role_skills!');
            console.log('     Pastikan seed sudah dijalankan dan nama role match.');
        }

        // User skills
        const { data: userSkills } = await supabase
            .from('user_skills')
            .select('skill_id, skills(name)')
            .eq('user_id', profile.id);

        console.log(`  Skill dimiliki user: ${userSkills?.length || 0}`);
        userSkills?.slice(0, 5).forEach(us => console.log(`    ✓ ${us.skills?.name}`));

        // Hitung gap
        const requiredIds = new Set(requiredSkills?.map(rs => rs.skill_id) || []);
        const ownedIds = new Set(userSkills?.map(us => us.skill_id) || []);
        const gapCount = [...requiredIds].filter(id => !ownedIds.has(id)).length;

        console.log(`  Gap skills: ${gapCount} dari ${requiredIds.size} required`);
        if (gapCount === 0 && requiredIds.size > 0) {
            console.log('  ⚠️  User sudah punya semua skill yang required — tidak ada gap!');
        }
    }

    console.log('\n=== SELESAI ===\n');
}

debug().catch(console.error);

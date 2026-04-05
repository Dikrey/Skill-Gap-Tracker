import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

async function check() {
    // Cek required skills per role yang bermasalah
    const roleNames = ['Back-End Developer', 'Web App Penetration Tester'];

    for (const roleName of roleNames) {
        const { data: role } = await supabase.from('job_roles').select('id').eq('name', roleName).single();
        if (!role) { console.log(`\n❌ Role "${roleName}" tidak ada di DB`); continue; }

        const { data: skills } = await supabase
            .from('job_role_skills')
            .select('importance, skills(name)')
            .eq('job_role_id', role.id);

        console.log(`\n=== ${roleName} (${skills?.length || 0} skills) ===`);
        skills?.forEach(s => console.log(`  [${s.importance}] ${s.skills?.name}`));
    }

    // Cek berapa banyak role yang punya 0 required skills
    const { data: allRoles } = await supabase.from('job_roles').select('id, name');
    const emptyRoles = [];
    for (const role of allRoles || []) {
        const { count } = await supabase
            .from('job_role_skills')
            .select('*', { count: 'exact', head: true })
            .eq('job_role_id', role.id)
            .eq('importance', 'required');
        if (count === 0) emptyRoles.push(role.name);
    }
    console.log(`\n=== Roles dengan 0 required skills (${emptyRoles.length} roles) ===`);
    emptyRoles.forEach(r => console.log(`  - ${r}`));

    // Cek dataset file — berapa banyak entry untuk Back-End Developer
    console.log('\n=== Cek nama role di dataset vs DB ===');
    const { data: backendRoles } = await supabase
        .from('job_roles')
        .select('id, name')
        .ilike('name', '%back%');
    backendRoles?.forEach(r => console.log(`  DB: "${r.name}"`));
}

check().catch(console.error);

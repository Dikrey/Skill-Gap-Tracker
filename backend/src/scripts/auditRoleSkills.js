import supabase from '../services/supabaseClient.js';

async function auditRoleSkills() {
    console.log('--- Auditing Role Skills ---');

    // 1. Get all roles
    const { data: roles } = await supabase
        .from('job_roles')
        .select('id, name');

    if (!roles) return;

    console.log(`Checking ${roles.length} roles...`);

    let emptyRoles = 0;
    for (const role of roles) {
        const { count } = await supabase
            .from('job_role_skills')
            .select('*', { count: 'exact', head: true })
            .eq('job_role_id', role.id);
        
        if (count === 0) {
            console.log(`❌ [EMPTY] ${role.name}`);
            emptyRoles++;
        }
    }

    console.log(`\nSummary: ${emptyRoles} roles out of ${roles.length} have NO SKILLS linked.`);
}

auditRoleSkills();
import supabase from '../services/supabaseClient.js';

async function checkRoleSkills() {
    console.log('--- Checking Roles requiring Python ---');

    // 1. Get Python Skill ID
    const { data: pySkill } = await supabase
        .from('skills')
        .select('id')
        .eq('name', 'Python')
        .single();

    if (!pySkill) {
        console.log('Python skill not found!');
        return;
    }

    // 2. Find roles linked to Python
    const { data: roleSkills, error } = await supabase
        .from('job_role_skills')
        .select('job_role_id, job_roles(name)')
        .eq('skill_id', pySkill.id);

    if (error) {
        console.error(error);
        return;
    }

    console.log(`Found ${roleSkills.length} roles requiring Python:`);
    roleSkills.forEach(rs => {
        console.log(`- ${rs.job_roles.name}`);
    });
}

checkRoleSkills();
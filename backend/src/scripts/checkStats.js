import supabase from '../services/supabaseClient.js';

async function checkStats() {
    const { count: roles } = await supabase.from('job_roles').select('*', { count: 'exact', head: true });
    const { count: skills } = await supabase.from('skills').select('*', { count: 'exact', head: true });
    const { count: mappings } = await supabase.from('job_role_skills').select('*', { count: 'exact', head: true });
    const { count: resources } = await supabase.from('skill_resources').select('*', { count: 'exact', head: true });
    
    console.log('\n=== DATABASE STATISTICS ===');
    console.log(`Job Roles: ${roles}`);
    console.log(`Skills: ${skills}`);
    console.log(`Role-Skill Mappings: ${mappings}`);
    console.log(`Learning Resources: ${resources}`);
    console.log('===========================\n');
}

checkStats();

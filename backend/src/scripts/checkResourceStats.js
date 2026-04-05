import supabase from '../services/supabaseClient.js';

async function checkStats() {
    console.log('Checking resource coverage...');

    // 1. Count total skills
    const { count: totalSkills, error: err1 } = await supabase.from('skills').select('*', { count: 'exact', head: true });
    if (err1) console.error(err1);

    // 2. Count skills with at least one resource
    const { data: skillsWithResources, error: err2 } = await supabase
        .from('skill_resources')
        .select('skill_id');
    
    if (err2) console.error(err2);

    const uniqueSkillsWithResources = new Set(skillsWithResources.map(r => r.skill_id));

    console.log(`Total Skills: ${totalSkills}`);
    console.log(`Skills with Resources: ${uniqueSkillsWithResources.size}`);
    console.log(`Coverage: ${((uniqueSkillsWithResources.size / totalSkills) * 100).toFixed(2)}%`);

    // 3. List some skills WITHOUT resources
    const { data: allSkills } = await supabase.from('skills').select('id, name');
    const missing = allSkills.filter(s => !uniqueSkillsWithResources.has(s.id));

    console.log('\nTop 20 Skills WITHOUT resources:');
    missing.slice(0, 20).forEach(s => console.log(`- ${s.name}`));
}

checkStats();
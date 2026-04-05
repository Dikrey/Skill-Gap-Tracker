import supabase from '../services/supabaseClient.js';

async function checkPython() {
    console.log('--- Checking Python Resources ---');

    // 1. Find the skill 'Python'
    const { data: skills, error: err1 } = await supabase
        .from('skills')
        .select('id, name')
        .ilike('name', '%Python%'); // Case-insensitive search

    if (err1) {
        console.error('Error finding Python skill:', err1);
        return;
    }

    if (!skills || skills.length === 0) {
        console.log('❌ No skill found matching "Python"');
        return;
    }

    console.log(`Found ${skills.length} skills matching "Python":`);
    
    for (const skill of skills) {
        console.log(`- [${skill.id}] ${skill.name}`);

        // 2. Count resources for this skill
        const { data: resources, error: err2 } = await supabase
            .from('skill_resources')
            .select('*')
            .eq('skill_id', skill.id);

        if (err2) {
            console.error(`  Error fetching resources for ${skill.name}:`, err2);
        } else {
            console.log(`  ✅ Resources found: ${resources.length}`);
            resources.forEach(r => console.log(`     -> ${r.title} (${r.url})`));
        }
    }
}

checkPython();
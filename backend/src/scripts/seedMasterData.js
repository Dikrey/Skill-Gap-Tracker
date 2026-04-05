import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import supabase from '../services/supabaseClient.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function loadJSON(filepath) {
    if (fs.existsSync(filepath)) {
        return JSON.parse(fs.readFileSync(filepath, 'utf8'));
    }
    console.error(`File not found: ${filepath}`);
    return [];
}

const seedMasterData = async () => {
    console.log('='.repeat(60));
    console.log('SEEDING MASTER DATA (Roles & Skills)');
    console.log('='.repeat(60));
    
    // Load data from dataset_baru
    const rolesPath = path.join(__dirname, '../../../dataset_baru/job_roles.json');
    const skillsPath = path.join(__dirname, '../../../dataset_baru/skills.json');
    
    const rolesSeed = loadJSON(rolesPath);
    const skillsSeed = loadJSON(skillsPath);
    
    if (rolesSeed.length === 0) {
        console.error('❌ No roles data found!');
        return;
    }
    
    if (skillsSeed.length === 0) {
        console.error('❌ No skills data found!');
        return;
    }
    
    console.log(`\n📦 Loaded ${rolesSeed.length} roles from dataset_baru`);
    console.log(`📦 Loaded ${skillsSeed.length} skills from dataset_baru\n`);
    
    // Seed job roles
    console.log('⏳ Inserting job roles...');
    const { data: insertedRoles, error: rolesErr } = await supabase
        .from('job_roles')
        .upsert(rolesSeed, { onConflict: 'name' })
        .select();

    if (rolesErr) {
        console.error('❌ Error seeding roles:', rolesErr.message);
        return;
    }
    console.log(`✅ Successfully inserted ${insertedRoles.length} roles\n`);

    // Seed skills
    console.log('⏳ Inserting skills...');
    const { data: insertedSkills, error: skillsErr } = await supabase
        .from('skills')
        .upsert(skillsSeed, { onConflict: 'name' })
        .select();

    if (skillsErr) {
        console.error('❌ Error seeding skills:', skillsErr.message);
        return;
    }
    console.log(`✅ Successfully inserted ${insertedSkills.length} skills\n`);
    
    console.log('='.repeat(60));
    console.log('✅ MASTER DATA SEEDING COMPLETE!');
    console.log('='.repeat(60));
};

seedMasterData();

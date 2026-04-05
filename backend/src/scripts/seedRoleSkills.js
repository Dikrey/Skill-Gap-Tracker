import supabase from '../services/supabaseClient.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATASET_PATH = path.join(__dirname, '../../../dataset_baru/job_role_skills.json');

async function seedRoleSkills() {
    console.log('='.repeat(60));
    console.log('SEEDING ROLE-SKILL MAPPINGS');
    console.log('='.repeat(60));

    if (!fs.existsSync(DATASET_PATH)) {
        console.error('❌ Dataset file not found:', DATASET_PATH);
        return;
    }

    const rawData = fs.readFileSync(DATASET_PATH, 'utf-8');
    const roleSkills = JSON.parse(rawData);

    console.log(`\n📦 Loaded ${roleSkills.length} relationships from dataset_baru\n`);

    // 1. Fetch ALL roles and skills to avoid N+1 queries
    console.log('⏳ Fetching roles and skills from database...');
    const { data: roles, error: rolesError } = await supabase.from('job_roles').select('id, name');
    const { data: skills, error: skillsError } = await supabase.from('skills').select('id, name');

    if (rolesError) {
        console.error('❌ Error fetching roles:', rolesError.message);
        console.error('Make sure job_roles table exists and has data');
        process.exit(1);
    }

    if (skillsError) {
        console.error('❌ Error fetching skills:', skillsError.message);
        console.error('Make sure skills table exists and has data');
        process.exit(1);
    }

    if (!roles || roles.length === 0) {
        console.error('❌ No roles found in database. Run seedMasterData.js first!');
        process.exit(1);
    }

    if (!skills || skills.length === 0) {
        console.error('❌ No skills found in database. Run seedMasterData.js first!');
        process.exit(1);
    }

    console.log(`✅ Found ${roles.length} roles and ${skills.length} skills in database\n`);

    const roleMap = new Map(roles.map(r => [r.name.toLowerCase(), r.id]));
    const skillMap = new Map(skills.map(s => [s.name.toLowerCase(), s.id]));

    const batchSize = 100;
    let skipped = 0;
    
    // Group inserts by role/skill to minimize writes
    const newItems = [];

    console.log('⏳ Processing mappings...');
    for (const item of roleSkills) {
        const roleId = roleMap.get(item.role_name.toLowerCase());
        const skillId = skillMap.get(item.skill_name.toLowerCase());

        if (!roleId) {
            skipped++;
            continue;
        }

        if (!skillId) {
            skipped++;
            continue;
        }
        
        // Push object that matches schema
        newItems.push({
            job_role_id: roleId,
            skill_id: skillId,
            importance: item.importance || 'required'
        });
    }

    console.log(`✅ Valid mappings: ${newItems.length} (Skipped: ${skipped})\n`);

    // 2. Perform upsert in batches
    console.log('⏳ Inserting mappings in batches...');
    let totalInserted = 0;
    for (let i = 0; i < newItems.length; i += batchSize) {
        const chunk = newItems.slice(i, i + batchSize);
        const { error } = await supabase
            .from('job_role_skills')
            .upsert(chunk, { onConflict: 'job_role_id, skill_id', ignoreDuplicates: true });

        if (error) {
            console.error(`❌ Error inserting batch ${i}-${i + chunk.length}:`, error.message);
        } else {
            totalInserted += chunk.length;
            console.log(`   ✓ Batch ${Math.floor(i / batchSize) + 1}: ${chunk.length} mappings`);
        }
    }
    
    console.log(`\n✅ Successfully inserted ${totalInserted} role-skill mappings\n`);
    console.log('='.repeat(60));
    console.log('✅ ROLE-SKILL MAPPINGS SEEDING COMPLETE!');
    console.log('='.repeat(60));
}

seedRoleSkills();
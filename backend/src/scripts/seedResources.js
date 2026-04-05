import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '../../.env') });

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

function loadJSON(filepath) {
    if (fs.existsSync(filepath)) {
        return JSON.parse(fs.readFileSync(filepath, 'utf8'));
    }
    return [];
}

function normalizeSkillName(skillName) {
    return skillName.trim().toLowerCase();
}

function resolveSkillId(skillName, skillMap) {
    const normalized = normalizeSkillName(skillName);
    const aliases = {
        'oop': 'object-oriented programming (oop)',
        'microservices': 'microservices architecture',
        'serverless computing': 'serverless computing concepts',
        'tdd': 'test-driven development (tdd)',
        'bdd': 'behavior-driven development (bdd)',
        'seo': 'seo',
        'wcag': 'web accessibility (wcag)',
        'ux research': 'user research',
        'state management': 'redux / state management',
        'ddd': 'domain-driven design (ddd)',
        'dry & kiss': 'dry & kiss principles',
        'git flow': 'version control workflows (git flow)',
        'pentesting methodologies': 'penetration testing methodologies',
        'ot security': 'operational technology (ot) security',
        'network protocols': 'network protocols (tcp/ip, udp)',
        'load balancing': 'load balancing strategies',
        'containerization': 'containerization concepts',
        'db normalization': 'database normalization',
        'data warehousing': 'data warehousing concepts',
        'deep learning': 'deep learning fundamentals',
        'nlp': 'natural language processing (nlp)',
        'iam': 'identity and access management (iam)',
        'excel (data analysis)': 'excel',
        'basic statistics': 'statistik dasar',
        'tableau': 'tableau / power bi',
        'power bi': 'tableau / power bi',
        'meta ads': 'meta ads / google ads',
        'google ads': 'meta ads / google ads',
        'redux / state management': 'redux / state management',
    };

    return skillMap[normalized] || skillMap[aliases[normalized]] || null;
}

async function seedResources() {
    console.log('='.repeat(60));
    console.log('SEEDING SKILL RESOURCES');
    console.log('='.repeat(60));

    const resources = loadJSON(path.join(__dirname, '../../../dataset_baru/resources.json'));

    console.log(`\n📦 Loaded ${resources.length} skills with curated resources from dataset_baru\n`);

    if (resources.length === 0) {
        console.error("❌ Resources dataset is empty!");
        return;
    }

    try {
        // Ambil ID semua skills terlebih dahulu untuk pemetaan
        console.log('⏳ Fetching skills from database...');
        const { data: skillsInDb, error: errFetch } = await supabase.from('skills').select('id, name');
        if (errFetch) throw errFetch;

        console.log(`✅ Found ${skillsInDb.length} skills in database\n`);

        const skillMap = {};
        skillsInDb.forEach(s => skillMap[normalizeSkillName(s.name)] = s.id);

        let insertPayloads = [];
        const missingSkills = [];

        console.log('⏳ Processing resource links...');
        for (const item of resources) {
            const skillId = resolveSkillId(item.skill_name, skillMap);
            if (!skillId) {
                missingSkills.push(item.skill_name);
                continue;
            }

            for (const res of item.resources) {
                insertPayloads.push({
                    skill_id: skillId,
                    title: res.title,
                    type: res.type,
                    url: res.url,
                    platform: res.platform
                });
            }
        }

        console.log(`✅ Prepared ${insertPayloads.length} resource links for insertion\n`);

        // Bersihkan data lama jika ada
        console.log('⏳ Clearing old resources...');
        await supabase.from('skill_resources').delete().neq('id', '00000000-0000-0000-0000-000000000000');

        console.log('⏳ Inserting new resources...');
        const { data: inserted, error: errInsert } = await supabase
            .from('skill_resources')
            .insert(insertPayloads)
            .select();

        if (errInsert) throw errInsert;

        console.log(`✅ Successfully inserted ${inserted.length} resource links\n`);
        
        if (missingSkills.length > 0) {
            console.log(`⚠️  Warning: ${missingSkills.length} skills from JSON not found in database`);
            console.log(`   Missing skills: ${missingSkills.slice(0, 5).join(', ')}${missingSkills.length > 5 ? '...' : ''}\n`);
        }
        
        console.log('='.repeat(60));
        console.log('✅ SKILL RESOURCES SEEDING COMPLETE!');
        console.log('='.repeat(60));

    } catch (e) {
        console.error("❌ ERROR SEEDING RESOURCES:", e.message);
    }
}

seedResources();

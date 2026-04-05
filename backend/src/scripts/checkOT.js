import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '../../.env') });

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

async function check() {
    console.log("Checking for 'OT' roles...");
    const { data: roles, error } = await supabase
        .from('job_roles')
        .select('id, name')
        .ilike('name', '%OT%');

    if (error) {
        console.error("Error fetching roles:", error);
        return;
    }

    console.log('Found Roles:', roles);

    if (roles && roles.length > 0) {
        for (const role of roles) {
            console.log(`\nChecking Skills for Role: ${role.name}`);
            const { data: roleSkills, error: rsError } = await supabase
                .from('job_role_skills')
                .select(`
                    skills (
                        id,
                        name
                    )
                `)
                .eq('job_role_id', role.id);
            
            if (rsError) console.error(rsError);

            if (roleSkills && roleSkills.length > 0) {
                const skillNames = roleSkills.map(rs => rs.skills.name);
                console.log(`Skills (${skillNames.length}):`, skillNames.join(', '));
                
                // Check resources for the first 3 skills
                const checkSkills = skillNames.slice(0, 3);
                const { data: resources } = await supabase
                    .from('skill_resources')
                    .select('title, url, skill_id, skills(name)')
                    .in('skills.name', checkSkills); // This won't work directly with join filter on inner table easily in one go, better to query by skill_id
                
                // Let's query resources by skill ID for better accuracy
                const skillIds = roleSkills.map(rs => rs.skills.id).slice(0, 5);
                const { data: resData } = await supabase
                    .from('skill_resources')
                    .select('title, skill_id')
                    .in('skill_id', skillIds);
                
                console.log(`Resources found for first 5 skills: ${resData?.length || 0}`);
            } else {
                console.log("No skills found for this role.");
            }
        }
    } else {
        console.log("No roles found matching 'OT'.");
    }
}

check();

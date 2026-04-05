import { generateRoadmap } from '../services/geminiService.js';
import supabase from '../services/supabaseClient.js';
import fs from 'fs';

async function test() {
    try {
        console.log('Start checkRoadmap...');
        console.log('Fetching role...');
        const { data: roles } = await supabase.from('job_roles').select('id, name').limit(1);
        if (!roles || roles.length === 0) {
            console.error('No roles found in DB.');
            return;
        }
        const role = roles[0];

        console.log('Fetching skills...');
        // Use normalized skill names
        const { data: skills } = await supabase.from('skills')
            .select('id, name, category')
            .in('name', ['JavaScript', 'React.js', 'Tailwind CSS']);
        
        if (!skills || skills.length === 0) {
            console.error('No matching skills found in DB.');
            return;
        }

        console.log(`Generating roadmap for ${role.name} with ${skills.length} skills...`);
        const roadmapStr = await generateRoadmap(role.name, role.id, skills);

        console.log('Parsing JSON...');
        const rm = typeof roadmapStr === "string" ? JSON.parse(roadmapStr) : roadmapStr;

        console.log('Roadmap Generated Successfully:');
        console.log(JSON.stringify(rm, null, 2).slice(0, 500) + '... (truncated)');
        console.log('Done!');
    } catch (e) {
        console.error('Error:', e.message);
    }
}

test();

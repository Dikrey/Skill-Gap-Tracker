import supabase from '../services/supabaseClient.js';

console.log('Checking tables in Supabase...\n');

async function checkTables() {
    const tables = [
        'job_roles',
        'skills', 
        'job_role_skills',
        'job_requirements',
        'profiles',
        'user_skills',
        'user_progress',
        'roadmaps',
        'skill_resources'
    ];
    
    for (const table of tables) {
        try {
            const { data, error, count } = await supabase
                .from(table)
                .select('*', { count: 'exact', head: true });
            
            if (error) {
                console.log(`❌ ${table}: ${error.message}`);
            } else {
                console.log(`✅ ${table}: ${count || 0} rows`);
            }
        } catch (err) {
            console.log(`❌ ${table}: ${err.message}`);
        }
    }
}

checkTables();

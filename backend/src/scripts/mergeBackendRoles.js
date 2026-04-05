import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

async function mergeBackendRoles() {
    console.log('Checking Backend Developer vs Back-End Developer...\n');

    // Get both roles
    const { data: backendRole } = await supabase.from('job_roles').select('id').eq('name', 'Backend Developer').single();
    const { data: backEndRole } = await supabase.from('job_roles').select('id').eq('name', 'Back-End Developer').single();

    if (!backendRole || !backEndRole) {
        console.log('One or both roles not found. Nothing to merge.');
        return;
    }

    // Check users using "Backend Developer" (tanpa hyphen)
    const { count: userCount } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true })
        .eq('target_role_id', backendRole.id);

    console.log(`Users using "Backend Developer" (no hyphen): ${userCount}`);

    if (userCount > 0) {
        console.log('\nMigrating users to "Back-End Developer" (with hyphen)...');
        const { error } = await supabase
            .from('profiles')
            .update({ target_role_id: backEndRole.id })
            .eq('target_role_id', backendRole.id);

        if (error) {
            console.error('Error migrating users:', error.message);
            return;
        }
        console.log(`✅ Migrated ${userCount} users to "Back-End Developer"`);
    }

    // Copy missing skills from Back-End Developer to Backend Developer (sync them)
    const { data: backEndSkills } = await supabase
        .from('job_role_skills')
        .select('skill_id, importance')
        .eq('job_role_id', backEndRole.id);

    const { data: backendSkills } = await supabase
        .from('job_role_skills')
        .select('skill_id, importance')
        .eq('job_role_id', backendRole.id);

    const backendSkillSet = new Set(backendSkills.map(s => s.skill_id));
    const toAdd = backEndSkills.filter(s => !backendSkillSet.has(s.skill_id));

    if (toAdd.length > 0) {
        console.log(`\nSyncing ${toAdd.length} missing skills to "Backend Developer"...`);
        const toInsert = toAdd.map(s => ({
            job_role_id: backendRole.id,
            skill_id: s.skill_id,
            importance: s.importance,
        }));

        const { error } = await supabase
            .from('job_role_skills')
            .upsert(toInsert, { onConflict: 'job_role_id,skill_id', ignoreDuplicates: true });

        if (error) {
            console.error('Error syncing skills:', error.message);
        } else {
            console.log('✅ Skills synced');
        }
    }

    // Delete "Backend Developer" role (tanpa hyphen)
    console.log('\nDeleting duplicate "Backend Developer" role...');
    const { error: deleteError } = await supabase
        .from('job_roles')
        .delete()
        .eq('id', backendRole.id);

    if (deleteError) {
        console.error('Error deleting role:', deleteError.message);
    } else {
        console.log('✅ "Backend Developer" (no hyphen) deleted');
        console.log('\n✅ Merge complete. Only "Back-End Developer" (with hyphen) remains.');
    }
}

mergeBackendRoles().catch(console.error);

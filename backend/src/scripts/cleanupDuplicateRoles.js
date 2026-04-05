import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

/**
 * Role yang perlu di-merge (nama berbeda tapi pekerjaan sama)
 * Format: { 'nama_yang_dihapus': 'nama_yang_dipertahankan' }
 */
const ROLE_MERGES = {
    // Frontend variations
    'Frontend Developer': 'Front-End Developer',
    
    // Leadership variations
    'AI Product Manager': 'Chief Technology Officer (CTO)',
    'Chief Data Officer (CDO)': 'Chief Technology Officer (CTO)',
    'AI Ethicist': 'Chief Technology Officer (CTO)',
    
    // DevOps variations
    'Configuration Management Specialist': 'DevOps Engineer',
    'Disaster Recovery Specialist': 'Site Reliability Engineer (SRE)',
    'Capacity Planning Analyst': 'Site Reliability Engineer (SRE)',
    
    // Penetration testing variations
    'Exploit Developer': 'Penetration Tester',
    'Social Engineering Specialist': 'Penetration Tester',
    'Wireless Security Auditor': 'Penetration Tester',
    'Purple Team Coordinator': 'Penetration Tester',
    'Bug Bounty Triage Specialist': 'Penetration Tester',
    'Red Team Operator': 'Penetration Tester',
};

async function cleanupDuplicateRoles() {
    console.log('Starting role cleanup and merge...\n');
    
    let totalMerged = 0;
    
    for (const [oldName, newName] of Object.entries(ROLE_MERGES)) {
        console.log(`\nMerging "${oldName}" → "${newName}"`);
        
        const { data: oldRole } = await supabase.from('job_roles').select('id').eq('name', oldName).maybeSingle();
        const { data: newRole } = await supabase.from('job_roles').select('id').eq('name', newName).maybeSingle();
        
        if (!oldRole) {
            console.log(`  ⚠️  "${oldName}" not found, skip`);
            continue;
        }
        if (!newRole) {
            console.log(`  ⚠️  "${newName}" not found, skip`);
            continue;
        }
        
        // Migrate users
        const { count: userCount } = await supabase
            .from('profiles')
            .select('*', { count: 'exact', head: true })
            .eq('target_role_id', oldRole.id);
        
        if (userCount > 0) {
            await supabase.from('profiles').update({ target_role_id: newRole.id }).eq('target_role_id', oldRole.id);
            console.log(`  ✅ Migrated ${userCount} users`);
        }
        
        // Copy unique skills from old to new
        const { data: oldSkills } = await supabase.from('job_role_skills').select('skill_id, importance').eq('job_role_id', oldRole.id);
        const { data: newSkills } = await supabase.from('job_role_skills').select('skill_id').eq('job_role_id', newRole.id);
        
        const newSkillSet = new Set(newSkills.map(s => s.skill_id));
        const toAdd = oldSkills.filter(s => !newSkillSet.has(s.skill_id));
        
        if (toAdd.length > 0) {
            const toInsert = toAdd.map(s => ({ job_role_id: newRole.id, skill_id: s.skill_id, importance: s.importance }));
            await supabase.from('job_role_skills').upsert(toInsert, { onConflict: 'job_role_id,skill_id', ignoreDuplicates: true });
            console.log(`  ✅ Copied ${toAdd.length} unique skills`);
        }
        
        // Delete old role
        await supabase.from('job_roles').delete().eq('id', oldRole.id);
        console.log(`  ✅ Deleted "${oldName}"`);
        totalMerged++;
    }
    
    console.log(`\n✅ Merged ${totalMerged} duplicate roles`);
    
    // Final count
    const { count } = await supabase.from('job_roles').select('*', { count: 'exact', head: true });
    console.log(`Total roles remaining: ${count}`);
}

cleanupDuplicateRoles().catch(console.error);

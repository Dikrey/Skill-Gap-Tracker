import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

/**
 * Hitung similarity antara dua set skills
 * Jaccard similarity: intersection / union
 */
function calculateSimilarity(skills1, skills2) {
    const set1 = new Set(skills1);
    const set2 = new Set(skills2);
    
    const intersection = [...set1].filter(x => set2.has(x)).length;
    const union = new Set([...set1, ...set2]).size;
    
    return union === 0 ? 0 : (intersection / union);
}

/**
 * Normalize nama role untuk deteksi duplikasi
 */
function normalizeRoleName(name) {
    return name
        .toLowerCase()
        .replace(/[^a-z0-9]/g, '') // hapus spasi, hyphen, dll
        .replace(/engineer/g, 'eng')
        .replace(/developer/g, 'dev')
        .replace(/specialist/g, 'spec')
        .replace(/architect/g, 'arch');
}

async function findDuplicateRoles() {
    console.log('Fetching all roles and their skills...\n');
    
    const { data: allRoles } = await supabase.from('job_roles').select('id, name');
    
    // Fetch skills untuk setiap role
    const rolesWithSkills = [];
    for (const role of allRoles) {
        const { data: skills } = await supabase
            .from('job_role_skills')
            .select('skill_id, importance')
            .eq('job_role_id', role.id);
        
        const requiredSkills = skills.filter(s => s.importance === 'required').map(s => s.skill_id);
        const allSkillIds = skills.map(s => s.skill_id);
        
        rolesWithSkills.push({
            id: role.id,
            name: role.name,
            normalized: normalizeRoleName(role.name),
            requiredSkills,
            allSkills: allSkillIds,
            totalSkills: skills.length,
        });
    }
    
    console.log(`Analyzing ${rolesWithSkills.length} roles...\n`);
    
    // Cari duplikasi berdasarkan nama yang mirip
    const nameDuplicates = [];
    for (let i = 0; i < rolesWithSkills.length; i++) {
        for (let j = i + 1; j < rolesWithSkills.length; j++) {
            const role1 = rolesWithSkills[i];
            const role2 = rolesWithSkills[j];
            
            // Cek nama yang sangat mirip (normalized sama atau hampir sama)
            if (role1.normalized === role2.normalized) {
                nameDuplicates.push({ role1, role2, reason: 'exact_normalized' });
            } else if (
                role1.normalized.includes(role2.normalized) || 
                role2.normalized.includes(role1.normalized)
            ) {
                nameDuplicates.push({ role1, role2, reason: 'substring' });
            }
        }
    }
    
    if (nameDuplicates.length > 0) {
        console.log('=== DUPLIKASI NAMA ===\n');
        for (const { role1, role2, reason } of nameDuplicates) {
            console.log(`"${role1.name}" vs "${role2.name}"`);
            console.log(`  Normalized: "${role1.normalized}" vs "${role2.normalized}"`);
            console.log(`  Reason: ${reason}`);
            console.log(`  Skills: ${role1.totalSkills} vs ${role2.totalSkills}`);
            
            const similarity = calculateSimilarity(role1.allSkills, role2.allSkills);
            console.log(`  Skill similarity: ${(similarity * 100).toFixed(1)}%\n`);
        }
    }
    
    // Cari role dengan skill yang sangat mirip (>80% similarity)
    console.log('\n=== ROLE DENGAN SKILL SANGAT MIRIP (>80%) ===\n');
    const skillDuplicates = [];
    
    for (let i = 0; i < rolesWithSkills.length; i++) {
        for (let j = i + 1; j < rolesWithSkills.length; j++) {
            const role1 = rolesWithSkills[i];
            const role2 = rolesWithSkills[j];
            
            // Skip jika sudah terdeteksi sebagai name duplicate
            if (nameDuplicates.some(d => 
                (d.role1.id === role1.id && d.role2.id === role2.id) ||
                (d.role1.id === role2.id && d.role2.id === role1.id)
            )) {
                continue;
            }
            
            const similarity = calculateSimilarity(role1.requiredSkills, role2.requiredSkills);
            
            if (similarity > 0.8) {
                skillDuplicates.push({ role1, role2, similarity });
            }
        }
    }
    
    // Sort by similarity descending
    skillDuplicates.sort((a, b) => b.similarity - a.similarity);
    
    if (skillDuplicates.length > 0) {
        for (const { role1, role2, similarity } of skillDuplicates.slice(0, 20)) {
            console.log(`"${role1.name}" vs "${role2.name}"`);
            console.log(`  Required skill similarity: ${(similarity * 100).toFixed(1)}%`);
            console.log(`  Total skills: ${role1.totalSkills} vs ${role2.totalSkills}\n`);
        }
    } else {
        console.log('Tidak ada role dengan skill similarity >80%\n');
    }
    
    // Cari role dengan nama berbeda tapi skill 100% sama
    console.log('\n=== ROLE DENGAN SKILL IDENTIK (100%) ===\n');
    const identicalSkills = [];
    
    for (let i = 0; i < rolesWithSkills.length; i++) {
        for (let j = i + 1; j < rolesWithSkills.length; j++) {
            const role1 = rolesWithSkills[i];
            const role2 = rolesWithSkills[j];
            
            if (role1.totalSkills === role2.totalSkills && role1.totalSkills > 0) {
                const similarity = calculateSimilarity(role1.allSkills, role2.allSkills);
                if (similarity === 1.0) {
                    identicalSkills.push({ role1, role2 });
                }
            }
        }
    }
    
    if (identicalSkills.length > 0) {
        for (const { role1, role2 } of identicalSkills) {
            console.log(`"${role1.name}" vs "${role2.name}"`);
            console.log(`  Both have ${role1.totalSkills} identical skills\n`);
        }
    } else {
        console.log('Tidak ada role dengan skill 100% identik\n');
    }
    
    console.log('\n=== SUMMARY ===');
    console.log(`Total roles: ${rolesWithSkills.length}`);
    console.log(`Name duplicates: ${nameDuplicates.length}`);
    console.log(`Skill similarity >80%: ${skillDuplicates.length}`);
    console.log(`Identical skills (100%): ${identicalSkills.length}`);
}

findDuplicateRoles().catch(console.error);

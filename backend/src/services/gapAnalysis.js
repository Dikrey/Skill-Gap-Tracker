import supabase from '../services/supabaseClient.js';

/**
 * Hitung readiness score user terhadap target role.
 * Score = (skill dimiliki ∩ skill required) / total skill required × 100
 */
export const calculateReadinessScore = async (userId, targetRoleId) => {
    // Ambil semua skill yang diperlukan untuk role target
    const { data: roleSkills, error: rsError } = await supabase
        .from('job_role_skills')
        .select('skill_id, importance')
        .eq('job_role_id', targetRoleId)
        .eq('importance', 'required');

    if (rsError) throw rsError;

    if (!roleSkills || roleSkills.length === 0) return { score: 0, totalRequired: 0, masteredCount: 0, masteredSkillIds: [], gapSkillIds: [], niceToHaveGapIds: [] };

    const requiredSkillIds = roleSkills.map((rs) => rs.skill_id);

    // Ambil skill yang dimiliki user
    const { data: userSkills, error: usError } = await supabase
        .from('user_skills')
        .select('skill_id')
        .eq('user_id', userId);

    if (usError) throw usError;

    const ownedSkillIds = new Set((userSkills || []).map((us) => us.skill_id));

    // Juga hitung skill yang sudah completed di progress tracker
    const { data: completedProgress } = await supabase
        .from('user_progress')
        .select('skill_id')
        .eq('user_id', userId)
        .eq('status', 'completed');

    const completedSkillIds = new Set((completedProgress || []).map((p) => p.skill_id));

    // Gabung: skill dimiliki + skill completed
    const allMasteredIds = new Set([...ownedSkillIds, ...completedSkillIds]);

    const masteredRequired = requiredSkillIds.filter((id) => allMasteredIds.has(id));
    const gapSkillIds = requiredSkillIds.filter((id) => !allMasteredIds.has(id));

    const score = Math.round((masteredRequired.length / requiredSkillIds.length) * 100);

    // Ambil nice_to_have skills untuk memperkaya roadmap generation
    const { data: nthSkills } = await supabase
        .from('job_role_skills')
        .select('skill_id')
        .eq('job_role_id', targetRoleId)
        .eq('importance', 'nice_to_have');

    const niceToHaveGapIds = (nthSkills || [])
        .map((s) => s.skill_id)
        .filter((id) => !allMasteredIds.has(id));

    return {
        score,
        totalRequired: requiredSkillIds.length,
        masteredCount: masteredRequired.length,
        masteredSkillIds: masteredRequired,
        gapSkillIds,
        niceToHaveGapIds,
    };
};

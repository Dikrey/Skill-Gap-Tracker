import { Router } from 'express';
import authGuard from '../middleware/authGuard.js';
import supabase from '../services/supabaseClient.js';
import { calculateReadinessScore } from '../services/gapAnalysis.js';
import { generateRoadmap } from '../services/geminiService.js';

const router = Router();

/**
 * GET /api/roadmap
 * Ambil roadmap terakhir yang sudah di-generate untuk user ini
 */
router.get('/', authGuard, async (req, res, next) => {
    try {
        const { data, error } = await supabase
            .from('roadmaps')
            .select('*, job_roles(name)')
            .eq('user_id', req.user.id)
            .order('created_at', { ascending: false })
            .limit(1)
            .single();

        if (error && error.code !== 'PGRST116') throw error;

        res.json({ roadmap: data || null });
    } catch (err) {
        next(err);
    }
});

/**
 * POST /api/roadmap/generate
 * Generate roadmap baru via Gemini berdasarkan gap skill saat ini
 */
router.post('/generate', authGuard, async (req, res, next) => {
    try {
        // Ambil profil user
        const { data: profile, error: profileError } = await supabase
            .from('profiles')
            .select('target_role_id, current_position, job_roles(name)')
            .eq('id', req.user.id)
            .single();

        if (profileError) throw profileError;

        if (!profile?.target_role_id) {
            return res.status(400).json({ error: 'Target role belum di-set. Lengkapi profil dulu.' });
        }

        // Hitung gap skill saat ini
        const { gapSkillIds, niceToHaveGapIds } = await calculateReadinessScore(req.user.id, profile.target_role_id);

        if (gapSkillIds.length === 0) {
            return res.json({
                message: 'Selamat! Kamu sudah memiliki semua skill yang dibutuhkan untuk role ini.',
                roadmap: null,
            });
        }

        // Ambil detail skill gap
        const { data: gapSkills, error: skillError } = await supabase
            .from('skills')
            .select('id, name, category')
            .in('id', gapSkillIds);

        if (skillError) throw skillError;

        // Ambil detail nice_to_have gap skills untuk memperkaya roadmap
        let bonusSkills = [];
        if (niceToHaveGapIds.length > 0) {
            const { data: nthData } = await supabase
                .from('skills')
                .select('id, name, category')
                .in('id', niceToHaveGapIds);
            bonusSkills = nthData || [];
        }

        // Generate roadmap via Gemini + RAG (required + nice_to_have)
        const roadmapContent = await generateRoadmap(
            profile.job_roles.name,
            profile.target_role_id,
            [...gapSkills, ...bonusSkills],
            profile.current_position || 'tidak diketahui'
        );

        if (roadmapContent.parseError) {
            return res.status(502).json({ error: 'AI gagal generate roadmap yang valid. Silakan coba lagi.' });
        }

        // Hapus roadmap lama untuk user+role yang sama (satu aktif per user per role)
        await supabase
            .from('roadmaps')
            .delete()
            .eq('user_id', req.user.id)
            .eq('target_role_id', profile.target_role_id);

        const { data: savedRoadmap, error: saveError } = await supabase
            .from('roadmaps')
            .insert({
                user_id: req.user.id,
                target_role_id: profile.target_role_id,
                content: roadmapContent,
                gap_skills: gapSkills,
            })
            .select()
            .single();

        if (saveError) throw saveError;

        res.json({ roadmap: savedRoadmap });
    } catch (err) {
        next(err);
    }
});

/**
 * PATCH /api/roadmap/:id/status
 * Update status roadmap (selesai, belum selesai, berjalan)
 */
router.patch('/:id/status', authGuard, async (req, res, next) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        // Validasi input status
        if (!['selesai', 'belum selesai', 'berjalan'].includes(status)) {
            return res.status(400).json({ error: 'Status tidak valid. Gunakan: selesai, belum selesai, atau berjalan.' });
        }

        const { data, error } = await supabase
            .from('roadmaps')
            .update({ status })
            .eq('id', id)
            .eq('user_id', req.user.id)
            .select()
            .single();

        if (error) {
            if (error.code === 'PGRST116') {
                return res.status(404).json({ error: 'Roadmap tidak ditemukan.' });
            }
            throw error;
        }

        res.json({ message: 'Status roadmap berhasil diupdate', roadmap: data });
    } catch (err) {
        next(err);
    }
});

export default router;

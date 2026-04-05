import { Router } from 'express';
import supabase from '../services/supabaseClient.js';
import { generateRoadmap } from '../services/geminiService.js';

const router = Router();

/**
 * Endpoint khusus Demo (tanpa Auth, tanpa Profile CRUD Zaky)
 * Biar Neezar bisa pamerin fitur RAG + Core Logic langsung!
 */

// GET /api/demo/roles
router.get('/roles', async (req, res, next) => {
    try {
        const { data, error } = await supabase.from('job_roles').select('*').order('name');
        if (error) throw error;
        res.json({ roles: data });
    } catch (err) {
        next(err);
    }
});

// GET /api/demo/skills (List all skills)
router.get('/skills', async (req, res, next) => {
    try {
        const { data, error } = await supabase.from('skills').select('*').order('name');
        if (error) throw error;
        res.json({ skills: data });
    } catch (err) {
        next(err);
    }
});

// GET /api/demo/roles/:id/skills (Get skills by role ID)
router.get('/roles/:id/skills', async (req, res, next) => {
    try {
        const { id } = req.params;
        const { data, error } = await supabase
            .from('job_role_skills')
            .select('importance, skills(*)')
            .eq('job_role_id', id);
            
        if (error) throw error;
        
        // Flatten structure
        const skills = data.map(item => ({
            ...item.skills,
            importance: item.importance
        }));
        
        res.json({ skills });
    } catch (err) {
        next(err);
    }
});

// POST /api/demo/roadmap
router.post('/roadmap', async (req, res, next) => {
    try {
        const { target_role_id, target_role_name, current_position } = req.body;

        // Ambil semua skill (required + nice_to_have) — demo mulai dari nol
        const { data: roleSkills, error: rsError } = await supabase
            .from('job_role_skills')
            .select('skills(id, name, category), importance')
            .eq('job_role_id', target_role_id);

        if (rsError) throw rsError;

        // Demo: user mulai dari 0, semua skill jadi gap
        const gapSkills = roleSkills.map((rs) => rs.skills).filter(Boolean);

        // Jalankan Core Logic lo: RAG + Gemini!
        const roadmapContent = await generateRoadmap(
            target_role_name,
            target_role_id,
            gapSkills,
            current_position || 'tidak diketahui'
        );

        if (roadmapContent.parseError) {
            return res.status(502).json({ error: 'AI gagal generate roadmap yang valid. Silakan coba lagi.' });
        }

        res.json({ roadmap: roadmapContent });
    } catch (err) {
        next(err);
    }
});

export default router;

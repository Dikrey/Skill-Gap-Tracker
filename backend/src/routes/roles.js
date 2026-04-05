import { Router } from 'express';
import supabase from '../services/supabaseClient.js';

const router = Router();

/**
 * GET /api/roles
 * Get all job roles
 */
router.get('/', async (req, res, next) => {
    try {
        const { data, error } = await supabase
            .from('job_roles')
            .select('*')
            .order('name');
            
        if (error) throw error;
        
        res.json({ roles: data });
    } catch (err) {
        next(err);
    }
});

/**
 * GET /api/roles/:id
 * Get single job role by ID
 */
router.get('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        
        const { data, error } = await supabase
            .from('job_roles')
            .select('*')
            .eq('id', id)
            .single();
            
        if (error) {
            if (error.code === 'PGRST116') {
                return res.status(404).json({ error: 'Role not found' });
            }
            throw error;
        }
        
        res.json({ role: data });
    } catch (err) {
        next(err);
    }
});

/**
 * GET /api/roles/:id/skills
 * Get all skills required for a specific role
 */
router.get('/:id/skills', async (req, res, next) => {
    try {
        const { id } = req.params;
        
        // Verify role exists
        const { data: role, error: roleError } = await supabase
            .from('job_roles')
            .select('id, name')
            .eq('id', id)
            .single();
            
        if (roleError) {
            if (roleError.code === 'PGRST116') {
                return res.status(404).json({ error: 'Role not found' });
            }
            throw roleError;
        }
        
        // Get skills for this role
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
        
        // Separate by importance
        const required = skills.filter(s => s.importance === 'required');
        const niceToHave = skills.filter(s => s.importance === 'nice_to_have');
        
        res.json({
            role: {
                id: role.id,
                name: role.name
            },
            skills: {
                required,
                nice_to_have: niceToHave,
                total: skills.length
            }
        });
    } catch (err) {
        next(err);
    }
});

/**
 * GET /api/roles/search
 * Search roles by name
 * Query params: ?q=frontend
 */
router.get('/search', async (req, res, next) => {
    try {
        const { q } = req.query;
        
        if (!q || q.trim().length === 0) {
            return res.status(400).json({ error: 'Query parameter "q" is required' });
        }
        
        const { data, error } = await supabase
            .from('job_roles')
            .select('*')
            .ilike('name', `%${q}%`)
            .order('name');
            
        if (error) throw error;
        
        res.json({ 
            query: q,
            count: data.length,
            roles: data 
        });
    } catch (err) {
        next(err);
    }
});

export default router;

import { Router } from 'express';
import supabase from '../services/supabaseClient.js';

const router = Router();

/**
 * GET /api/skills
 * Get all skills with optional filtering
 * Query params: ?category=programming
 */
router.get('/', async (req, res, next) => {
    try {
        const { category } = req.query;
        
        let query = supabase
            .from('skills')
            .select('*')
            .order('name');
        
        // Filter by category if provided
        if (category) {
            query = query.eq('category', category);
        }
        
        const { data, error } = await query;
        
        if (error) throw error;
        
        res.json({ 
            skills: data,
            count: data.length,
            ...(category && { category })
        });
    } catch (err) {
        next(err);
    }
});

/**
 * GET /api/skills/categories
 * Get all unique skill categories
 */
router.get('/categories', async (req, res, next) => {
    try {
        const { data, error } = await supabase
            .from('skills')
            .select('category')
            .order('category');
        
        if (error) throw error;
        
        // Get unique categories
        const categories = [...new Set(data.map(item => item.category))];
        
        res.json({ 
            categories,
            count: categories.length
        });
    } catch (err) {
        next(err);
    }
});

/**
 * GET /api/skills/:id
 * Get single skill by ID with resources
 */
router.get('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        
        // Get skill details
        const { data: skill, error: skillError } = await supabase
            .from('skills')
            .select('*')
            .eq('id', id)
            .single();
        
        if (skillError) {
            if (skillError.code === 'PGRST116') {
                return res.status(404).json({ error: 'Skill not found' });
            }
            throw skillError;
        }
        
        // Get learning resources for this skill
        const { data: resources, error: resourcesError } = await supabase
            .from('skill_resources')
            .select('id, title, type, url, platform')
            .eq('skill_id', id);
        
        if (resourcesError) throw resourcesError;
        
        res.json({ 
            skill,
            resources: resources || []
        });
    } catch (err) {
        next(err);
    }
});

/**
 * GET /api/skills/:id/resources
 * Get learning resources for a specific skill
 */
router.get('/:id/resources', async (req, res, next) => {
    try {
        const { id } = req.params;
        
        // Verify skill exists
        const { data: skill, error: skillError } = await supabase
            .from('skills')
            .select('id, name')
            .eq('id', id)
            .single();
        
        if (skillError) {
            if (skillError.code === 'PGRST116') {
                return res.status(404).json({ error: 'Skill not found' });
            }
            throw skillError;
        }
        
        // Get resources
        const { data: resources, error: resourcesError } = await supabase
            .from('skill_resources')
            .select('id, title, type, url, platform')
            .eq('skill_id', id);
        
        if (resourcesError) throw resourcesError;
        
        // Group by type
        const byType = {
            article: resources.filter(r => r.type === 'article'),
            video: resources.filter(r => r.type === 'video')
        };
        
        res.json({
            skill: {
                id: skill.id,
                name: skill.name
            },
            resources: resources || [],
            byType,
            total: resources.length
        });
    } catch (err) {
        next(err);
    }
});

/**
 * GET /api/skills/:id/roles
 * Get all roles that require this skill
 */
router.get('/:id/roles', async (req, res, next) => {
    try {
        const { id } = req.params;
        
        // Verify skill exists
        const { data: skill, error: skillError } = await supabase
            .from('skills')
            .select('id, name')
            .eq('id', id)
            .single();
        
        if (skillError) {
            if (skillError.code === 'PGRST116') {
                return res.status(404).json({ error: 'Skill not found' });
            }
            throw skillError;
        }
        
        // Get roles that require this skill
        const { data, error } = await supabase
            .from('job_role_skills')
            .select('importance, job_roles(*)')
            .eq('skill_id', id);
        
        if (error) throw error;
        
        // Flatten structure
        const roles = data.map(item => ({
            ...item.job_roles,
            importance: item.importance
        }));
        
        // Separate by importance
        const required = roles.filter(r => r.importance === 'required');
        const niceToHave = roles.filter(r => r.importance === 'nice_to_have');
        
        res.json({
            skill: {
                id: skill.id,
                name: skill.name
            },
            roles: {
                required,
                nice_to_have: niceToHave,
                total: roles.length
            }
        });
    } catch (err) {
        next(err);
    }
});

/**
 * GET /api/skills/search
 * Search skills by name
 * Query params: ?q=react
 */
router.get('/search', async (req, res, next) => {
    try {
        const { q } = req.query;
        
        if (!q || q.trim().length === 0) {
            return res.status(400).json({ error: 'Query parameter "q" is required' });
        }
        
        const { data, error } = await supabase
            .from('skills')
            .select('*')
            .ilike('name', `%${q}%`)
            .order('name');
        
        if (error) throw error;
        
        res.json({ 
            query: q,
            count: data.length,
            skills: data 
        });
    } catch (err) {
        next(err);
    }
});

export default router;

import express from 'express';
const router = express.Router();
import supabase from '../services/supabaseClient.js';

/**
 * GET /api/roadmap-progress/:roadmapId
 * Ambil semua status fase untuk roadmap tertentu
 */
router.get('/:roadmapId', async (req, res) => {
  try {
    const { roadmapId } = req.params;
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const { data, error } = await supabase
      .from('roadmap_phase_progress')
      .select('*')
      .eq('user_id', userId)
      .eq('roadmap_id', roadmapId)
      .order('phase', { ascending: true });

    if (error) throw error;

    res.json({ progress: data || [] });
  } catch (err) {
    console.error('Error fetching roadmap progress:', err);
    res.status(500).json({ error: err.message });
  }
});

/**
 * POST /api/roadmap-progress
 * Update status fase roadmap
 * Body: { roadmapId, phase, status }
 */
router.post('/', async (req, res) => {
  try {
    const { roadmapId, phase, status } = req.body;
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    if (!roadmapId || !phase || !status) {
      return res.status(400).json({ 
        error: 'Missing required fields: roadmapId, phase, status' 
      });
    }

    if (!['belum', 'berjalan', 'selesai'].includes(status)) {
      return res.status(400).json({ 
        error: 'Invalid status. Must be: belum, berjalan, or selesai' 
      });
    }

    // Prepare data
    const progressData = {
      user_id: userId,
      roadmap_id: roadmapId,
      phase: parseInt(phase),
      status,
    };

    // Set timestamps based on status
    if (status === 'berjalan') {
      progressData.started_at = new Date().toISOString();
      progressData.completed_at = null;
    } else if (status === 'selesai') {
      progressData.completed_at = new Date().toISOString();
    } else if (status === 'belum') {
      progressData.started_at = null;
      progressData.completed_at = null;
    }

    // Upsert (insert or update)
    const { data, error } = await supabase
      .from('roadmap_phase_progress')
      .upsert(progressData, {
        onConflict: 'user_id,roadmap_id,phase',
      })
      .select()
      .single();

    if (error) throw error;

    res.json({ 
      success: true, 
      progress: data,
      message: `Phase ${phase} status updated to ${status}` 
    });
  } catch (err) {
    console.error('Error updating roadmap progress:', err);
    res.status(500).json({ error: err.message });
  }
});

/**
 * DELETE /api/roadmap-progress/:roadmapId
 * Hapus semua progress untuk roadmap tertentu (saat generate roadmap baru)
 */
router.delete('/:roadmapId', async (req, res) => {
  try {
    const { roadmapId } = req.params;
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const { error } = await supabase
      .from('roadmap_phase_progress')
      .delete()
      .eq('user_id', userId)
      .eq('roadmap_id', roadmapId);

    if (error) throw error;

    res.json({ 
      success: true, 
      message: 'Roadmap progress cleared' 
    });
  } catch (err) {
    console.error('Error deleting roadmap progress:', err);
    res.status(500).json({ error: err.message });
  }
});

export default router;

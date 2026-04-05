import supabase from '../services/supabaseClient.js';

/**
 * Middleware untuk verifikasi JWT dari Supabase.
 * Frontend harus kirim header: Authorization: Bearer <access_token>
 */
const authGuard = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Unauthorized: No token provided' });
    }

    const token = authHeader.split(' ')[1];

    const { data, error } = await supabase.auth.getUser(token);

    if (error || !data?.user) {
        return res.status(401).json({ error: 'Unauthorized: Invalid or expired token' });
    }

    req.user = data.user; // attach user ke request
    next();
};

export default authGuard;

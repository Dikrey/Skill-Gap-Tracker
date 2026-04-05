import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';

import analysisRoutes from './routes/analysis.js';
import roadmapRoutes from './routes/roadmap.js';
import roadmapProgressRoutes from './routes/roadmapProgress.js';
import rolesRoutes from './routes/roles.js';
import skillsRoutes from './routes/skills.js';
import demoRoutes from './routes/demo.js';
import errorHandler from './middleware/errorHandler.js';
import authGuard from './middleware/authGuard.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// ── Middleware ──────────────────────────────────────────────────
app.use(helmet());
app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));
app.use(morgan('dev'));
app.use(express.json());

// ── Routes (Neezar) ─────────────────────────────────────────────
app.use('/api/analysis', analysisRoutes);
app.use('/api/roadmap', roadmapRoutes);
app.use('/api/roadmap-progress', authGuard, roadmapProgressRoutes);
app.use('/api/roles', rolesRoutes);
app.use('/api/skills', skillsRoutes);
app.use('/api/demo', demoRoutes); // Rute bypass untuk demo Neezar

// TODO (Zaky): tambahkan routes auth, profile, progress di sini

// Health check
app.get('/', (req, res) => res.send('Skill Gap Tracker API is running 🚀'));
app.get('/health', (req, res) => res.json({ status: 'ok' }));

// ── Error Handler ────────────────────────────────────────────────
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});

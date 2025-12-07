// backend/src/routes/healthRoutes.js
import { Router } from 'express';
import { healthCheck } from '../controllers/healthController.js';

const router = Router();

router.get('/', healthCheck);

export default router;

// -----------------------------------
// ⭐ PUBLIC ROUTES (NO AUTH REQUIRED)
// -----------------------------------
app.use('/api/health', healthRoutes);
app.use('/api/auth', authRoutes);

// -----------------------------------
// 🔐 PROTECTED ROUTES (JWT REQUIRED)
// -----------------------------------
app.use('/api/upload', requireAuth, uploadRoutes);
app.use('/api/analyses', requireAuth, analysisRoutes);


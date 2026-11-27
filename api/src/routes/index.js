// Router raíz. Los routers de cada módulo (auth, courses, lessons, questions, enrollments, progress) se montan aquí en fases posteriores.
import { Router } from 'express';
import { getHealth } from '../controllers/health.controller.js';
import authRoutes from './auth.routes.js';

const router = Router();

router.get('/health', getHealth);
router.use('/auth', authRoutes);

export default router;

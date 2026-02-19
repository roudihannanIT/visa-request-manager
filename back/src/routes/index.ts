import { Router } from 'express';
import applicationRoutes from './application.routes';
import documentRoutes from './document.routes';

const router = Router();

router.use('/applications', applicationRoutes);
router.use('/applications/:applicationId/documents', documentRoutes);

export default router;
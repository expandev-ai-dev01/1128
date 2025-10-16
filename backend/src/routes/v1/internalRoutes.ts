/**
 * @summary
 * Internal (authenticated) API routes configuration.
 * Contains protected endpoints that require authentication.
 *
 * @module routes/v1/internalRoutes
 */

import { Router } from 'express';
import taskRoutes from './taskRoutes';

const router = Router();

// Task routes - /api/v1/internal/task
router.use('/task', taskRoutes);

export default router;

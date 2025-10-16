/**
 * @summary
 * Main API router with version management.
 * Routes all API requests to appropriate version handlers.
 *
 * @module routes
 */

import { Router } from 'express';
import v1Routes from './v1';

const router = Router();

// Version 1 (current stable)
router.use('/v1', v1Routes);

// Future versions can be added here
// router.use('/v2', v2Routes);

export default router;

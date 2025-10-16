/**
 * @summary
 * Task route definitions.
 * Maps HTTP methods to task controller handlers.
 *
 * @module routes/v1/taskRoutes
 */

import { Router } from 'express';
import * as taskController from '@/api/v1/internal/task/controller';

const router = Router();

/**
 * @route POST /task
 * @description Create new task
 */
router.post('/', taskController.postHandler);

/**
 * @route GET /task
 * @description List all tasks
 */
router.get('/', taskController.getHandler);

export default router;

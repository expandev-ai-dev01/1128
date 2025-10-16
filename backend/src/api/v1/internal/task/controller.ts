/**
 * @summary
 * Task CRUD operations controller.
 * Handles task creation and listing with validation.
 *
 * @controller taskController
 * @schema functional
 * @type controller
 *
 * @endpoints
 * - POST /api/v1/internal/task
 * - GET /api/v1/internal/task
 */

import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { successResponse, errorResponse } from '@/utils/response';
import { zName, zNullableDescription, zDateString } from '@/utils/validation';
import { taskCreate, taskList, TaskPriority } from '@/services/task';

/**
 * @summary
 * Validation schema for task creation
 */
const createTaskSchema = z.object({
  titulo: zName,
  descricao: zNullableDescription,
  dataVencimento: zDateString,
  prioridade: z.nativeEnum(TaskPriority),
});

/**
 * @api {post} /api/v1/internal/task Create Task
 * @apiName CreateTask
 * @apiGroup Task
 * @apiVersion 1.0.0
 *
 * @apiDescription Creates a new task with validation
 *
 * @apiParam {String} titulo Task title (3-100 characters)
 * @apiParam {String} [descricao] Task description (max 500 characters)
 * @apiParam {String} dataVencimento Due date (ISO format, cannot be in past)
 * @apiParam {Number} prioridade Priority level (0=Baixa, 1=Media, 2=Alta)
 *
 * @apiSuccess {String} id Task identifier (UUID)
 * @apiSuccess {String} titulo Task title
 * @apiSuccess {String} descricao Task description
 * @apiSuccess {Date} dataVencimento Due date
 * @apiSuccess {Number} prioridade Priority level
 * @apiSuccess {Number} status Task status (0=Pendente, 1=Concluida, 2=Vencida)
 * @apiSuccess {Date} dataCriacao Creation timestamp
 *
 * @apiError {String} ValidationError Invalid parameters provided
 * @apiError {String} BusinessRuleError Business rule violation
 */
export async function postHandler(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    /**
     * @validation Validate request body against schema
     */
    const validatedData = createTaskSchema.parse(req.body);

    /**
     * @rule {be-business-logic} Create task with business rules
     */
    const task = await taskCreate({
      titulo: validatedData.titulo,
      descricao: validatedData.descricao,
      dataVencimento: new Date(validatedData.dataVencimento),
      prioridade: validatedData.prioridade,
    });

    res.status(201).json(successResponse(task));
  } catch (error: any) {
    /**
     * @remarks Handle validation errors
     */
    if (error.name === 'ZodError') {
      res.status(400).json(errorResponse('Validation failed', 'VALIDATION_ERROR', error.errors));
    } else if (
      /**
       * @remarks Handle business rule errors
       */
      [
        'tituloObrigatorio',
        'tituloMuitoCurto',
        'tituloMuitoLongo',
        'tituloApenasEspacos',
        'descricaoMuitoLonga',
        'dataVencimentoPassado',
        'prioridadeInvalida',
        'tituloDuplicado',
      ].includes(error.message)
    ) {
      res.status(400).json(errorResponse(error.message, 'BUSINESS_RULE_ERROR'));
    } else {
      next(error);
    }
  }
}

/**
 * @api {get} /api/v1/internal/task List Tasks
 * @apiName ListTasks
 * @apiGroup Task
 * @apiVersion 1.0.0
 *
 * @apiDescription Retrieves all tasks with automatic status updates
 *
 * @apiSuccess {Array} tasks Array of task objects
 * @apiSuccess {String} tasks.id Task identifier
 * @apiSuccess {String} tasks.titulo Task title
 * @apiSuccess {String} tasks.descricao Task description
 * @apiSuccess {Date} tasks.dataVencimento Due date
 * @apiSuccess {Number} tasks.prioridade Priority level
 * @apiSuccess {Number} tasks.status Task status
 * @apiSuccess {Date} tasks.dataCriacao Creation timestamp
 *
 * @apiError {String} ServerError Internal server error
 */
export async function getHandler(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    /**
     * @rule {be-business-rule-002} Retrieve tasks with automatic status update
     */
    const tasks = await taskList();

    res.json(successResponse(tasks));
  } catch (error: any) {
    next(error);
  }
}

/**
 * @summary
 * Task business logic and validation rules.
 * Handles task creation, validation, and status management.
 *
 * @module services/task/taskRules
 * @domain task
 */

import { v4 as uuidv4 } from 'uuid';
import { TaskEntity, TaskCreateRequest, TaskPriority, TaskStatus } from './taskTypes';

/**
 * @summary
 * In-memory storage for tasks during session
 *
 * @rule {be-business-rule-004} Tasks are stored only in memory during user session
 */
const taskStorage: Map<string, TaskEntity> = new Map();

/**
 * @summary
 * Creates a new task with validation and automatic field generation
 *
 * @function taskCreate
 * @module task
 *
 * @param {TaskCreateRequest} params - Task creation parameters
 * @param {string} params.titulo - Task title (3-100 characters)
 * @param {string} [params.descricao] - Task description (max 500 characters)
 * @param {Date} params.dataVencimento - Due date (cannot be in the past)
 * @param {TaskPriority} params.prioridade - Priority level
 *
 * @returns {Promise<TaskEntity>} Created task entity
 *
 * @throws {ValidationError} When parameters fail validation
 * @throws {BusinessRuleError} When business rules are violated
 */
export async function taskCreate(params: TaskCreateRequest): Promise<TaskEntity> {
  /**
   * @validation Validate titulo length and content
   * @throw {tituloObrigatorio}
   * @throw {tituloMuitoCurto}
   * @throw {tituloMuitoLongo}
   * @throw {tituloApenasEspacos}
   */
  if (!params.titulo || params.titulo.trim().length === 0) {
    throw new Error('tituloObrigatorio');
  }

  if (params.titulo.trim().length < 3) {
    throw new Error('tituloMuitoCurto');
  }

  if (params.titulo.length > 100) {
    throw new Error('tituloMuitoLongo');
  }

  if (params.titulo.trim().length === 0) {
    throw new Error('tituloApenasEspacos');
  }

  /**
   * @validation Validate descricao length if provided
   * @throw {descricaoMuitoLonga}
   */
  if (params.descricao && params.descricao.length > 500) {
    throw new Error('descricaoMuitoLonga');
  }

  /**
   * @validation Validate dataVencimento is not in the past
   * @throw {dataVencimentoPassado}
   */
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const dueDate = new Date(params.dataVencimento);
  dueDate.setHours(0, 0, 0, 0);

  if (dueDate < today) {
    throw new Error('dataVencimentoPassado');
  }

  /**
   * @validation Validate prioridade is valid enum value
   * @throw {prioridadeInvalida}
   */
  if (![TaskPriority.Baixa, TaskPriority.Media, TaskPriority.Alta].includes(params.prioridade)) {
    throw new Error('prioridadeInvalida');
  }

  /**
   * @rule {be-business-rule-001} Validate titulo is unique
   * @throw {tituloDuplicado}
   */
  const existingTask = Array.from(taskStorage.values()).find(
    (task) => task.titulo.toLowerCase() === params.titulo.toLowerCase()
  );

  if (existingTask) {
    throw new Error('tituloDuplicado');
  }

  /**
   * @rule {be-business-rule-002} Automatically mark as Vencida if due date is in the past
   */
  const status = dueDate < today ? TaskStatus.Vencida : TaskStatus.Pendente;

  /**
   * @rule {db-field-generation} Generate system fields
   */
  const task: TaskEntity = {
    id: uuidv4(),
    titulo: params.titulo,
    descricao: params.descricao || '',
    dataVencimento: params.dataVencimento,
    prioridade: params.prioridade,
    status: status,
    dataCriacao: new Date(),
  };

  /**
   * @rule {be-business-rule-004} Store task in memory
   */
  taskStorage.set(task.id, task);

  return task;
}

/**
 * @summary
 * Retrieves all tasks and updates expired tasks status
 *
 * @function taskList
 * @module task
 *
 * @returns {Promise<TaskEntity[]>} Array of all tasks
 */
export async function taskList(): Promise<TaskEntity[]> {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  /**
   * @rule {be-business-rule-002} Update status of expired tasks
   */
  taskStorage.forEach((task) => {
    const dueDate = new Date(task.dataVencimento);
    dueDate.setHours(0, 0, 0, 0);

    if (dueDate < today && task.status === TaskStatus.Pendente) {
      task.status = TaskStatus.Vencida;
    }
  });

  return Array.from(taskStorage.values());
}

/**
 * @summary
 * Retrieves a specific task by ID
 *
 * @function taskGet
 * @module task
 *
 * @param {string} id - Task identifier
 *
 * @returns {Promise<TaskEntity | null>} Task entity or null if not found
 */
export async function taskGet(id: string): Promise<TaskEntity | null> {
  const task = taskStorage.get(id);
  return task || null;
}

/**
 * @summary
 * Clears all tasks from memory (for testing purposes)
 *
 * @function taskClear
 * @module task
 *
 * @returns {Promise<void>}
 */
export async function taskClear(): Promise<void> {
  taskStorage.clear();
}

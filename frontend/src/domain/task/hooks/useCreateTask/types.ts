/**
 * @types useCreateTask
 * @summary Type definitions for useCreateTask hook
 * @domain task
 * @category types
 */

import type { Task, CreateTaskDto } from '../../types';

export interface UseCreateTaskOptions {
  onSuccess?: (task: Task) => void;
  onError?: (error: Error) => void;
}

export interface UseCreateTaskReturn {
  createTask: (data: CreateTaskDto) => Promise<Task>;
  isCreating: boolean;
  error: Error | null;
}

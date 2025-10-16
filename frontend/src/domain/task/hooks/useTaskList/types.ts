/**
 * @types useTaskList
 * @summary Type definitions for useTaskList hook
 * @domain task
 * @category types
 */

import type { Task } from '../../types';

export interface UseTaskListReturn {
  tasks: Task[];
  pendingTasks: Task[];
  overdueTasks: Task[];
  isLoading: boolean;
  error: Error | null;
  refetch: () => void;
}

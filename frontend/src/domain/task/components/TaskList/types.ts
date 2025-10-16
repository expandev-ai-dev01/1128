/**
 * @types TaskList
 * @summary Type definitions for TaskList component
 * @domain task
 * @category types
 */

import type { Task } from '../../types';

export interface TaskListProps {
  tasks: Task[];
  title: string;
  emptyMessage?: string;
}

/**
 * @types TaskForm
 * @summary Type definitions for TaskForm component
 * @domain task
 * @category types
 */

import type { Task } from '../../types';

export interface TaskFormProps {
  onSuccess?: (task: Task) => void;
  onCancel?: () => void;
}

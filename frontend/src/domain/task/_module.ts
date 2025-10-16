/**
 * @module task
 * @summary Task management domain module
 * @domain functional
 * @version 1.0.0
 */

export * from './components/TaskForm';
export * from './components/TaskCard';
export * from './components/TaskList';
export * from './hooks/useTaskList';
export * from './hooks/useCreateTask';
export * from './services/taskService';
export * from './types';
export * from './utils/validation';
export * from './utils/formatters';

export const moduleMetadata = {
  name: 'task',
  domain: 'functional',
  version: '1.0.0',
  publicComponents: ['TaskForm', 'TaskCard', 'TaskList'],
  publicHooks: ['useTaskList', 'useCreateTask'],
  publicServices: ['taskService'],
  dependencies: {
    internal: ['@/core/components', '@/core/utils', '@/core/lib'],
    external: ['react', 'react-hook-form', 'zod', '@tanstack/react-query', 'axios'],
    domains: [],
  },
  exports: {
    components: ['TaskForm', 'TaskCard', 'TaskList'],
    hooks: ['useTaskList', 'useCreateTask'],
    services: ['taskService'],
    types: ['Task', 'TaskPriority', 'TaskStatus', 'CreateTaskDto', 'TaskFormData'],
    utils: [
      'taskFormSchema',
      'formatPriority',
      'formatStatus',
      'getPriorityColor',
      'getStatusColor',
    ],
  },
} as const;

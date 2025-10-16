/**
 * @utility formatters
 * @summary Task-specific formatting utilities
 * @domain task
 * @type utility-function
 * @category formatting
 */

import { TaskPriority, TaskStatus } from '../types';

export const formatPriority = (priority: TaskPriority): string => {
  const priorityMap = {
    [TaskPriority.Baixa]: 'Baixa',
    [TaskPriority.Media]: 'Média',
    [TaskPriority.Alta]: 'Alta',
  };
  return priorityMap[priority];
};

export const formatStatus = (status: TaskStatus): string => {
  const statusMap = {
    [TaskStatus.Pendente]: 'Pendente',
    [TaskStatus.Concluida]: 'Concluída',
    [TaskStatus.Vencida]: 'Vencida',
  };
  return statusMap[status];
};

export const getPriorityColor = (priority: TaskPriority): string => {
  const colorMap = {
    [TaskPriority.Baixa]: 'text-green-600 bg-green-50',
    [TaskPriority.Media]: 'text-yellow-600 bg-yellow-50',
    [TaskPriority.Alta]: 'text-red-600 bg-red-50',
  };
  return colorMap[priority];
};

export const getStatusColor = (status: TaskStatus): string => {
  const colorMap = {
    [TaskStatus.Pendente]: 'text-blue-600 bg-blue-50',
    [TaskStatus.Concluida]: 'text-green-600 bg-green-50',
    [TaskStatus.Vencida]: 'text-red-600 bg-red-50',
  };
  return colorMap[status];
};

/**
 * @hook useTaskList
 * @summary Manages task list with automatic categorization
 * @domain task
 * @type domain-hook
 * @category data
 *
 * @description
 * Fetches tasks from API and categorizes them into pending and overdue.
 * Implements automatic status checking based on due dates.
 */

import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { taskService } from '../../services/taskService';
import { TaskStatus } from '../../types';
import type { UseTaskListReturn } from './types';

export const useTaskList = (): UseTaskListReturn => {
  const queryKey = ['tasks'];

  const { data, isLoading, error, refetch } = useQuery({
    queryKey,
    queryFn: () => taskService.list(),
    staleTime: 2 * 60 * 1000,
  });

  const tasks = data || [];

  const { pendingTasks, overdueTasks } = useMemo(() => {
    const pending = tasks.filter((task) => task.status === TaskStatus.Pendente);
    const overdue = tasks.filter((task) => task.status === TaskStatus.Vencida);

    return { pendingTasks: pending, overdueTasks: overdue };
  }, [tasks]);

  return {
    tasks,
    pendingTasks,
    overdueTasks,
    isLoading,
    error: error as Error | null,
    refetch,
  };
};

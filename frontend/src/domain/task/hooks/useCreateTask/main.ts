/**
 * @hook useCreateTask
 * @summary Manages task creation with validation and cache updates
 * @domain task
 * @type domain-hook
 * @category data
 *
 * @description
 * Handles task creation with automatic cache invalidation and success/error callbacks.
 */

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { taskService } from '../../services/taskService';
import type { UseCreateTaskOptions, UseCreateTaskReturn } from './types';

export const useCreateTask = (options: UseCreateTaskOptions = {}): UseCreateTaskReturn => {
  const { onSuccess, onError } = options;
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: taskService.create,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      onSuccess?.(data);
    },
    onError: (error: Error) => {
      onError?.(error);
    },
  });

  return {
    createTask: mutation.mutateAsync,
    isCreating: mutation.isPending,
    error: mutation.error as Error | null,
  };
};

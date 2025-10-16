/**
 * @component TaskForm
 * @summary Form for creating new tasks with validation
 * @domain task
 * @type domain-component
 * @category form
 *
 * @description
 * Implements task creation form with React Hook Form and Zod validation.
 * Handles all field validations according to business rules.
 */

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/core/components/Button';
import { useCreateTask } from '../../hooks/useCreateTask';
import { taskFormSchema, type TaskFormSchema } from '../../utils/validation';
import { TaskPriority } from '../../types';
import type { TaskFormProps } from './types';

export const TaskForm = ({ onSuccess, onCancel }: TaskFormProps) => {
  const { createTask, isCreating } = useCreateTask({
    onSuccess: (task) => {
      reset();
      onSuccess?.(task);
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TaskFormSchema>({
    resolver: zodResolver(taskFormSchema),
    defaultValues: {
      titulo: '',
      descricao: '',
      dataVencimento: '',
      prioridade: TaskPriority.Media,
    },
  });

  const onSubmit = async (data: TaskFormSchema) => {
    try {
      await createTask({
        titulo: data.titulo,
        descricao: data.descricao || undefined,
        dataVencimento: data.dataVencimento,
        prioridade: data.prioridade,
      });
    } catch (error) {
      console.error('Failed to create task:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label htmlFor="titulo" className="block text-sm font-medium text-gray-700 mb-2">
          Título <span className="text-red-500">*</span>
        </label>
        <input
          id="titulo"
          type="text"
          {...register('titulo')}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          placeholder="Digite o título da tarefa"
        />
        {errors.titulo && <p className="mt-1 text-sm text-red-600">{errors.titulo.message}</p>}
      </div>

      <div>
        <label htmlFor="descricao" className="block text-sm font-medium text-gray-700 mb-2">
          Descrição
        </label>
        <textarea
          id="descricao"
          {...register('descricao')}
          rows={4}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          placeholder="Digite uma descrição detalhada (opcional)"
        />
        {errors.descricao && (
          <p className="mt-1 text-sm text-red-600">{errors.descricao.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="dataVencimento" className="block text-sm font-medium text-gray-700 mb-2">
          Data de Vencimento <span className="text-red-500">*</span>
        </label>
        <input
          id="dataVencimento"
          type="date"
          {...register('dataVencimento')}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        />
        {errors.dataVencimento && (
          <p className="mt-1 text-sm text-red-600">{errors.dataVencimento.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="prioridade" className="block text-sm font-medium text-gray-700 mb-2">
          Prioridade <span className="text-red-500">*</span>
        </label>
        <select
          id="prioridade"
          {...register('prioridade', { valueAsNumber: true })}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        >
          <option value={TaskPriority.Baixa}>Baixa</option>
          <option value={TaskPriority.Media}>Média</option>
          <option value={TaskPriority.Alta}>Alta</option>
        </select>
        {errors.prioridade && (
          <p className="mt-1 text-sm text-red-600">{errors.prioridade.message}</p>
        )}
      </div>

      <div className="flex gap-4">
        <Button type="submit" fullWidth isLoading={isCreating}>
          Criar Tarefa
        </Button>
        {onCancel && (
          <Button type="button" variant="outline" fullWidth onClick={onCancel}>
            Cancelar
          </Button>
        )}
      </div>
    </form>
  );
};

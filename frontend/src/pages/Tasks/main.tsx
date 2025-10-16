/**
 * @page TasksPage
 * @summary Main tasks page with creation form and task lists
 * @domain task
 * @type page-component
 * @category task-management
 *
 * @routing
 * - Path: /tasks
 * - Params: none
 * - Query: none
 *
 * @layout
 * - Layout: RootLayout
 * - Sections: Form, Pending Tasks, Overdue Tasks
 *
 * @data
 * - Sources: Task API
 * - Loading: Skeleton loading states
 * - Caching: 2 minutes stale time
 */

import { useState } from 'react';
import { TaskForm } from '@/domain/task/components/TaskForm';
import { TaskList } from '@/domain/task/components/TaskList';
import { useTaskList } from '@/domain/task/hooks/useTaskList';
import { LoadingSpinner } from '@/core/components/LoadingSpinner';
import { Button } from '@/core/components/Button';

export const TasksPage = () => {
  const [showForm, setShowForm] = useState(false);
  const { pendingTasks, overdueTasks, isLoading, error } = useTaskList();

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-red-800 mb-2">Erro ao carregar tarefas</h2>
          <p className="text-red-600">{error.message}</p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold text-gray-900">Minhas Tarefas</h1>
          <Button onClick={() => setShowForm(!showForm)}>
            {showForm ? 'Cancelar' : 'Nova Tarefa'}
          </Button>
        </div>

        {showForm && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Criar Nova Tarefa</h2>
            <TaskForm onSuccess={() => setShowForm(false)} onCancel={() => setShowForm(false)} />
          </div>
        )}

        <TaskList
          tasks={pendingTasks}
          title="Tarefas Pendentes"
          emptyMessage="Você não tem tarefas pendentes"
        />

        {overdueTasks.length > 0 && (
          <TaskList
            tasks={overdueTasks}
            title="Tarefas Vencidas"
            emptyMessage="Você não tem tarefas vencidas"
          />
        )}
      </div>
    </div>
  );
};

export default TasksPage;

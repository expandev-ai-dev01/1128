/**
 * @component TaskList
 * @summary Displays a list of tasks with title and empty state
 * @domain task
 * @type domain-component
 * @category display
 *
 * @description
 * Renders a list of task cards with proper empty state handling.
 */

import { TaskCard } from '../TaskCard';
import type { TaskListProps } from './types';

export const TaskList = ({
  tasks,
  title,
  emptyMessage = 'Nenhuma tarefa encontrada',
}: TaskListProps) => {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">{title}</h2>
      {tasks.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <p className="text-gray-500">{emptyMessage}</p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {tasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
      )}
    </div>
  );
};

/**
 * @component TaskCard
 * @summary Displays task information in a card format
 * @domain task
 * @type domain-component
 * @category display
 *
 * @description
 * Shows task details with priority and status indicators.
 */

import { formatDate } from '@/core/utils/formatDate';
import {
  formatPriority,
  formatStatus,
  getPriorityColor,
  getStatusColor,
} from '../../utils/formatters';
import type { TaskCardProps } from './types';

export const TaskCard = ({ task }: TaskCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">{task.titulo}</h3>
        <div className="flex gap-2">
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium ${getPriorityColor(
              task.prioridade
            )}`}
          >
            {formatPriority(task.prioridade)}
          </span>
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(task.status)}`}
          >
            {formatStatus(task.status)}
          </span>
        </div>
      </div>

      {task.descricao && <p className="text-gray-600 mb-4 line-clamp-3">{task.descricao}</p>}

      <div className="flex items-center justify-between text-sm text-gray-500">
        <div>
          <span className="font-medium">Vencimento:</span>{' '}
          {formatDate(task.dataVencimento, 'dd/MM/yyyy')}
        </div>
        <div>
          <span className="font-medium">Criada:</span> {formatDate(task.dataCriacao, 'dd/MM/yyyy')}
        </div>
      </div>
    </div>
  );
};

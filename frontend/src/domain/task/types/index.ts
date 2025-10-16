/**
 * @types Task
 * @summary Task domain type definitions
 * @domain task
 * @category types
 */

export enum TaskPriority {
  Baixa = 0,
  Media = 1,
  Alta = 2,
}

export enum TaskStatus {
  Pendente = 0,
  Concluida = 1,
  Vencida = 2,
}

export interface Task {
  id: string;
  titulo: string;
  descricao: string | null;
  dataVencimento: string;
  prioridade: TaskPriority;
  status: TaskStatus;
  dataCriacao: string;
}

export interface CreateTaskDto {
  titulo: string;
  descricao?: string;
  dataVencimento: string;
  prioridade: TaskPriority;
}

export interface TaskFormData {
  titulo: string;
  descricao: string;
  dataVencimento: string;
  prioridade: TaskPriority;
}

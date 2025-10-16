/**
 * @types Task
 * @summary Type definitions for task domain
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

export interface TaskEntity {
  id: string;
  titulo: string;
  descricao: string;
  dataVencimento: Date;
  prioridade: TaskPriority;
  status: TaskStatus;
  dataCriacao: Date;
}

export interface TaskCreateRequest {
  titulo: string;
  descricao?: string;
  dataVencimento: Date;
  prioridade: TaskPriority;
}

export interface TaskCreateResponse {
  id: string;
  titulo: string;
  descricao: string;
  dataVencimento: Date;
  prioridade: TaskPriority;
  status: TaskStatus;
  dataCriacao: Date;
}

/**
 * @utility validation
 * @summary Task validation utilities and schemas
 * @domain task
 * @type utility-function
 * @category validation
 */

import { z } from 'zod';
import { TaskPriority } from '../types';

export const taskFormSchema = z.object({
  titulo: z
    .string()
    .min(3, 'O título deve ter pelo menos 3 caracteres')
    .max(100, 'O título não pode exceder 100 caracteres')
    .refine((val) => val.trim().length > 0, {
      message: 'O título não pode conter apenas espaços em branco',
    }),
  descricao: z
    .string()
    .max(500, 'A descrição não pode exceder 500 caracteres')
    .optional()
    .or(z.literal('')),
  dataVencimento: z.string().refine(
    (val) => {
      const date = new Date(val);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return date >= today;
    },
    {
      message: 'A data de vencimento não pode ser anterior à data atual',
    }
  ),
  prioridade: z.nativeEnum(TaskPriority),
});

export type TaskFormSchema = z.infer<typeof taskFormSchema>;

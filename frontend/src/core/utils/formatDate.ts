/**
 * @utility formatDate
 * @summary Date formatting utilities
 * @domain core
 * @type utility-function
 * @category formatting
 */

import { format, formatDistanceToNow, isValid, parseISO } from 'date-fns';

export const formatDate = (date: Date | string, formatStr: string = 'PPP'): string => {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;

  if (!isValid(dateObj)) {
    return 'Invalid date';
  }

  return format(dateObj, formatStr);
};

export const formatRelativeDate = (date: Date | string): string => {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;

  if (!isValid(dateObj)) {
    return 'Invalid date';
  }

  return formatDistanceToNow(dateObj, { addSuffix: true });
};

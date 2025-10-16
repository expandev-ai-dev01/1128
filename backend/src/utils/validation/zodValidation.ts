/**
 * @summary
 * Zod validation utilities for common field types
 *
 * @module utils/validation/zodValidation
 */

import { z } from 'zod';

/**
 * @summary String validation with length constraints
 */
export const zString = z.string().min(1, 'stringRequired');

/**
 * @summary Nullable string validation
 */
export const zNullableString = z.string().nullable();

/**
 * @summary Name validation (3-100 characters)
 */
export const zName = z
  .string()
  .min(3, 'nameTooShort')
  .max(100, 'nameTooLong')
  .refine((val) => val.trim().length > 0, 'nameOnlySpaces');

/**
 * @summary Description validation (max 500 characters, optional)
 */
export const zNullableDescription = z.string().max(500, 'descriptionTooLong').optional();

/**
 * @summary Date string validation (ISO format)
 */
export const zDateString = z.string().refine((val) => !isNaN(Date.parse(val)), 'invalidDate');

/**
 * @summary Bit validation (0 or 1)
 */
export const zBit = z.number().int().min(0).max(1);

/**
 * @summary Foreign key validation (positive integer)
 */
export const zFK = z.number().int().positive('invalidForeignKey');

/**
 * @summary Nullable foreign key validation
 */
export const zNullableFK = z.number().int().positive().nullable();

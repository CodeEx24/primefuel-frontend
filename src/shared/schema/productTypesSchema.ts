import { z } from 'zod';

// Base product type schema
const baseProductTypeSchema = z.object({
  name: z
    .string()
    .min(4, 'Must have at least 4 characters')
    .regex(
      /^[a-zA-Z0-9 ]+$/,
      'Name can only contain letters, numbers, and spaces'
    ),
  description: z
    .string()
    .min(10, 'Must have at least 10 characters')
    .regex(
      /^[a-zA-Z0-9 ]+$/,
      'Description can only contain letters, numbers, and spaces'
    ),
});

// Add product type schema
export const productTypeSchema = baseProductTypeSchema;

// Table product type schema
export const tableProductTypesSchema = baseProductTypeSchema.extend({
  _id: z.string(), // Required for table
  createdBy: z.string(), // Required for table
});

export type TableProductType = z.infer<typeof tableProductTypesSchema>;

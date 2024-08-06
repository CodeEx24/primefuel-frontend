import { z } from 'zod';

// Base product schema without superRefine
const baseProductSchema = z.object({
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
  type: z.string().min(1, 'Product type is required').optional(), // Should be validated in backend
});

// Adding superRefine to the product schema
export const productSchema = baseProductSchema;

// Merging table schema with product schema
export const tableProductSchema = z
  .object({
    _id: z.string(),
    type_name: z.string(),
  })
  .merge(baseProductSchema);

// Table itself
export type TableProduct = z.infer<typeof tableProductSchema>;

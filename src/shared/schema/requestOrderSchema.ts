import { z } from 'zod';

const baseRequestOrderSchema = z.object({
  branch: z.string().min(1, 'Branch is required'),
  products: z
    .array(
      z.object({
        productId: z.string().min(1, 'Product name is required'),
        quantityLiters: z
          .number()
          .positive('Quantity must be a positive number'),
      })
    )
    .min(1, 'Must have at least one product'),
});

// Add branch schema
export const requestOrderSchema = baseRequestOrderSchema;

// Table branch schema
export const tableRequestOrderSchema = baseRequestOrderSchema.extend({
  _id: z.string(),
});

export type TableRequestOrder = z.infer<typeof tableRequestOrderSchema>;

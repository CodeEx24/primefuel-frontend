import { z } from 'zod';

// Base branch schema
const baseDeliverySchema = z.object({
  branchName: z
    .string()
    .min(4, 'Must have at least 4 characters')
    .regex(/^[a-zA-Z ]+$/, 'First Name can only contain letters and spaces'),
  region: z.string().min(1, 'Must have a region selected'),
  province: z.string().min(1, 'Must have a province selected'),
  municipality: z.string().min(1, 'Must have a municipality selected'),
  barangay: z.string().min(1, 'Must have a barangay selected'),
  gradientColor: z
    .string()
    .regex(
      /^#[0-9A-Fa-f]{6}$/,
      'Gradient color must be a valid hex code with 6 digits, e.g., #FFFFFF'
    )
    .or(
      z
        .string()
        .regex(
          /^#[0-9A-Fa-f]{3}$/,
          'Gradient color must be a valid hex code with 3 digits, e.g., #FFF'
        )
    ), // Optional: for 3-digit hex codes
});

// Add branch schema
export const deliverySchema = baseDeliverySchema;

// Table branch schema
export const tableDeliverySchema = baseDeliverySchema.extend({
  _id: z.string(),
});

export type TableDelivery = z.infer<typeof tableDeliverySchema>;

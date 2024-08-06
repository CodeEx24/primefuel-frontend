import { z } from 'zod';

// Base branch schema
const baseBranchSchema = z.object({
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
export const branchSchema = baseBranchSchema;

// Table branch schema
export const tableBranchSchema = baseBranchSchema.extend({
  _id: z.string(),
});

export type TableBranch = z.infer<typeof tableBranchSchema>;

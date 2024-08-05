import { z } from 'zod';

export const addBranchSchema = z.object({
  _id: z.string().optional(), // Optional _id field
  branchName: z
    .string()
    .min(4, 'Must have at least 4 characters')
    .regex(/^[a-zA-Z ]+$/, 'First Name can only contain letters and spaces'),
  // Should be validated with proper location
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

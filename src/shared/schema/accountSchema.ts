import { z, ZodObject } from 'zod';
import { ROLES } from '../constants/ROLES';

// Define the common account validation schema
const baseAccountSchema = z.object({
  firstname: z
    .string()
    .min(2, 'Must have at least 2 characters')
    .regex(/^[a-zA-Z ]+$/, 'First Name can only contain letters and spaces'),
  lastname: z
    .string()
    .min(2, 'Must have at least 2 characters')
    .regex(/^[a-zA-Z ]+$/, 'Last Name can only contain letters and spaces'),
  username: z
    .string()
    .min(2, 'Must have at least 2 characters') // Adjusted to 2 characters
    .regex(
      /^[a-zA-Z0-9_]+$/,
      'Username can only contain letters, numbers, and blanks'
    ),
  email: z.string().email('Invalid email address'),
  contact: z
    .string()
    .length(11, 'Contact number must be exactly 11 digits')
    .regex(
      /^09\d{9}$/,
      'Contact number must start with 09 and be followed by 9 more digits'
    ),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters long')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/\d/, 'Password must contain at least one number')
    .regex(
      /[!@#$%^&*(),.?":{}|<>]/,
      'Password must contain at least one special character'
    ),
  role: z.enum(
    [ROLES.Admin, ROLES.Owner, ROLES.SuperAdmin, ROLES.Driver, ROLES.Staff],
    {
      required_error: 'Please select a role',
    }
  ),
  branch: z.string().optional(), // Should be validated in backend
  branches: z
    .array(
      z
        .object({
          branchesId: z.string().nullable(), // Ensure branchesId is not empty
        })
        .nullable()
    )
    .nullable()
    .optional(),
  plateNumber: z
    .string()
    .regex(
      /^[A-Z]{3}-\d{4}$/,
      'Plate number must be in the format LLL-DDDD Ex. (ABC-1234)'
    )
    .optional(),
});

// Function to validate account roles
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const accountRoleValidations = (schema: ZodObject<any, any, any, any>) =>
  schema.superRefine((data, ctx) => {
    if (data.role === ROLES.Staff && !data.branch) {
      ctx.addIssue({
        code: 'custom',
        path: ['branch'],
        message: 'Branch is required for Staff',
      });
    }

    if (data.role === ROLES.Driver && !data.plateNumber) {
      ctx.addIssue({
        code: 'custom',
        path: ['plateNumber'],
        message: 'Plate number is required for Drivers',
      });
    }

    if (data.role === ROLES.Admin || data.role === ROLES.Owner) {
      if (data.branches) {
        data.branches.forEach(
          (branch: { branchesId: string }, index: number) => {
            if (
              branch &&
              (branch.branchesId === null || branch.branchesId === '')
            ) {
              ctx.addIssue({
                code: 'custom',
                path: ['branches', index, 'branchesId'],
                message: 'Branches ID must be a non-null string',
              });
            }
          }
        );
      }
    }
  });

// Add account schema with role validation
export const addAccountSchema = accountRoleValidations(baseAccountSchema);

// Base schema for updating an account, excluding password
const baseUpdateSchema = baseAccountSchema.omit({ password: true });

// Update account schema with role validation
export const updateAccountSchema = accountRoleValidations(baseUpdateSchema);

// Table account schema
export const tableAccountSchema = z.object({
  _id: z.string(),
  firstname: z.string(),
  lastname: z.string(),
  email: z.string(),
  contact: z.string(),
  role: z.string(),
  status: z.string(),
  username: z.string(),
  branch: z.string().nullable(),
  branches: z
    .array(
      z
        .object({
          branchesId: z.string().nullable(), // Ensure branchesId is not empty
        })
        .nullable()
    )
    .nullable()
    .optional(),
  plateNumber: z.string().nullable(),
});

export type TableAccount = z.infer<typeof tableAccountSchema>;

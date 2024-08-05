import { z, ZodObject } from 'zod';
import { POSITION, ROLES } from '../constants/ROLES';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const accountRoleValidations = (schema: ZodObject<any, any, any, any>) =>
  schema.superRefine((data, ctx) => {
    if (data.roles === ROLES.InternalUser && !data.position) {
      ctx.addIssue({
        code: 'custom',
        path: ['position'],
        message: 'Position is required for Internal Users',
      });
    }
    if (data.roles === ROLES.Staff && !data.branch) {
      ctx.addIssue({
        code: 'custom',
        path: ['branch'],
        message: 'Branch is required for Staff',
      });
    }
    if (data.roles === ROLES.Driver && !data.plateNumber) {
      ctx.addIssue({
        code: 'custom',
        path: ['plateNumber'],
        message: 'Plate number is required for Drivers',
      });
    }
  });

export const baseAccountSchema = z.object({
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
      'Username can only contain letters, numbers, and blank'
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
    .regex(/[^\w\s]*/, 'Password must contain at least one special character'),
  roles: z.enum([ROLES.InternalUser, ROLES.Driver, ROLES.Staff], {
    required_error: 'Please select a role',
  }),
  position: z
    .enum([POSITION.Admin, POSITION.President, POSITION.SuperAdmin], {
      required_error: 'Please select a position',
    })
    .optional(),
  branch: z.string().optional(), // Should be validated in backend
  plateNumber: z
    .string()
    .regex(
      /^[A-Z]{3}-\d{4}$/,
      'Plate number must be in the format LLL-DDDD Ex. (ABC-1234)'
    )
    .optional(),
  //branch: { type: Schema.Types.ObjectId, ref: 'Branch' },

  // Driver
  // plate_number: { type: String },
  // license_number: { type: String },
});

// Add form
export const addAccountSchema = accountRoleValidations(baseAccountSchema);

const baseUpdateSchema = baseAccountSchema.omit({ password: true });

// Update form
export const updateAccountSchema = accountRoleValidations(baseUpdateSchema);

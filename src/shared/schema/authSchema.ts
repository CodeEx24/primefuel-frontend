import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Please enter your password'),
});

export const registerSchema = z.object({
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
});

// confirmPassword: z
//   .string()
//   .min(8, 'Password must be at least 8 characters long'),

export const forgotPasswordSchema = z.object({
  email: z.string().email('Invalid email address'),
});

// Reusable password validation schema
const passwordValidationSchema = z
  .string()
  .optional()
  .refine((val) => !val || val.length >= 8, {
    message: 'Must be at least 8 characters long',
  })
  .refine((val) => !val || /[a-z]/.test(val), {
    message: 'Password must contain at least one lowercase letter',
  })
  .refine((val) => !val || /[A-Z]/.test(val), {
    message: 'Password must contain at least one uppercase letter',
  })
  .refine((val) => !val || /\d/.test(val), {
    message: 'Password must contain at least one number',
  })
  .refine((val) => !val || /[^\w\s]+/.test(val), {
    message: 'Password must contain at least one special character',
  });

// Main schema with refactored password fields
export const profileDetailsSchema = z
  .object({
    first_name: z
      .string()
      .optional()
      .refine((val) => !val || val.trim().length >= 4, {
        message: 'Name must have at least 4 characters',
      }),
    last_name: z
      .string()
      .optional()
      .refine((val) => !val || val.trim().length >= 4, {
        message: 'Name must have at least 4 characters',
      }),

    email: z
      .string()
      .optional()
      .refine((val) => !val || val.trim().length >= 4, {
        message: 'Email must have at least 4 characters',
      })
      .refine((val) => !val || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val), {
        message: 'Invalid email format',
      }),
    password: passwordValidationSchema,
    new_password: passwordValidationSchema,
    confirm_password: passwordValidationSchema,
  })
  .refine((data) => data.new_password === data.confirm_password, {
    message: "Passwords don't match",
    path: ['confirm_password'],
  })
  .refine(
    (data) =>
      !data.new_password ||
      !data.password ||
      data.password !== data.new_password,
    {
      message: 'New password must not match with current password',
      path: ['new_password'],
    }
  )
  .refine(
    (data) => {
      // Check if any password field is set
      const anyPasswordSet =
        data.password || data.new_password || data.confirm_password;
      // Validate that if any is set, all must be set
      return (
        !anyPasswordSet ||
        (data.password && data.new_password && data.confirm_password)
      );
    },
    {
      message: 'All password fields must be filled out if any is filled',
      path: ['password', 'new_password', 'confirm_password'],
    }
  );

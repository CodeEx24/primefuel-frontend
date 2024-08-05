import { z } from 'zod';

export const tableAccountSchema = z.object({
  _id: z.string(),
  firstname: z.string(),
  lastname: z.string(),
  email: z.string(),
  contact: z.string(),
  roles: z.string(),
  status: z.string(),
});

export type TableAccount = z.infer<typeof tableAccountSchema>;

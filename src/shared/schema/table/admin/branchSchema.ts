import { z } from 'zod';

export const tableBranchSchema = z.object({
  _id: z.string(),
  branchName: z.string(),
  region: z.string(),
  province: z.string(),
  municipality: z.string(),
  barangay: z.string(),
  gradientColor: z.string(),
});

export type TableBranch = z.infer<typeof tableBranchSchema>;

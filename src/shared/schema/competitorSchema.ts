import { z } from 'zod';

const base64Regex =
  /^data:image\/(?:png|jpg|jpeg|gif|bmp);base64,[A-Za-z0-9+/=]+$/;

// Base product schema without superRefine
export const baseCompetitorSchema = z.object({
  name: z
    .string()
    .min(1, 'Name is required')
    .max(100, 'Name must be less than 100 characters'),
  description: z
    .string()
    .min(1, 'Description is required')
    .max(500, 'Description must be less than 500 characters'),
  logo: z.string().refine((value) => value === '' || base64Regex.test(value), {
    message: 'Please input a valid image file',
  }),
});

// Adding superRefine to the product schema
export const competitorSchema = baseCompetitorSchema.superRefine(
  (data, ctx) => {
    if (!data.logo) {
      ctx.addIssue({
        code: 'custom',
        path: ['logo'],
        message: 'Competitor image is required',
      });
    }
  }
);

// Some additional for the table
export const tableCompetitorSchema = z
  .object({
    _id: z.string(),
    logo: z.string(),
  })
  .merge(baseCompetitorSchema);

// Table itself
export type TableCompetitor = z.infer<typeof tableCompetitorSchema>;

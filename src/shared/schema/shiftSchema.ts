import { z } from 'zod';

// Base branch schema
const dayEnum = z.enum([
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
]);

const shiftTimeSchema = z
  .object({
    day: dayEnum,
    startTime: z.date(),
    endTime: z.date(),
  })
  .refine(
    (data) => {
      const startHours = data.startTime.getHours();
      const startMinutes = data.startTime.getMinutes();
      const endHours = data.endTime.getHours();
      const endMinutes = data.endTime.getMinutes();

      // Compare hours and minutes
      const timesMatch = startHours === endHours && startMinutes === endMinutes;

      // Return true if times do not match (valid) or return false if times match (invalid)
      return !timesMatch;
    },
    {
      message: 'End time must be later than start time',
      path: ['startTime'], // Specify that the error belongs to endTime
    }
  );

const baseShiftSchema = z.object({
  branch: z.string().min(1, 'Must have a branch selected'), // ID: Included locations
  name: z.string().min(4, 'Must have atleast 4 characters'),
  shifts: z.array(shiftTimeSchema).nonempty('At least one shift must be added'),
});

// Add branch schema
export const shiftSchema = baseShiftSchema;

export const tableShiftSchema = baseShiftSchema.extend({
  _id: z.string(),
  region: z.string(),
  province: z.string(),
  municipality: z.string(),
  gradientColor: z.string(),
  shifts: z.array(
    z.object({
      day: z.string(), // or use z.enum if you have predefined days
      startTime: z.string(),
      endTime: z.string(),
    })
  ),
  branchId: z.string(),
});

export type TableShift = z.infer<typeof tableShiftSchema>;

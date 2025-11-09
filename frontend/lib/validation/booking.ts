import { z } from 'zod';

export const bookingSchema = z
  .object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Enter a valid email'),
    phone: z
      .string()
      .min(7, 'Phone must be at least 7 digits')
      .max(20, 'Phone must be 20 digits or fewer')
      .optional()
      .or(z.literal('')),
    service: z.string().min(2, 'Please select a service'),
    date: z
      .string({
        required_error: 'Select a booking date and time',
      })
      .datetime({ message: 'Provide a valid date and time' }),
    notes: z.string().max(500, 'Notes must be 500 characters or fewer').optional(),
  })
  .superRefine((values, ctx) => {
    if (!values.date) {
      ctx.addIssue({
        path: ['date'],
        code: z.ZodIssueCode.custom,
        message: 'Select a booking date and time',
      });
    }
  });

export type BookingInput = z.infer<typeof bookingSchema>;


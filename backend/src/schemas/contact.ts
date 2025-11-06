import { z } from 'zod';

export const ContactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  message: z.string().min(5),
});

export type ContactInput = z.infer<typeof ContactSchema>;


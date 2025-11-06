import { z } from 'zod';

export const QuoteSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(7),
  service: z.enum([
    'LOCKSMITHING',
    'ELECTRICAL',
    'ACCESS_CONTROL',
    'SECURITY_SYSTEMS',
    'FIRE_ALARM',
    'DATA_LOW_VOLTAGE',
    'TV_MOUNTING',
    'ELECTRONIC_REPAIRS',
  ]),
  address: z.string().min(3),
  zip: z.string().min(3),
  description: z.string().min(5),
  budget: z.string().optional().nullable(),
  preferredTime: z.string().optional().nullable(),
});

export type QuoteInput = z.infer<typeof QuoteSchema>;



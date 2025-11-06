import { Router } from 'express';
import { ContactSchema } from '../schemas/contact';
import { sendEmail } from '../services/email';
import { spamCheck } from '../middleware/spam';

const router = Router();

router.post('/', spamCheck, async (req, res) => {
  const parse = ContactSchema.safeParse(req.body);
  if (!parse.success) return res.status(400).json({ error: parse.error.flatten() });

  const data = parse.data;
  await sendEmail({
    to: process.env.CONTACT_EMAIL || 'mytech@metrepairs.com',
    subject: `New Contact: ${data.name}`,
    text: `${data.email}\n\n${data.message}`,
  });
  res.status(200).json({ ok: true });
});

export default router;


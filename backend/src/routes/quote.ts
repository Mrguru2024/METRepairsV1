import { Router } from 'express';
import multer from 'multer';
import { QuoteSchema } from '../schemas/quote';
import { sendEmail } from '../services/email';
import { spamCheck } from '../middleware/spam';

const router = Router();
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 5 * 1024 * 1024, files: 5 } });

router.post('/', upload.array('attachments'), spamCheck, async (req, res) => {
  const parse = QuoteSchema.safeParse(req.body);
  if (!parse.success) return res.status(400).json({ error: parse.error.flatten() });

  const lead = parse.data;
  const files = (req.files as Express.Multer.File[] | undefined) || [];
  await sendEmail({
    to: process.env.CONTACT_EMAIL || 'mytech@metrepairs.com',
    subject: `New Quote: ${lead.service} — ${lead.name}`,
    text: JSON.stringify({ ...lead, attachments: files.map((f) => ({ name: f.originalname, size: f.size })) }, null, 2),
  });
  res.status(200).json({ ok: true });
});

export default router;


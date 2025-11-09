import { Router, type Request, type Response } from 'express';
import multer from 'multer';
import { QuoteSchema } from '../schemas/quote';
import { sendEmail } from '../services/email';
import { spamCheck } from '../middleware/spam';
import sql from '../db/sql';

const router = Router();
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024, files: 5 },
});

router.post('/', upload.array('attachments'), spamCheck, async (req: Request, res: Response) => {
  const parse = QuoteSchema.safeParse(req.body);
  if (!parse.success) return res.status(400).json({ error: parse.error.flatten() });

  const lead = parse.data;
  const files = (req.files as Express.Multer.File[] | undefined) || [];
  const attachments = files.map((file) => ({
    originalName: file.originalname,
    size: file.size,
    mimeType: file.mimetype,
  }));
  const budget = lead.budget && lead.budget.trim().length > 0 ? lead.budget.trim() : null;
  const preferredTime =
    lead.preferredTime && lead.preferredTime.trim().length > 0 ? lead.preferredTime.trim() : null;

  try {
    await sql`
      insert into quotes (
        name,
        email,
        phone,
        service,
        address,
        zip,
        description,
        budget,
        preferred_time,
        attachments
      )
      values (
        ${lead.name},
        ${lead.email},
        ${lead.phone},
        ${lead.service},
        ${lead.address},
        ${lead.zip},
        ${lead.description},
        ${budget},
        ${preferredTime},
        ${attachments.length ? sql.json(attachments) : null}
      )
    `;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Failed to persist quote', error);
    return res.status(500).json({ error: 'Unable to save quote' });
  }

  await sendEmail({
    to: process.env.CONTACT_EMAIL || 'mytech@metrepairs.com',
    subject: `New Quote: ${lead.service} — ${lead.name}`,
    text: JSON.stringify({ ...lead, budget, preferredTime, attachments }, null, 2),
  });
  res.status(200).json({ ok: true });
});

export default router;

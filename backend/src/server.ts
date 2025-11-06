import 'dotenv/config';
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import { securityMiddleware } from './middleware/security';
import { rateLimiter } from './middleware/rateLimit';
import quoteRouter from './routes/quote';
import contactRouter from './routes/contact';
import bookingWebhookRouter from './routes/bookingWebhook';

const app = express();

app.use(helmet());
app.use(express.json({ limit: '2mb' }));
app.use(cors(securityMiddleware.corsOptions));
app.use(rateLimiter);

app.get('/health', (_req, res) => res.json({ ok: true }));
app.use('/api/quote', quoteRouter);
app.use('/api/contact', contactRouter);
app.use('/api/booking/webhook', bookingWebhookRouter);

const port = process.env.PORT ? Number(process.env.PORT) : 4000;
app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Backend listening on http://localhost:${port}`);
});

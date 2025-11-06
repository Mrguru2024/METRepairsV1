import nodemailer from 'nodemailer';

type SendEmailArgs = { to: string; subject: string; text: string };

export async function sendEmail({ to, subject, text }: SendEmailArgs) {
  const host = process.env.BREVO_SMTP_HOST || 'smtp-relay.brevo.com';
  const port = Number(process.env.BREVO_SMTP_PORT || 587);
  const user = process.env.BREVO_SMTP_USER;
  const pass = process.env.BREVO_API_KEY;

  if (!user || !pass) {
    // eslint-disable-next-line no-console
    console.warn('Email credentials missing; skipping send.');
    return;
  }

  const transporter = nodemailer.createTransport({ host, port, auth: { user, pass } });
  await transporter.sendMail({ from: user, to, subject, text });
}


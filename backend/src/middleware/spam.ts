import { RequestHandler } from 'express';

export const spamCheck: RequestHandler = (req, res, next) => {
  const text = JSON.stringify(req.body).toLowerCase();
  if (text.includes('http://') || text.includes('https://')) return res.status(400).end();
  next();
};


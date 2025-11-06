import { Router } from 'express';

const router = Router();

router.post('/', async (req, res) => {
  // minimal webhook echo; extend with signature checks per provider
  const payload = req.body;
  // eslint-disable-next-line no-console
  console.log('Booking webhook:', payload);
  res.status(200).json({ ok: true });
});

export default router;


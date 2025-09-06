import express from 'express';

const router = express.Router();

router.get('/status', async (req, res, next) => {
  try {
    res.json({ status: 'connected', network: 'localhost' });
  } catch (error) {
    next(error);
  }
});

export default router;
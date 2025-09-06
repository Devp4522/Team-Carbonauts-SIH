import express from 'express';
import { PrismaClient } from '@prisma/client';
import { authenticateToken, requireRole } from '../middleware/auth';

const router = express.Router();
const prisma = new PrismaClient();

router.get('/', async (req, res, next) => {
  try {
    const plots = await prisma.plot.findMany({
      include: { project: true, _count: { select: { measurements: true } } }
    });
    res.json(plots);
  } catch (error) {
    next(error);
  }
});

export default router;
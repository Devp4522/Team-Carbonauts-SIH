import express from 'express';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();

router.get('/', async (req, res, next) => {
  try {
    const batches = await prisma.batch.findMany();
    res.json(batches);
  } catch (error) {
    next(error);
  }
});

export default router;
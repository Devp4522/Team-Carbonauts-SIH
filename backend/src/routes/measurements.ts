import express from 'express';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();

router.get('/', async (req, res, next) => {
  try {
    const measurements = await prisma.measurement.findMany();
    res.json(measurements);
  } catch (error) {
    next(error);
  }
});

export default router;
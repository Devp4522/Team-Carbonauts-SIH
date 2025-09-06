import express from 'express';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();

router.get('/', async (req, res, next) => {
  try {
    const devices = await prisma.device.findMany();
    res.json(devices);
  } catch (error) {
    next(error);
  }
});

export default router;
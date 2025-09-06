import express from 'express';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
import { ethers } from 'ethers';

const router = express.Router();
const prisma = new PrismaClient();

router.post('/login', async (req, res, next) => {
  try {
    const { walletAddress, signature, message } = req.body;
    
    // Verify signature
    const recoveredAddress = ethers.verifyMessage(message, signature);
    if (recoveredAddress.toLowerCase() !== walletAddress.toLowerCase()) {
      return res.status(401).json({ error: 'Invalid signature' });
    }

    // Find or create user
    let user = await prisma.user.findUnique({
      where: { walletAddress: walletAddress.toLowerCase() }
    });

    if (!user) {
      user = await prisma.user.create({
        data: { walletAddress: walletAddress.toLowerCase() }
      });
    }

    const token = jwt.sign(
      { userId: user.id, walletAddress: user.walletAddress },
      process.env.JWT_SECRET!,
      { expiresIn: '24h' }
    );

    res.json({ token, user });
  } catch (error) {
    next(error);
  }
});

export default router;
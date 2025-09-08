import express from 'express';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
import { ethers } from 'ethers';

const router = express.Router();
const prisma = new PrismaClient();

router.post('/login', async (req, res, next) => {
  try {
    const { walletAddress, signature, message } = req.body;
    
    if (!walletAddress || !signature || !message) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    
    // Verify signature
    const recoveredAddress = ethers.verifyMessage(message, signature);
    if (recoveredAddress.toLowerCase() !== walletAddress.toLowerCase()) {
      return res.status(401).json({ error: 'Invalid signature' });
    }

    // For blockchain auth, we don't need to store users in DB
    // Just create a JWT with the wallet address
    const token = jwt.sign(
      { walletAddress: walletAddress.toLowerCase() },
      process.env.JWT_SECRET!,
      { expiresIn: '24h' }
    );

    res.json({ 
      token, 
      user: { 
        walletAddress: walletAddress.toLowerCase(),
        id: walletAddress.toLowerCase() // Use wallet address as ID
      } 
    });
  } catch (error) {
    next(error);
  }
});

// Organization registration endpoint
router.post('/register', async (req, res, next) => {
  try {
    const { 
      walletAddress, 
      signature, 
      message,
      name,
      taxId,
      registrationPaymentId,
      email,
      website,
      role,
      phoneNumber,
      faxNumber,
      province,
      address,
      adminName,
      adminEmail,
      adminPhone
    } = req.body;
    
    if (!walletAddress || !signature || !message) {
      return res.status(400).json({ error: 'Wallet verification required' });
    }
    
    // Verify signature
    const recoveredAddress = ethers.verifyMessage(message, signature);
    if (recoveredAddress.toLowerCase() !== walletAddress.toLowerCase()) {
      return res.status(401).json({ error: 'Invalid signature' });
    }

    // Store organization registration (you could use IPFS for this)
    console.log('Organization registration:', {
      walletAddress,
      organizationDetails: {
        name, taxId, registrationPaymentId, email, website, 
        role, phoneNumber, faxNumber, province, address
      },
      adminDetails: { adminName, adminEmail, adminPhone }
    });

    res.json({ 
      message: 'Registration submitted successfully',
      walletAddress: walletAddress.toLowerCase()
    });
  } catch (error) {
    next(error);
  }
});

export default router;
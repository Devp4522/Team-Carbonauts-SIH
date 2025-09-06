import express from 'express';
import { PrismaClient } from '@prisma/client';
import { authenticateToken, requireRole } from '../middleware/auth';
import { validateRequest } from '../middleware/validation';
import { createProjectSchema, updateProjectSchema } from '../schemas/project';
import { logger } from '../utils/logger';
import { createError } from '../middleware/errorHandler';

const router = express.Router();
const prisma = new PrismaClient();

/**
 * @swagger
 * components:
 *   schemas:
 *     Project:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         name:
 *           type: string
 *         description:
 *           type: string
 *         country:
 *           type: string
 *         coordinates:
 *           type: array
 *           items:
 *             type: number
 *         metadataCID:
 *           type: string
 *         onChainId:
 *           type: integer
 *         active:
 *           type: boolean
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */

/**
 * @swagger
 * /api/v1/projects:
 *   post:
 *     summary: Create a new project
 *     tags: [Projects]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - country
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               country:
 *                 type: string
 *               coordinates:
 *                 type: array
 *                 items:
 *                   type: number
 *               metadataCID:
 *                 type: string
 *     responses:
 *       201:
 *         description: Project created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Project'
 */
router.post('/', 
  authenticateToken, 
  requireRole(['ADMIN', 'PROJECT_OWNER', 'NGO']),
  validateRequest(createProjectSchema),
  async (req, res, next) => {
    try {
      const { name, description, country, coordinates, metadataCID } = req.body;
      const userId = req.user?.id;

      if (!userId) {
        throw createError('User ID not found', 401);
      }

      const project = await prisma.project.create({
        data: {
          name,
          description,
          country,
          coordinates,
          metadataCID,
          ownerId: userId,
        },
        include: {
          owner: {
            select: {
              id: true,
              walletAddress: true,
              name: true,
              role: true,
            }
          },
          _count: {
            select: {
              plots: true,
              batches: true,
            }
          }
        },
      });

      logger.info(`Project created: ${project.id} by user ${userId}`);
      res.status(201).json(project);
    } catch (error) {
      next(error);
    }
  }
);

/**
 * @swagger
 * /api/v1/projects:
 *   get:
 *     summary: Get all projects
 *     tags: [Projects]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *       - in: query
 *         name: country
 *         schema:
 *           type: string
 *       - in: query
 *         name: active
 *         schema:
 *           type: boolean
 *     responses:
 *       200:
 *         description: List of projects
 */
router.get('/', async (req, res, next) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const country = req.query.country as string;
    const active = req.query.active === 'true' ? true : 
                   req.query.active === 'false' ? false : undefined;

    const where: any = {};
    if (country) where.country = country;
    if (active !== undefined) where.active = active;

    const [projects, total] = await Promise.all([
      prisma.project.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        include: {
          owner: {
            select: {
              id: true,
              walletAddress: true,
              name: true,
              role: true,
            }
          },
          _count: {
            select: {
              plots: true,
              batches: true,
            }
          }
        },
        orderBy: { createdAt: 'desc' },
      }),
      prisma.project.count({ where }),
    ]);

    res.json({
      projects,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /api/v1/projects/{id}:
 *   get:
 *     summary: Get project by ID
 *     tags: [Projects]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Project details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Project'
 */
router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;

    const project = await prisma.project.findUnique({
      where: { id },
      include: {
        owner: {
          select: {
            id: true,
            walletAddress: true,
            name: true,
            role: true,
          }
        },
        plots: {
          include: {
            _count: {
              select: {
                measurements: true,
                batches: true,
              }
            }
          }
        },
        batches: {
          include: {
            plot: true,
            _count: {
              select: {
                measurements: true,
              }
            }
          }
        },
        _count: {
          select: {
            plots: true,
            batches: true,
          }
        }
      },
    });

    if (!project) {
      throw createError('Project not found', 404);
    }

    res.json(project);
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /api/v1/projects/{id}:
 *   put:
 *     summary: Update project
 *     tags: [Projects]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               metadataCID:
 *                 type: string
 *               active:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Project updated successfully
 */
router.put('/:id',
  authenticateToken,
  validateRequest(updateProjectSchema),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const userId = req.user?.id;
      const userRole = req.user?.role;

      // Check if project exists and user has permission
      const existingProject = await prisma.project.findUnique({
        where: { id },
        select: { ownerId: true }
      });

      if (!existingProject) {
        throw createError('Project not found', 404);
      }

      // Only owner or admin can update
      if (existingProject.ownerId !== userId && userRole !== 'ADMIN') {
        throw createError('Insufficient permissions', 403);
      }

      const project = await prisma.project.update({
        where: { id },
        data: req.body,
        include: {
          owner: {
            select: {
              id: true,
              walletAddress: true,
              name: true,
              role: true,
            }
          },
          _count: {
            select: {
              plots: true,
              batches: true,
            }
          }
        },
      });

      logger.info(`Project updated: ${id} by user ${userId}`);
      res.json(project);
    } catch (error) {
      next(error);
    }
  }
);

export default router;
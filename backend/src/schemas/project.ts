import Joi from 'joi';

export const createProjectSchema = Joi.object({
  name: Joi.string().required().min(1).max(255),
  description: Joi.string().optional().max(1000),
  country: Joi.string().required().min(2).max(100),
  coordinates: Joi.array().items(Joi.number()).length(2).optional(),
  metadataCID: Joi.string().optional()
});

export const updateProjectSchema = Joi.object({
  name: Joi.string().optional().min(1).max(255),
  description: Joi.string().optional().max(1000),
  metadataCID: Joi.string().optional(),
  active: Joi.boolean().optional()
});
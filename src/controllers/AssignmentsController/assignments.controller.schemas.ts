import Joi from 'joi';

export const createAssignmentSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  teacherId: Joi.number().integer().required(),
});

export const updateAssignmentSchema = Joi.object({
  title: Joi.string().optional(),
  description: Joi.string().optional(),
});

export const idParamSchema = Joi.object({
  id: Joi.number().integer().required(),
});

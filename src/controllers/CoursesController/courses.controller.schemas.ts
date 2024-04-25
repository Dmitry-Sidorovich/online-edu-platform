import Joi from 'joi';

export const createCourseSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().optional(),
  teacherId: Joi.number().integer().required(),
});

export const updateCourseSchema = Joi.object({
  title: Joi.string().optional(),
  description: Joi.string().optional(),
});

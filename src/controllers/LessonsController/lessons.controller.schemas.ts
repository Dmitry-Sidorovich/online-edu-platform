import Joi from 'joi';

export const createLessonSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  courseId: Joi.number().integer().required(),
});

export const updateLessonSchema = Joi.object({
  title: Joi.string().optional(),
  description: Joi.string().optional(),
}).or('title', 'description');

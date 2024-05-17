import * as Joi from 'joi';

export const validateIdSchema = Joi.object({
  id: Joi.string().regex(/^\d+$/),
});

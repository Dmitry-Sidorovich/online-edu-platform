import Joi from 'joi';

export const createSubmissionSchema = Joi.object({
  assignmentId: Joi.number().required(),
  studentId: Joi.number().required(),
  content: Joi.string().required(),
});

export const updateSubmissionSchema = Joi.object({
  content: Joi.string().optional(),
});

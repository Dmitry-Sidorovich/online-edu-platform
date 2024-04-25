import Joi from 'joi';

export const updateEnrollmentSchema = Joi.object({
  status: Joi.string().valid('active', 'inactive', 'completed').optional(),
  accessLevel: Joi.string().valid('full', 'limited').optional(),
}).or('status', 'accessLevel'); // Проверяем, что хотя бы одно поле должно быть предоставлено для обновления

export const enrollmentSchema = Joi.object({
  studentId: Joi.number().integer().required(),
  courseId: Joi.number().integer().required(),
  status: Joi.string().valid('active', 'inactive', 'completed').required(),
  accessLevel: Joi.string().valid('full', 'limited').required(),
});

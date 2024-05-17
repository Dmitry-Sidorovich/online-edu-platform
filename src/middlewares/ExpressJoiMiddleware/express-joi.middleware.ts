import * as expressJoiValidation from 'express-joi-validation';

export const expressJoiMiddleware = expressJoiValidation.createValidator({
  passError: true,
});

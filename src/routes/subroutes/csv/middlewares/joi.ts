import { NextFunction } from 'express';
import { UploadDtoReq, UploadDtoRes } from '../dto';
import storeReqSchema from '../joi-schemas/store-request-schema';

const joiValidateStore = (req: UploadDtoReq, res: UploadDtoRes, next: NextFunction) => {
  const joiValidation = storeReqSchema.validate(req.body);

  if (joiValidation.error) {
    next(joiValidation.error);
  } else {
    next();
  }
};

export { joiValidateStore };

import * as Joi from 'joi';

const storeReqSchema = Joi.object({
  fileName: Joi.string().required(),
  updateOptions: Joi.string().valid('ignoreExisting', 'updateExisting').required(),
  mappingRules: Joi.object().pattern(Joi.string().max(2), Joi.string()).required(),
  dbEntity: Joi.string().valid('user', 'contact', 'order').required(), // and etc.
});

export default storeReqSchema;

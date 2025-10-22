import Joi from 'joi';

export const stockValidationSchema = Joi.object({
  companyId: Joi.string()
    .required()
    .messages({
      'string.base': 'companyId must be a string',
      'any.required': 'companyId is required',
    }),

  productName: Joi.string()
    .trim()
    .required()
    .messages({
      'string.base': 'productName must be a string',
      'any.required': 'productName is required',
    }),

  quantity: Joi.number()
    .min(0)
    .required()
    .messages({
      'number.base': 'quantity must be a number',
      'number.min': 'quantity cannot be negative',
      'any.required': 'quantity is required',
    }),

  batchNumber: Joi.string()
    .trim()
    .allow('', null) // optional field
    .messages({
      'string.base': 'batchNumber must be a string',
    }),

  expiryDate: Joi.date()
    .allow(null)
    .messages({
      'date.base': 'expiryDate must be a valid date',
    }),

  isDeleted: Joi.boolean()
    .default(false)
    .messages({
      'boolean.base': 'isDeleted must be true or false',
    }),
});

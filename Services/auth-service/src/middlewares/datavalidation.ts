import Joi, { string } from "joi";

export const validation = Joi.object({
    company_id:Joi.string().required(),
    name: Joi.string().required(),
    password: Joi.string().required(),
    number: Joi.string().pattern(/^[6-9]\d{9}$/).required(),
    email: Joi.string().email().required()
}).options({ convert: false })

export const employee_validation = Joi.object({
    name: Joi.string().required(),
    password: Joi.string().required(),
    number: Joi.string().pattern(/^[6-9]\d{9}$/).required(),
    email: Joi.string().email().required(),
    company_role: Joi.string().required()
}).options({ convert: false })

export const authData_validation=Joi.object({
    email:Joi.string().required().email(),
    password:Joi.string().required()
}).options({convert:false})
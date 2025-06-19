import Joi from "joi";

export const validation=Joi.object({
    name:Joi.string().required(),
    password:Joi.string().required(),
    number:Joi.string().pattern(/^[6-9]\d{9}$/).required(),
    email:Joi.string().email().required()
}).options({convert:false})

import Joi from "joi";

export const sub_data_validation=Joi.object({
    company_id:Joi.string().required(),
    plan_type:Joi.string().required(),
    plan_start:Joi.string().required(),
    plan_end:Joi.string().required(),
    amount:Joi.number().required(),
    method:Joi.string().required(),
    payment_id:Joi.string().required()
})
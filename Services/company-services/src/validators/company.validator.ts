
import  Joi, { required, string } from 'joi'

export const validation_company=Joi.object({
    legalname:Joi.string().required(),
    tradingname:Joi.string().required(),
    registration_number:Joi.number().required().max(9999999999).min(10000),
    company_type:Joi.string().required(),
    primary_industry:Joi.string().required(),
    annual_revanue:Joi.number(),
    phonenumber:Joi.number().required().max(9999999999).min(1000000000),
    email:Joi.string().required(),
    date:Joi.string().required(),
    logo:Joi.string(),
    address:Joi.object({
        place:Joi.string().required(),
        pin:Joi.number().required(),
        distict:Joi.string().required(),
        state:Joi.string().required(),

    }).required()

}).options({convert:false})

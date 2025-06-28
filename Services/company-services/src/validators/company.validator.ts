
import  Joi, { required, string } from 'joi'

export const validation_company=Joi.object({
    legalname:Joi.string().required(),
    tradingname:Joi.string().required(),
    registration_number:Joi.string().required(),
    company_type:Joi.string().required(),
    primary_industry:Joi.string().required(),
    phonenumber:Joi.string().required(),    
    email:Joi.string().required(),
    date:Joi.string().required(),
    logo:Joi.string(),
    GST_number:Joi.string().required(),
    address:Joi.object({
        place:Joi.string().required(),
        pin:Joi.number().required(),
        distict:Joi.string().required(),
        state:Joi.string().required(),

    })

}).options({convert:false})

import Joi, { required, string } from "joi";

export const validation = Joi.object({
    company_id:Joi.string().required(),
    img:Joi.string(),
    confirm_password:Joi.string().required(),
    admin_name: Joi.string().required(),
    password: Joi.string().required(),
    number: Joi.string().pattern(/^[6-9]\d{9}$/).required(),
    email: Joi.string().email().required()
}).options({ convert: false })

export const employee_validation = Joi.object({
    employee_id:Joi.string().required(),
    name: Joi.string().required(),
    join_date:Joi.string().required(),
    img:Joi.string().required(),
    shift:Joi.string().required(),
    gender:Joi.string().required(),
    confirm_password:Joi.string().required(),
    password: Joi.string().required(),
    number: Joi.string().pattern(/^[6-9]\d{9}$/).required(),
    email: Joi.string().email().required(),
    company_role: Joi.string().required()
}).options({ convert: false })

export const authData_validation=Joi.object({
    role:Joi.string().required(),
    email:Joi.string().required().email(),
    password:Joi.string().required()
}).options({convert:false})

export const employee_profile_validation_Byadmin=Joi.object({
    name: Joi.string().required(),
    join_date:Joi.string().required(),
    img:Joi.string().required(),
    shift:Joi.string().required(),
    gender:Joi.string().required(),
    number: Joi.string().pattern(/^[6-9]\d{9}$/).required(),
    email: Joi.string().email().required(),
    company_role: Joi.string().required()
})
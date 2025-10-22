

import Joi from 'joi';

export const validation = Joi.object({
  company_id: Joi.string().required(),
  img: Joi.string().allow(''), // optional
  employee_id: Joi.string().allow(''),
  dob: Joi.string().allow(''),
  shift: Joi.string().allow(''),
  join_date: Joi.string().allow(''),
  name: Joi.string().required(),
  gender: Joi.string().valid("Male", "Female", "Other").required(),
  password: Joi.string().required(),
  confirm_password: Joi.string().required().valid(Joi.ref('password')).messages({
    "any.only": "Confirm password must match password"
  }),
  email: Joi.string().email().required(),
  number: Joi.string().pattern(/^[6-9]\d{9}$/).required(),
  company_role: Joi.string().valid("Admin", "StockDepartment", "SalesDepartment"),
  department: Joi.string().required(),
  qualification: Joi.string().required(),
  status: Joi.string().default("active"),
  Address: Joi.object({
    place: Joi.string().allow(''),
    pin: Joi.number().allow(null, ''),
    distct: Joi.string().allow(''),
    state: Joi.string().allow(''),
  }).optional()
}).options({ convert: false });


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
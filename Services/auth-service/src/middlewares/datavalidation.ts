

import Joi from 'joi';

export const validation = Joi.object({
  img: Joi.string().allow(""),

  company_role: Joi.string()
    .valid("Admin", "Employee")
    .required(),

  employee_id: Joi.when("company_role", {
    is: "Admin",
    then: Joi.string().allow(""),
    otherwise: Joi.string().required(),
  }),

  dob: Joi.when("company_role", {
    is: "Admin",
    then: Joi.string().allow(""),
    otherwise: Joi.string().required(),
  }),

  shift: Joi.when("company_role", {
    is: "Admin",
    then: Joi.any().optional(),
    otherwise: Joi.object({
      type: Joi.string()
        .valid("Morning", "Evening", "Night", "Flexible")
        .required(),
      startTime: Joi.string().required(),
      endTime: Joi.string().required(),
    }).required(),
  }),

  join_date: Joi.when("company_role", {
    is: "Admin",
    then: Joi.string().allow(""),
    otherwise: Joi.string().required(),
  }),

  name: Joi.string().required(),

  gender: Joi.string()
    .valid("Male", "Female", "Other")
    .required(),

  password: Joi.string().required(),

  confirm_password: Joi.string()
    .required()
    .valid(Joi.ref("password"))
    .messages({
      "any.only": "Confirm password must match password",
    }),

  email: Joi.string().email().required(),

  number: Joi.string()
    .pattern(/^[6-9]\d{9}$/)
    .required(),

  department: Joi.when("company_role", {
    is: "Admin",
    then: Joi.string().optional(),
    otherwise: Joi.string()
      .valid(
        "StockDepartment",
        "SalesDepartment",
        "HR",
        "Purchase",
        "Inventory",
        "Accounts"
      )
      .required(),
  }),

  status: Joi.string().default("active"),

  qualification: Joi.string().required(),

  Address: Joi.object({
    place: Joi.string().allow(""),
    pin: Joi.number().allow(""),
    distct: Joi.string().allow(""),
    state: Joi.string().allow(""),
  }).optional(),

}).options({ convert: false });



export const authData_validation=Joi.object({
    email:Joi.string().required().email(),
    password:Joi.string().required()
}).options({convert:false})

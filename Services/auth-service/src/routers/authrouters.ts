import express from 'express'

import { authentication_verify } from '../middlewares/auth.verification'
import { employeeregister } from '../controlers/Employee/employeregister'
import { employee_authentication } from '../controlers/Employee/employee.login'
import { getall_employee } from '../controlers/Employee/getall.employee'
import { owneregister } from '../controlers/Owner/owneregister'
import { owner_authenticqtion } from '../controlers/Owner/owner.login'
import { owner_authrization } from '../middlewares/owner.autherization'
import { employee_delete, Profile_edit, user_logout } from '../controlers/profile.edit'
import { getemployee_profile, getowner_profile } from '../controlers/get.profile'
import { is_supaeradmin } from '../middlewares/superadmin_authrzation'


const router = express.Router()
router.get('/superadmin/getprofile',is_supaeradmin,getowner_profile)
router.post('/owner/register/:id',owneregister)
router.post('/owner/login',owner_authenticqtion)
router.get('/owner/get_profile',authentication_verify,getowner_profile)
router.get('/owner/get_profile/:id',is_supaeradmin,getowner_profile)
router.put('/owner/edit_profile',authentication_verify,owner_authrization,Profile_edit)
router.post('/owner/logout',owner_authrization,user_logout)
router.post('/employee/register',owner_authrization, employeeregister)
router.post('/employee/login',employee_authentication)
router.get('/employee/get_profile/:id',authentication_verify,owner_authrization,getemployee_profile)
router.get('/employee/get_profile',authentication_verify,getemployee_profile)
router.put('/employee/edit_profile',authentication_verify,Profile_edit)
router.post('/employee/logout',authentication_verify,user_logout)
router.get('/employee/getall_employee',owner_authrization,getall_employee)
router.delete('/employee/delete/:id',owner_authrization,employee_delete)

export default router
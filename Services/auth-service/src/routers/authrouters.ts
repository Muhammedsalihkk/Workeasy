import express from 'express'
import { owneregister } from '../controlers/owneregister'
import { employeeregister } from '../controlers/employeregister'
import { employee_authentication } from '../controlers/employee.login'
import { owner_authenticqtion } from '../controlers/owner.login'

const router = express.Router()

router.post('/owner/register/:id', owneregister)
router.post('/owner/login/',owner_authenticqtion)
router.post('/employee/register/:id', employeeregister)
router.post('/employee/login',employee_authentication)

export default router
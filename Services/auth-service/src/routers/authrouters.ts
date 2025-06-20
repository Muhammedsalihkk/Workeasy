import express from 'express'
import { owneregister } from '../controlers/owneregister'
import { employeeregister } from '../controlers/employeregister'

const router = express.Router()

router.post('/owner/register/:id', owneregister)
router.post('/employee/register/:id', employeeregister)

export default router
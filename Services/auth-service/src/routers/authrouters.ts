import express from 'express'
import { dataregister } from '../controlers/register'

const router=express.Router()

router.post('/owner/register',dataregister)

export default router
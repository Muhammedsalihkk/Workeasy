import express from 'express'
import authverify from '../middlewares/authverification'
import adminverify from '../middlewares/adminverification'
import { attendence_registration, attendenceAllBycompany, attendenceByuser, Clock_in, Clock_out } from '../controllers/attendecContorler'
import multer from 'multer'
import upload from '../middlewares/multer'

const router=express.Router()

router.post('/attendence/user/:id',authverify,adminverify,upload.single("images"),attendence_registration)
router.post('/attendence/clock-in/:id',upload.single('images'),Clock_in)
router.patch('/attendence/clock-out/:id',Clock_out)
router.get('/attendence/company',adminverify,attendenceAllBycompany)
router.get('/attendece/user',authverify,attendenceByuser)

export default router
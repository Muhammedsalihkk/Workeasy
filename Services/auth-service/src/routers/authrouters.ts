import express from 'express'

import { authentication_verify } from '../middlewares/auth.verification'

import multer from 'multer'
import { UserRegistration } from '../controlers/userSignup'
import { userLogin } from '../controlers/userLogin'
import { getUserProfileController } from '../controlers/get.profile'
import { is_supaeradmin } from '../middlewares/superadmin_authrzation'
import { edit_user, user_logout } from '../controlers/profile.edit'
import { change_password, changeapssword, verify_otp } from '../controlers/passwordchange'


const router = express.Router()
const upload =multer({dest:'image/'})

router.post('/user/register/',UserRegistration)
router.post('/user/login',userLogin)
router.get('/user/get_profile',authentication_verify,getUserProfileController)
router.put('/user/edit_profile',upload.single('images'),authentication_verify,edit_user)
router.post("/user/sendotp",authentication_verify,changeapssword)
router.post("/user/verify",authentication_verify,verify_otp)
router.post("/user/changepassword",authentication_verify,change_password)
router.post('/user/logout',authentication_verify,user_logout)

export default router
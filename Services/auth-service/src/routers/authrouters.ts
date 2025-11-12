import express from 'express'

import { authentication_verify } from '../middlewares/auth.verification'

import multer from 'multer'
import { UserRegistration } from '../controlers/userSignup'
import { userLogin } from '../controlers/userLogin'
import { getUserProfileController } from '../controlers/get.profile'
import { is_supaeradmin } from '../middlewares/superadmin_authrzation'
import { deleteUserProfile, edit_user, user_logout } from '../controlers/profile.edit'
import { change_password, changeapssword, verify_otp } from '../controlers/passwordchange'
import { getall_User } from '../controlers/getAlluser'


const router = express.Router()
const upload = multer({ dest: 'image/' });
// accept either 'image' or 'images' form field (frontend may send either)
const uploadFields = upload.fields([
	{ name: 'images', maxCount: 1 },
	{ name: 'image', maxCount: 1 },
]);

router.post('/employee/register', authentication_verify, UserRegistration);
router.post('/user/register', UserRegistration);
router.post('/user/login',userLogin)
router.get('/user/getall',authentication_verify,getall_User)
router.get('/user/get_profile',authentication_verify,getUserProfileController)
// Allow authenticated users to upload an image under either 'image' or 'images'
router.put('/employee/edit_profile/:id', authentication_verify, uploadFields, edit_user)
router.get('/employee/get_profile/:id',authentication_verify,getUserProfileController)
router.delete('/employee/delete/:id',authentication_verify,deleteUserProfile)
// For user profile edit allow both field names and run auth before parsing file to avoid saving files for unauthorized requests
router.put('/user/edit_profile', authentication_verify, uploadFields, edit_user)
router.post("/user/sendotp",authentication_verify,changeapssword)
router.post("/user/verify",authentication_verify,verify_otp)
router.post("/user/changepassword",authentication_verify,change_password)
router.post('/user/logout',authentication_verify,user_logout)


export default router
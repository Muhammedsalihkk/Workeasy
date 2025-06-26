import express from 'express'
import { getsubscription_details } from '../controlers/getsubscription'
import { sub_data_posting } from '../controlers/Store_subdetails'

const router=express.Router()

router.get('/subscription',getsubscription_details)
router.post('/subscription',sub_data_posting)

export default router
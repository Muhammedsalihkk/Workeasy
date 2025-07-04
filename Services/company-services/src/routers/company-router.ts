import express from "express";
import { register_company } from "../controllers/comapny-controler";
import { getallcompany ,get_Onecompany} from "../controllers/getAllcompany-controller";
import { deletcompany, editcompany } from "../controllers/Edit&delete";
import { issuper_admin, owner_autherization } from "../utils/jwt_encoding";
import { block_company } from "../controllers/company.block";
import { upload } from "../config/multer";


const router=express.Router()
router.post('/companies',register_company)
router.get('/companies/gatAll',getallcompany)
router.get('/companies/:id',get_Onecompany)
router.get('/companies',owner_autherization,get_Onecompany)
router.patch('/companies/:id',issuper_admin,block_company)
router.put('/companies',owner_autherization,upload.single("image"),editcompany)
router.delete('/companies/:id',issuper_admin,deletcompany)
export default router
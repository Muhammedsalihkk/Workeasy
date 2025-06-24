import express from "express";
import { register_company } from "../controllers/comapny-controler";
import { getallcompany ,get_Onecompany} from "../controllers/getAllcompany-controller";
import { deletcompany, editcompany } from "../controllers/Edit&delete";
import { issuper_admin, owner_autherization } from "../utils/jwt_encoding";
import { block_company } from "../controllers/company.block";


const router=express.Router()
router.post('/companies',register_company)
router.get('/companies',issuper_admin,getallcompany)
router.get('/companies/:id',get_Onecompany)
router.patch('/companies/:id',issuper_admin,block_company)
router.put('/companies/:id',editcompany)
router.delete('/companies/:id',issuper_admin,deletcompany)
export default router
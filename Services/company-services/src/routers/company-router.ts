import express from "express";
import { register_company } from "../controllers/comapny-controler";
import { getallcompany ,get_Onecompany} from "../controllers/getAllcompany-controller";
import { deletcompany, editcompany } from "../controllers/Edit&delete";

const router=express.Router()
router.post('/companies',register_company)
router.get('/companies',getallcompany)
router.get('/companies/:id',get_Onecompany)
router.put('/companies/:id',editcompany)
router.delete('/companies/:id',deletcompany)
export default router
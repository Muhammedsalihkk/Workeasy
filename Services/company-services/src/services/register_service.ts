import { address, company } from "../interface/company.interface"
import { configdata } from "../config/env"
import { company_model } from "../models/company_schema"
export const register_service= async(companydata:company):Promise<any>=>{
    try{
        console.log("email",companydata.email);
        
        const found= await company_model.findOne({$or:[{email:companydata.email},{phonenumber:companydata.phonenumber}]}).select("registration_status")
        if(found) return found

        const result=await company_model.create({
            legalname:companydata.legalname,  
            date:companydata.date,  
            tradingname:companydata.tradingname,
            registration_number:companydata.registration_number,
            GST_number:companydata.GST_number,
            company_type:companydata.company_type,
            primary_industry:companydata.primary_industry,
            phonenumber:companydata.phonenumber,
            email:companydata.email,
        })
        return result
    }
    catch(error:any)
    {
        return `error message ${error.message}`
   }
}
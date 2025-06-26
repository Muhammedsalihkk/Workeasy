import { address, company } from "../interface/company.interface"
import { configdata } from "../config/env"
import { company_model } from "../models/company_schema"
export const register_service= async(companydata:company,admin:any,subscription:any):Promise<any>=>{
    try{
        const {address}=companydata
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
            annual_revanue:companydata.annual_revanue,
            phonenumber:companydata.phonenumber,
            email:companydata.email,
            address:{
                place:address.place,
                pin:address.pin,
                distict:address.distict,
                state:address.state
            }
            
        })
        return result
    }
    catch(error:any)
    {
        return `error message ${error.message}`
   }
}
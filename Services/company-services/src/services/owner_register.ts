import axios from "axios"
export const register_owner=async(company_id:string,ownerdata:any)=>{
        try{            
            const respons:any=await axios.post(`http://auth-service:3001/auth/owner/register/${company_id}`,ownerdata)            
            return respons.data.message
        }
        catch(error:any){
            
            return error.response.data.error||"somthin g wrong"
        }
}
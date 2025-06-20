import axios from "axios"
export const register_owner=async(company_id:string,ownerdata:any)=>{
        try{
            console.log(company_id);
            console.log(ownerdata);
            
            const respons:any=await axios.post(`http://authservice:3001/auth/owner/register/${company_id}`,ownerdata)
            console.log("response",respons.data.message);
            
            return respons.data.message
        }
        catch(error:any){
            
            console.log("asdfghjk");
            
            return error.response?.data?.message||"somthin g wrong"
        }
}
import axios from "axios";

export const getcompanyBYid=async (companyId:string)=>{
    try{
        const {data}=await axios.get(`http://company-service:3000/api/companies/${companyId}`)
        return data.message
    }
    catch(error:any){
        console.log(error.message);
        
    }
}
export const getuserByid=async (userId:string)=>{
    try {
        const {data} =await axios.get(`http://auth-service:3001/api`)
    } catch (error) {
        
    }
}
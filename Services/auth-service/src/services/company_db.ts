import axios from "axios";
import { event } from "../middlewares/evnet_emitter";
export const event_emiter=()=>{
    event.on("admin updation",async(data)=>{
    try{   
        
         
        const response= await axios.put(`http://company-service:3000/api/companies/${data.company_id}`,data,{
            headers:{
            }
        })
    }
    catch(error:any)
    {
        console.log(error.message);
        
    }
})
}

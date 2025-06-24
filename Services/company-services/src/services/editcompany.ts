import { company_model } from "../models/company_schema"

export const editcompany_services = async (id: string, updateddata: any): Promise<any> => {
    try {
        
        console.log(updateddata);
        
      const admin_name=updateddata.name||null
       console.log(updateddata);
       console.log("id is ",id);
       
        if(admin_name)
        {
            updateddata.admin_name=updateddata.name
            const updated = await company_model.findByIdAndUpdate(id,{admin_name}, {
            new: true,
            runValidators: true
        })
        return updated
        }
        else{
            const updated = await company_model.findByIdAndUpdate(id,{...updateddata}, {
            new: true,
            runValidators: true
            
        })
        return updated
        }  
    }
    catch (error) {
        return null
    }

}
export const delete_services = async (id: String): Promise<any> => {
    try {
        const data = await company_model.findByIdAndDelete(id)
        return !!data
    }
    catch(error){
        return null
    }
}
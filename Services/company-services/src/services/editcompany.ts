import { company_model } from "../models/company_schema"

export const editcompany_services = async (id: string, updateddata: any): Promise<any> => {
    try {
        const updated = await company_model.findByIdAndUpdate(id, updateddata, {
            new: true,
            runValidators: true
        })
        return updated
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
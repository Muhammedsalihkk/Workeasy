import { employeemodel } from "../models/employee_model"

export const employee_count_service = async (id: string): Promise<number> => {

    try {
        const count = await employeemodel.countDocuments({ company_id: id,status:"active" })
        console.log(count);
        return count
    }
    catch(error){
        throw error
    }

}
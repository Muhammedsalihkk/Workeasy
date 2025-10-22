import { UserModel } from "../models/userModel";


export const employee_count_service = async (id: string): Promise<number> => {

    try {
        const count = await UserModel.countDocuments({ company_id: id,status:"active" })
        console.log(count);
        return count
    }
    catch(error){
        throw error
    }

}
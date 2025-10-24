
import { User } from "../interfaces/interface";
import { UserModel } from "../models/userModel";
import { hasspassword } from "../utils/hasing";

import { add_activity } from "./Addtoactivity";

export const User_register = async (userdata: User, company_id: string) => {

    try {
        const hashedpassword: string = await hasspassword(userdata.password)
        const result: any = await UserModel.create({
            company_id: company_id,
            employee_id:userdata.employee_id,
            name: userdata.name,
            join_date:userdata.join_date,
            shift:userdata.shift,   
            gender:userdata.gender,
            password: hashedpassword,
            email: userdata.email,
            Salary:userdata.salary,
            number: userdata.number,
            company_role: userdata.company_role,
            department:userdata.department, 
            qualification:userdata.qualification
        })  
        return result
    }
    catch (error: any) {
        console.log(error.message);
        throw error.code
    }

}   
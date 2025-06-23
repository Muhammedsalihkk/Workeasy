
import { hasspassword } from "../utils/hasing";
import { employee } from "../interfaces/interface";
import { employeemodel } from "../models/employee_model";

export const employee_register = async (userdata: employee, company_id: string) => {

    try {
        const hashedpassword: string = await hasspassword(userdata.password)
        const result: any = await employeemodel.create({
            company_id: company_id,
            name: userdata.name,
            password: hashedpassword,
            email: userdata.email,
            number: userdata.number,
            company_role: userdata.role
        })  
        return result
    }
    catch (error: any) {
        return `error essage ${error.message}`
    }

}   
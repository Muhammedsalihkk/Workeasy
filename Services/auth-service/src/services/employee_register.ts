
import { hasspassword } from "../utils/hasing";
import { employee } from "../interfaces/interface";
import { employeemodel } from "../models/employee_model";
import { add_activity } from "./Addtoactivity";

export const employee_register = async (userdata: employee, company_id: string) => {

    try {
        const hashedpassword: string = await hasspassword(userdata.password)
        const result: any = await employeemodel.create({
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

import { hasspassword } from "../utils/hasing";
import { employee } from "../interfaces/interface";
import { employeemodel } from "../models/employee_model";

export const employee_register = async (userdata: employee, company_id: string) => {

    try {
        if(userdata.confirm_password!=userdata.password)
        {
            const err:any=new Error("password not match")
            err.code=400
            throw err
        }
        const hashedpassword: string = await hasspassword(userdata.password)
        const result: any = await employeemodel.create({
            company_id: company_id,
            employee_id:userdata.employee_id,
            name: userdata.name,
            img:userdata.img,
            join_date:userdata.join_date,
            shift:userdata.shift,   
            gender:userdata.gender,
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
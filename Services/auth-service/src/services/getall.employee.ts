import { employeemodel } from "../models/employee_model"

export const getall_employee_service=async(limit:number,
    skip:number,
    search:string,
    role:string,
    status:string,
    shift:string,
    id:string):Promise<any>=>{
   try{
    console.log(id);
    
    const query:any={company_id:id}
    if (role)  query.company_role = role
    
    if (status) query.status = status
    
    if (shift)  query.shift = shift
    
    if(search) query.name={ $regex: search,$options:"i" }
    
    const employees = await employeemodel.find(query,{
        img:1,
        name:1,
        company_role:1,
        shift:1,
        status:1,
        number:1,
        email:1
    }).skip(skip).limit(limit)
    return employees
   }
   catch(error){
    throw error
   }
}
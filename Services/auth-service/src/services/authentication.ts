import { any } from "joi";
import { employeemodel } from "../models/employee_model";
import { ownermodel } from "../models/owner_model";
import { decode_password } from "../utils/hasing";
import { jwt_creation } from "../utils/jwt.creation";
import { is_blocked } from "../middlewares/company_existing";

export const employee_authentication_service=async(data:any):Promise<any>=>{

    try{
    const employee:any=await employeemodel.find({email:data.email})
        
    if(employee.length==0)
    {      
        const err:any=new Error("user not existing")
        err.code=404
        throw err
    }
    const company_blocked=await is_blocked(employee[0].company_id) 
    if(company_blocked)
    {
        const err:any=new Error("this company is blocked in our part")
        err.code=403
        throw err
    }
    const encoded_password=await decode_password(data.password,employee[0].password)
    if(encoded_password)
    {
        const data={employee_id:employee[0]._id.toString(),company_id:employee[0].company_id,role:employee[0].role,company_postion:employee[0].company_role}
        const token =jwt_creation(data)
        return token
    }
    else{
        const err:any=new Error("password not match")
        err.code=401
        throw err
    }
    }
    catch(err){
        return err
    }
}   
export const owner_authentication_service=async(data:any):Promise<any>=>{
    try{
        const owner:any=await ownermodel.find({email:data.email}) 
    if(owner.length==0)
    {
        const err:any=new Error("user not existing")
        err.code=404
        throw err
    }
    
    
    if(owner[0].role=="companyadmin")
    {
        const company_blocked=await is_blocked(owner[0].company_id) 
    if(company_blocked)
    {
        const err:any=new Error("this company blocked from our part")
        err.code=403
        throw err
    }
}
    const encoded_password=await decode_password(data.password,owner[0].password)
    if(encoded_password)
    {    
        const owner_data:any={owner_id:owner[0]._id.toString(),company_id:owner[0].company_id,role:owner[0].role}
        const jwt_token=jwt_creation(owner_data)
        return jwt_token
    }
    else{
        const err:any=new Error("password not match")
        err.code=401
        throw err
    }
    }
    catch(err){
        throw err
    }
}   
    
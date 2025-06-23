import { employeemodel } from "../models/employee_model";
import { ownermodel } from "../models/owner_model";
import { decode_password } from "../utils/hasing";
import { jwt_creation } from "../utils/jwt.creation";

export const employee_authentication_service=async(data:any):Promise<any>=>{

    try{
        const employee:any=await employeemodel.find({email:data.email})
        
    if(employee.length==0)
    {
        
        const err:any=new Error("user not existing")
        err.code=404
        throw err
    }
    const encoded_password=await decode_password(data.password,employee[0].password)
    if(encoded_password)
    {
        const data={id:employee[0]._id.toString(),company_id:employee[0].company_id,role:employee[0].role,company_postion:employee[0].company_role}
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
        const employee:any=await ownermodel.find({email:data.email})
        
    if(employee.length==0)
    {
        
        const err:any=new Error("user not existing")
        err.code=404
        throw err
    }
    const encoded_password=await decode_password(data.password,employee[0].password)
    if(encoded_password)
    {    
        data=employee[0].company_id?{id:employee[0]._id.toString(),company_id:employee[0].company_id,role:employee[0].role}:{id:employee[0]._id.toString(),role:employee[0].role}
        const jwt_token=jwt_creation(data)
        return jwt_token
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
    
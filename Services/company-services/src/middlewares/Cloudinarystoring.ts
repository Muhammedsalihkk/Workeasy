import cloudinary from "../config/cloudinary";
import fs  from 'fs'
export const uploadimage=async(filepath:string):Promise<any>=>{
        try{
            console.log("filepath",filepath);
            
            const result= await cloudinary.uploader.upload(filepath,{
                folder:"company_logo"
            })  
            fs.unlink(filepath,(err)=>{
                if(err){
                    console.log("error accurinfg");
                }
                else{
                    console.log("local file deleted");
                    
                }
            })          
            return result.secure_url
        }
        catch(error){
            console.log(error);
            
        }
}
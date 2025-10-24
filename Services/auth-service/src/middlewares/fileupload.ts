import cloudinary from "../config/cloudinaryConfig";
import fs from 'fs'
export const uploadFile = async (filepath: string) => {
    try {
        const result = await cloudinary.uploader.upload(filepath)
        fs.unlink(filepath,()=>{
            console.log("delted local firl");
            
        })
        return result.secure_url
        
    }
    catch(error:any){
        console.log(error);
        return error.message
    }

}
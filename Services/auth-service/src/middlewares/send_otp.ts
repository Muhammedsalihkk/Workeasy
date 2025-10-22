import nodemailer from 'nodemailer'
import { configdata } from '../config/congration'
import { otp_model } from '../models/otpstor';

import { hasspassword } from '../utils/hasing';
import { UserModel } from '../models/userModel';


export const generateotp=()=>{
    return Math.floor(100000 + Math.random() * 900000);
}
export const sendotp=async (id:string,email:string,otp:number)=>{
    console.log("this is your email",email);
    
    const transport=nodemailer.createTransport({
        service:"gmail",
        auth:{
            user:'muhammedsalihvk8@gmail.com',
            pass:"qtxjdxgoeyfzwzmx"
        }
    })
    const mailOption={
        from:"muhammedsalihvk8@gmail.com",
        to:email,
        subject:"your one time otp",
          html: `
             <p>Hello,</p>
             <p>Your OTP is <b>${otp}</b>.</p>
             <p>Please do not share it with anyone.</p>
             <p>Thanks,<br/>Workeasy Team</p>
  `,

    }
    try{
        const info=await transport.sendMail(mailOption)
        await otp_model.deleteMany({userId:id})
        await otp_model.create({userId:id,otp:otp,expiresAt: new Date(Date.now() +10) })
        return "success"  
    }
    catch(error){
        console.log(error);
        
    }
}
export const verify_OTP=async(id:string,otp:string)=>{


    const response=await otp_model.find({userId:id})
    if(response[0].otp==otp){
        return true
    }
    else{
        return false
    }
}
export const changepassword_service=async (id:string,password:string)=>{
      try{  const result= await hasspassword(password)
        console.log("hashed",result);
        
        const response =await UserModel.findByIdAndUpdate(id,{password:result})
        return true}
    catch(error:any){
        return error.message
    }
}
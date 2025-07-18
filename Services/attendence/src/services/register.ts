import {exec as execNormal} from 'child_process'
import path from 'path';
import { embedded_model } from '../models/attendeceModel';
import util from 'util'
import fs from 'fs'

export const file_register= async(user_id:string,file:string):Promise<string>=>{
  
  try{
    const exec=util.promisify(execNormal)
    const {stdout,stderr}=await exec(`python ./src/embedded/embedded.py "${file}"`)
    if(stderr) throw new Error (stderr) 
    const storeData=JSON.parse(stdout)
    const response= await embedded_model.create({user_id:user_id,face_embedded:storeData})
    fs.unlinkSync(file)

    return "success"
   
  }
  catch(error:any){    
    if(error.code==11000){
      throw new Error("the user id is already exist duplicates not allowed")
    }
    throw error
  }
}

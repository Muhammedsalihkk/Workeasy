import bcrypt from 'bcrypt'

export const hasspassword=async(password:string):Promise<string>=>{
      try{
        const hashed= await bcrypt.hash(password,10)
        return hashed
      }
      catch(err)
      {
         throw err
      }
}

export const decode_password=async(newpassword:string,storedpassword:string):Promise<boolean>=>{
  try{
    const encoded:any=await bcrypt.compare(newpassword,storedpassword,)
    
    return encoded
  }
  catch(err)
  {
    throw err
  }
}
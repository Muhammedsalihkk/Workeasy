import bcrypt from 'bcrypt'

export const hasspassword=async(password:string):Promise<string>=>{
      try{
        const hased= await bcrypt.hash(password,10)
        return hased
      }
      catch(err)
      {
         throw err
      }
}
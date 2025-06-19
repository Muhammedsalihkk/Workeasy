import { owner } from "../interfaces/interface";
import { ownermodel } from "../models/usermodel";
import { hasspassword } from "../utils/hasing";

export const user_registration = async (userdata: owner): Promise<any> => {

    try {
        
        const hashedpassword = await hasspassword(userdata.password)
        const user = await ownermodel.create({
            name: userdata.name,
            password: hashedpassword,
            email: userdata.email,
            number: userdata.number

        })
        return "success"
    }
    catch (error:any) {
       return `error messag${error.message}`
    }
}
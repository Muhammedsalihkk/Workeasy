import { owner } from "../interfaces/interface";
import { ownermodel } from "../models/owner_model";
import { hasspassword } from "../utils/hasing";

export const owner_registration = async (userdata: owner): Promise<any> => {

    try {
            if(userdata.password!=userdata.confirm_password)
            {
                throw "password not match"
            }
        const hashedpassword = await hasspassword(userdata.password)
        const user = await ownermodel.create({
            company_id: userdata.company_id,
            img:userdata.img,
            admin_name: userdata.admin_name,
            password: hashedpassword,
            email: userdata.email,
            number: userdata.number

        })
        return user
    }
    catch (error: any) {
        console.log("thi is error message",error.message);
        
        throw `error messag${error.message}`
    }
}
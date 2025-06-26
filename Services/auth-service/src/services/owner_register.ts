import { owner } from "../interfaces/interface";
import { ownermodel } from "../models/owner_model";
import { hasspassword } from "../utils/hasing";

export const owner_registration = async (userdata: owner): Promise<any> => {

    try {
       
        const hashedpassword = await hasspassword(userdata.password)
        const user = await ownermodel.create({
            company_id: userdata.company_id,
            img:userdata.img,
            name: userdata.name,
            password: hashedpassword,
            email: userdata.email,
            number: userdata.number

        })
        return user
    }
    catch (error: any) {
        return `error messag${error.message}`
    }
}
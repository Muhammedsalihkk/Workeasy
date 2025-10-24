import { any } from "joi";

import { decode_password } from "../utils/hasing";
import { jwt_creation } from "../utils/jwt.creation";
import { is_blocked } from "../middlewares/company_existing";
import { UserModel } from "../models/userModel";

export const authentication = async (data: any): Promise<any> => {

    try {
        const employee: any = await UserModel.find({ email: data.email })

        if (employee.length == 0) {
            const err: any = new Error("user not existing")
            err.code = 404
            throw err
        }
        const company_blocked = await is_blocked(employee[0].company_id)
        if (company_blocked) {
            const err: any = new Error("this company is blocked in our part")
            err.code = 403
            throw err
        }
        const encoded_password = await decode_password(data.password, employee[0].password)
        if (encoded_password) {
            const data = { userId: employee[0]._id.toString(), company_id: employee[0].company_id, role: employee[0].role, company_postion: employee[0].company_role }
            const token = jwt_creation(data)
            return token
        }
        else {
            const err: any = new Error("password not match")
            err.code = 401
            throw err
        }
    }
    catch (err: any) {
        throw err
    }
}


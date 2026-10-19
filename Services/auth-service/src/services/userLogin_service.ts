import { decode_password } from "../utils/hasing";
import { jwt_creation } from "../utils/jwt.creation";
import { is_blocked } from "../middlewares/company_existing";
import { UserModel } from "../models/userModel";

export const authentication = async (data: any): Promise<any> => {
    try {
        const email = data.email ? String(data.email).trim().toLowerCase() : "";
        const user: any = await UserModel.findOne({
            email: { $regex: new RegExp(`^${email}$`, "i") }
        });

        if (!user) {
            const err: any = new Error("User does not exist");
            err.code = 404;
            throw err;
        }

        // Check if user status in UserModel is active
        if (user.status && user.status !== "active") {
            const err: any = new Error("Your account is inactive or blocked");
            err.code = 403;
            throw err;
        }

        // Check if the user's company is blocked
        if (user.company_id) {
            const company_blocked = await is_blocked(user.company_id);
            if (company_blocked) {
                const err: any = new Error("This company is blocked");
                err.code = 403;
                throw err;
            }
        }

        // Verify password
        const passwordMatch = await decode_password(data.password, user.password);
        if (!passwordMatch) {
            const err: any = new Error("Password does not match");
            err.code = 401;
            throw err;
        }

        // Map UserModel properties correctly to JWT payload
        const tokenPayload = {
            userId: user._id.toString(),
            user_id: user._id.toString(),
            company_id: user.company_id,
            role: user.company_role,
            company_role: user.company_role,
            company_postion: user.company_role,
            email: user.email,
            name: user.name,
            department: user.department,
        };

        const token = jwt_creation(tokenPayload);

        return {
            token,
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                company_id: user.company_id,
                company_role: user.company_role,
                department: user.department,
                status: user.status,
            }
        };
    } catch (err: any) {
        console.log("Login error:", err.message);
        throw err;
    }
};


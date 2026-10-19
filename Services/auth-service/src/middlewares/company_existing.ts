
import axios from "axios"
import { Request,Response,NextFunction } from "express"

export const is_blocked = async (id?: string): Promise<boolean> => {
    try {
        if (!id) return false;
        const response: any = await axios.get(`http://company-service:3000/api/companies/${id}`, { timeout: 3000 });
        return Boolean(response?.data?.message?.block);
    } catch (error: any) {
        console.log("Error checking company blocked status:", error?.message);
        return false;
    }
};

import { company_model } from "../models/company_schema"

export const gettallcompany_service = async (skip: number, limit: number, search: string, status: string, Rfromdate: string, Rendate: string, Sfromdate: string, Sendate: string): Promise<any> => {

    try {
        const query: any = {
            legalname: { $regex: search, $options: "i" },
        }
        if (status) {
            query.status = status
        }
        if (Rfromdate || Rendate) {
            query.date = {}
            if (Rfromdate) {
                query.date.$gte = Rfromdate
            }
            if (Rendate) {
                query.date.$lte = Rendate
            }
        }

        const companies_data = await company_model.find(query, { legalname: 1, date: 1, status: 1 }).skip(skip).limit(limit)
        return companies_data
    }
    catch (error) {
        throw error
    }
}
import { employeemodel } from "../models/employee_model"

export const getall_employee_service = async (limit: number,
    skip: number,
    search: string,
    department: string,
    status: string,
    shift: string,
    id: string): Promise<any> => {
    try {
        const query: any = { company_id: id }
        if (department) query.department = department
        if (status) query.status = status
        if (shift) query.shift = shift
        if (search) {
            query.$or = [
                { name: { $regex: search, $options: "i" } },
                { shift: { $regex: search, $options: "i" } },
                { company_role: { $regex: search, $options: "i" } },
                { email: { $regex: search, $options: "i" } },
            ];
        }

        const employees = await employeemodel.find(query, {
            img: 1,
            name: 1,
            company_role: 1,
            shift: 1,
            status: 1,
            number: 1,
            email: 1,
            department: 1,
            join_date: 1,
            employee_id: 1
        }).skip(skip).limit(limit)
        return employees
    }
    catch (error) {
        throw error
    }
}
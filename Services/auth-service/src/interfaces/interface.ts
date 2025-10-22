import { Document } from "mongoose";


export interface User {
  company_id: string;
  img?: string; 
  confirm_password:string                    // optional
  employee_id?: string;
  dob?: string;                      // optional
  shift?: string;                    // optional
  join_date?: string;                // optional
  name: string;
  gender: string;
  password: string;
  email: string;
  number: string;
  company_role: "Admin" | "StockDepartment" | "SalesDepartment"; // enum
  department: string;
  status?: string;                   // default: "active"
  qualification: string;
  salary?: number;                   // optional, schema doesn’t have it but interface had it
  Address?: {                        // optional nested object
    place?: string;
    pin?: number;
    distct?: string;
    state?: string;
  };
}

export interface authentication{
    email:string,
    password:string
}
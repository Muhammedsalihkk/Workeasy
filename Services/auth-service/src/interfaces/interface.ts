import { Document } from "mongoose";

import {Request} from "express"
export interface User {
  company_id: string;
  img?: string;

  company_role: "Admin" | "Employee";

  employee_id?: string;
  dob?: string;

  shift?: {
    type: "Morning" | "Evening" | "Night" | "Flexible";
    startTime: string;
    endTime: string;
  };

  join_date?: string;

  name: string;
  gender: string;

  password: string;
  email: string;
  number: string;

  department?: 
    | "StockDepartment"
    | "SalesDepartment"

  status?: string; // default: active
  qualification: string;

  Address?: {
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
export interface AuthRequest extends Request {
  user?: any;
  cookies: {
    token: string;
  };
}
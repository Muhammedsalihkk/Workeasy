import { Document } from "mongoose";

export interface owner {
    name: string
    password: string
    number: string
    email: string
}
export interface employee {
    name: string
    password: string
    number: string
    email: string
    role: string
    comapny_role: string
}
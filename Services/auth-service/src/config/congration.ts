import dotenv, { config } from 'dotenv'
dotenv.config()
export const configdata = {
    db_address: process.env.MONGO_DB,
    JSON_secret:process.env.JWT_SECRET as string
}
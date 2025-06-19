import dotenv from 'dotenv'
dotenv.config()

export const configdata={
    Port:process.env.PORT||3000,
    Db:process.env.DB_API
}

import dotenv from 'dotenv'
dotenv.config()

export const configData={
    db_address:process.env.DB_ADDRESS,
    jwt_secret:process.env.JWT_SECRET,
    port:process.env.PORT

}
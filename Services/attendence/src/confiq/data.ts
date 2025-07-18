import dotenv from 'dotenv'

dotenv.config()

const secret_data={
    port:process.env.PORT,
    db_url:process.env.DB_API as string,
    jwt_token:process.env.JWT_SECRET as string
}
export default secret_data
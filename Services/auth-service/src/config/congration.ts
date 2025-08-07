import dotenv, { config } from 'dotenv'
dotenv.config()
export const configdata = {
    db_address: process.env.MONGO_DB,
    JSON_secret:process.env.JWT_SECRET as string,
    cloudinary_name:process.env.CLOUDINARY_CLOUD_NAME as string,
    cloudinary_api_key:process.env.CLOUDINARY_API_KEY as string,
    cloudinary_api_secret:process.env.CLOUDINARY_API_SECRET,
    rabitmq_address:process.env.RABBITMQ_URL as string,
    twilio_sid:process.env.TWILIO_SID as string,
    auth_token:process.env.AUTH_TOKEN as string,
    twilio_number:process.env.TWILIO_NUMBER
}
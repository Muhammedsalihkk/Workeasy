import dotenv from 'dotenv'

dotenv.config()

export const configration_data:any={
        db_port:process.env.DB_PORT,
        server_port:process.env.SERVER_PORT,
        razorpay_id:process.env.RAZOR_ID,
        razorpay_key:process.env.RAZOR_SECRET_KEY,
        rabitmq_server:process.env.RABITMQ_PORT
}
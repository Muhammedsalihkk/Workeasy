import dotenv from 'dotenv'
dotenv.config()

export const configdata={
    Port:process.env.PORT||3000,
    Db:process.env.DB_API,
    JWT_TOEKN:process.env.JWT_SECRET as string,
    cloudinary_name:process.env.CLOUDINARY_CLOUD_NAME as string,
    cloudinary_api_key:process.env.CLOUDINARY_API_KEY as string,
    cloudinary_api_secret:process.env.CLOUDINARY_API_SECRET

}

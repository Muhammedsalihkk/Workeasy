import {v2 as cloudinary } from 'cloudinary'
import { CloudinaryStorage } from 'multer-storage-cloudinary'
import { configdata } from './congration'

cloudinary.config({
    cloud_name:configdata.cloudinary_name,
    api_key:configdata.cloudinary_api_key,
    api_secret:configdata.cloudinary_api_secret
})
export default cloudinary
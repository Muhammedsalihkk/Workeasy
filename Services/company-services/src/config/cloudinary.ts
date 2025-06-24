import { v2 as cloudinary } from "cloudinary";
import { configdata } from "./env";

export default cloudinary.config({
    cloud_name:configdata.cloudinary_name,
    api_key:configdata.cloudinary_api_key,
    api_secret:configdata.cloudinary_api_secret
})
import multer from "multer";
import path from "path";

const storage=multer.diskStorage({
        destination:(req,file,cb)=>{
            cb(null,"images/")
        },
        filename:(req,file,cb)=>{
            const exct=path.extname(file.originalname)
            cb(null,Date.now()+exct)
        }
})
const upload=multer({storage:storage})
export default upload
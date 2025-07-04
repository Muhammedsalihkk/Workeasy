import { activities_model } from "../models/Activities"

export const add_activity = async (id: string, message: string) => {
    try {
        await activities_model.create({
            userId: id,
            activity: message,
        })
        console.log("completed");
    }
    catch(err){
        console.log(err);
        
    }
    

}
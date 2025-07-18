import { attendecContorler, embedded_model } from "../models/attendeceModel"
import { exec as exactexce } from "child_process"
import util from 'util'
import { spawn } from "child_process"

export const face_checking = async (user_id: string, file: string) => {
    const exec = util.promisify(exactexce)

    const storeData = await embedded_model.findOne({ user_id: user_id })


    if (!storeData) {
        throw new Error("user id is not match")
    }

    const facedata = JSON.stringify(storeData.face_embedded)

    return new Promise((resolve, reject) => {
        const process = spawn('python3', ['-W ignore','./src/embedded/Checking.py', facedata, file])
        process.stdout.on("data", (data) => {
            resolve(data.toString())
        })
        process.stderr.on("data", (data) => {

            reject(data.toString())
        })
        process.on('error', (err) => {
            reject(err)
        })
    })

}
export const Check_in = async (id: string,company_id:string ,file: string) => {
    try {
        const response = await face_checking(id, file)
        const time=new Date()
        const attendence = await attendecContorler.create({ user_id: id,company_id:"123456",check_Time:time.toLocaleTimeString()})
       
        return attendence
    }
    catch (error: any) {
        throw new Error(error)
    }
}

export const check_out = async (id: string) => {
    try {
        const clock_time: any = await attendecContorler.findOne({ user_id: id }).select("clock_in")
        const checkInTime = new Date(clock_time.clock_in)
        const now = new Date()
        if (clock_time) {
            const diffMs = now.getTime() - checkInTime.getTime()
            const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
            const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60))
            const working_hour = `${diffHours}:${diffMinutes}`
          console.log(id);
        const response = await attendecContorler.updateOne(
            {user_id: id},
            {
            check_Time: checkInTime.toLocaleTimeString(),
            clock_out: now.toLocaleTimeString(),
            working_hour:working_hour
            })            
        
        return response
    }
        
    }
    catch (err:any) {
        console.log(err.message);
        
    }
}


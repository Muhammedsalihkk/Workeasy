import amqp from 'amqplib'
import { configdata } from './env'
import { company_model } from '../models/company_schema'

export const recivemessage = async () => {
    const connection = await amqp.connect(configdata.rabitmq_service)
    const channel = await connection.createChannel()
    const queue = 'workqueue'
    const queue1 = 'authservice'
    const queue2="editname"
    await channel.assertQueue(queue)
    await channel.assertQueue(queue1)
    await channel.assertQueue(queue2)
    await channel.consume(queue, async (msg) => {
        if (msg !== null) {
            const data: any = JSON.parse(msg.content.toString())
            console.log("recivemessage", data);
            data.registration_status = "admin"
            await company_model.findByIdAndUpdate(data.id, data)
            channel.ack(msg)
        }
    })
    await channel.consume(queue1, async (msg) => {
        if (msg !== null) {
           try{
            const data: any = JSON.parse(msg.content.toString())
            console.log("recivemessage",data);
            await company_model.findByIdAndUpdate(data.id, data)
        }
        catch(error){
            console.log("Rabitmq",error);
            
        }
        finally{
            channel.ack(msg)
        }
            
        }
    })
    await channel.consume(queue2, async (msg)=>{
        if(msg!=null)
        {
           try{
             const data:any=JSON.parse(msg.content.toString())
            const updated=data.admin_name
            await company_model.findByIdAndUpdate(data.id,updated)
        }catch(error){
            console.log("Rabitmq",error);
            
        }
        finally{
            channel.ack(msg)
        }       
        }
            
    })
   

}
import amqp from 'amqplib'
import { configration_data } from './congig.data'

export const send_message=async(data:any)=>{
 
 try{
    const connection= await amqp.connect(configration_data.rabitmq_server)
    const channel=await connection.createChannel()
    const queue='workqueue'
    await channel.assertQueue(queue)
    channel.sendToQueue(queue,Buffer.from(JSON.stringify(data)),{persistent:true})    
    await channel.close()
    await connection.close()
    return "success"
 }
 catch(error)
 {
   console.log("rabit issss");
    console.log("request sednig fialed",error);
    return "fiald"
    
 }
}
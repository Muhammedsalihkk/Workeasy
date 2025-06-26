import amqp from 'amqplib'
import { configdata } from './env'
import { company_model } from '../models/company_schema'

export const recivemessage = async () => {
    const connection = await amqp.connect(configdata.rabitmq_service)
    const channel = await connection.createChannel()
    const queue = 'workqueue'
    const queue1 = 'authservice'
    await channel.assertQueue(queue)
    await channel.assertQueue(queue1)
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
            const data: any = JSON.parse(msg.content.toString())
            console.log("recivemessage", data);
            await company_model.findByIdAndUpdate(data.id, data)
            channel.ack(msg)
        }
    })
   

}
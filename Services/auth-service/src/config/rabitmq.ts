import amqp from 'amqplib'
import { configdata } from './congration'

export const send_message = async (data: any) => {
    try {   
        const connection = await amqp.connect(configdata.rabitmq_address)
        const channel = await connection.createChannel()
        const queue = "authservice"
        const queue1="editname"
        await channel.assertQueue(queue)
        await channel.assertQueue(queue1)
        channel.sendToQueue(queue, Buffer.from(JSON.stringify(data)), { persistent: true })
        channel.sendToQueue(queue1,Buffer.from(JSON.stringify(data)), {persistent:true})
        await channel.close()
        await connection.close()
        return "success"
    }
    catch (error) {
            return "faild"
    }
}
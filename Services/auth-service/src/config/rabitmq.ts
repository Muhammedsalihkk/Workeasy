import amqp from 'amqplib'
import { configdata } from './congration'

export const send_message = async (data: any) => {
    try {

        const connection = await amqp.connect(configdata.rabitmq_address)
        const channel = await connection.createChannel()
        const queue = "authservice"
        await channel.assertQueue(queue)
        channel.sendToQueue(queue, Buffer.from(JSON.stringify(data)), { persistent: true })
        await channel.close()
        await connection.close()
        return "success"
    }
    catch (error) {
            return "faild"
    }
}
import amqp from 'amqplib'
import { configdata } from './env'
import { company_model } from '../models/company_schema'

// Using any for connection and channel to avoid type definition issues
// Runtime checks ensure type safety
let connection: any = null
let channel: any = null
let isConnecting = false
let reconnectAttempts = 0
const MAX_RECONNECT_ATTEMPTS = 10
const RECONNECT_DELAY_MS = 5000 // 5 seconds
const MAX_RECONNECT_DELAY_MS = 60000 // 1 minute max

// Exponential backoff delay calculation
const getReconnectDelay = (attempt: number): number => {
    const delay = Math.min(RECONNECT_DELAY_MS * Math.pow(2, attempt), MAX_RECONNECT_DELAY_MS)
    return delay
}

// Cleanup connection and channel
const cleanup = async () => {
    try {
        if (channel) {
            try {
                await channel.close()
            } catch (error) {
                // Ignore cleanup errors
            }
            channel = null
        }
        if (connection) {
            try {
                if ('close' in connection && typeof connection.close === 'function') {
                    await connection.close()
                }
            } catch (error) {
                // Ignore cleanup errors
            }
            connection = null
        }
    } catch (error) {
        console.error('Error during RabbitMQ cleanup:', error)
    }
}

// Setup message consumers
const setupConsumers = async (ch: any) => {
    const queue = 'workqueue'
    const queue1 = 'authservice'
    const queue2 = 'editname'

    try {
        await ch.assertQueue(queue, { durable: true })
        await ch.assertQueue(queue1, { durable: true })
        await ch.assertQueue(queue2, { durable: true })

        // Queue 1 - workqueue
        await ch.consume(queue, async (msg: any) => {
            if (msg !== null) {
                try {
                    const data: any = JSON.parse(msg.content.toString())
                    console.log("recivemessage from workqueue", data)
                    data.registration_status = "admin"
                    await company_model.findByIdAndUpdate(data.id, data)
                    ch.ack(msg)
                } catch (error) {
                    console.error("Error processing workqueue message:", error)
                    // Nack the message and requeue it for retry
                    ch.nack(msg, false, true)
                }
            }
        }, { noAck: false })

        // Queue 2 - authservice
        await ch.consume(queue1, async (msg: any) => {
            if (msg !== null) {
                try {
                    const data: any = JSON.parse(msg.content.toString())
                    console.log("recivemessage from authservice", data)
                    await company_model.findByIdAndUpdate(data.id, data)
                    ch.ack(msg)
                } catch (error) {
                    console.error("Error processing authservice message:", error)
                    // Nack the message and requeue it for retry
                    ch.nack(msg, false, true)
                }
            }
        }, { noAck: false })

        // Queue 3 - editname
        await ch.consume(queue2, async (msg: any) => {
            if (msg !== null) {
                try {
                    const data: any = JSON.parse(msg.content.toString())
                    console.log("recivemessage from editname", data)
                    const updated = { admin_name: data.admin_name }
                    await company_model.findByIdAndUpdate(data.id, updated)
                    ch.ack(msg)
                } catch (error) {
                    console.error("Error processing editname message:", error)
                    // Nack the message and requeue it for retry
                    ch.nack(msg, false, true)
                }
            }
        }, { noAck: false })

        console.log('RabbitMQ consumers setup successfully')
    } catch (error) {
        console.error('Error setting up RabbitMQ consumers:', error)
        throw error
    }
}

// Initialize RabbitMQ connection
const initializeConnection = async (): Promise<void> => {
    if (isConnecting) {
        return
    }

    isConnecting = true

    try {
        if (!configdata.rabitmq_service) {
            throw new Error('RabbitMQ connection string is not configured')
        }

        console.log('Attempting to connect to RabbitMQ...')
        // @ts-ignore - amqplib type definitions have issues
        const conn = await amqp.connect(configdata.rabitmq_service)
        connection = conn
        // @ts-ignore - amqplib type definitions have issues  
        const ch = await conn.createChannel()
        channel = ch

        // Set prefetch to avoid overwhelming the consumer
        await ch.prefetch(10)

        // Handle connection errors
        conn.on('error', (error) => {
            console.error('RabbitMQ connection error:', error)
            channel = null
        })

        conn.on('close', () => {
            console.warn('RabbitMQ connection closed. Attempting to reconnect...')
            channel = null
            connection = null
            isConnecting = false
            reconnectAttempts++
            scheduleReconnect()
        })

        // Handle channel errors
        ch.on('error', (error) => {
            console.error('RabbitMQ channel error:', error)
        })

        ch.on('close', () => {
            console.warn('RabbitMQ channel closed')
            channel = null
        })

        // Setup consumers
        await setupConsumers(ch)

        reconnectAttempts = 0 // Reset on successful connection
        console.log('RabbitMQ connected successfully')
    } catch (error) {
        console.error('Failed to connect to RabbitMQ:', error)
        connection = null
        channel = null
        reconnectAttempts++
        scheduleReconnect()
    } finally {
        isConnecting = false
    }
}

// Schedule reconnection with exponential backoff
const scheduleReconnect = () => {
    if (reconnectAttempts >= MAX_RECONNECT_ATTEMPTS) {
        console.error(`Max reconnection attempts (${MAX_RECONNECT_ATTEMPTS}) reached. RabbitMQ connection failed.`)
        return
    }

    const delay = getReconnectDelay(reconnectAttempts - 1)
    console.log(`Scheduling RabbitMQ reconnection attempt ${reconnectAttempts} in ${delay}ms...`)

    setTimeout(() => {
        if (!connection || !channel) {
            initializeConnection().catch((error) => {
                console.error('Reconnection attempt failed:', error)
            })
        }
    }, delay)
}

// Main function to start RabbitMQ connection
export const recivemessage = async (): Promise<void> => {
    try {
        await initializeConnection()
    } catch (error) {
        console.error('Error initializing RabbitMQ:', error)
        // Don't throw - allow service to continue without RabbitMQ
        // Schedule reconnection attempt
        scheduleReconnect()
    }
}

// Graceful shutdown handler
export const closeRabbitMQConnection = async (): Promise<void> => {
    console.log('Closing RabbitMQ connection...')
    await cleanup()
}

// Handle process termination
process.on('SIGINT', async () => {
    await closeRabbitMQConnection()
    process.exit(0)
})

process.on('SIGTERM', async () => {
    await closeRabbitMQConnection()
    process.exit(0)
})
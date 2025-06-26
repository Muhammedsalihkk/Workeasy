import cron from 'node-cron'
import { subscription_model } from '../models/Submodel'

cron.schedule('0 0 * * *', () => {

    const date = new Date()
    const result = subscription_model.updateMany(
        { plan_end: { $lt: date }, Status: "active" },
        { $set: { Status: "deactive" } },
    )

})
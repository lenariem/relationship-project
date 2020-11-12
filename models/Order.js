const mongoose = require('mongoose')
const {
    Schema,
    model
} = mongoose

const Addon = require('./Addon')

const OrderSchema = new Schema({
    order_date: {
        type: Date,
        default: Date.now,
        required: true
    },
    customer: {
        type: mongoose.ObjectId,
        ref: "customer"
    },
    orderItem: [{
        pizza: {
            type: mongoose.ObjectId,
            ref: "pizza",
            required: true
        },
        quantity: {
            type: Number,
            required: true
        },
        addon: [Addon]
    }]

})

module.exports = model('order', OrderSchema)
const mongoose = require('mongoose')
const {
    Schema,
    model
} = mongoose
const Address = require('./Address')

const CustomerSchema = new Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    address: {
        type: Address,
        required: true
    }
}, {
    versionKey: false
});

module.exports = model('customer', CustomerSchema)
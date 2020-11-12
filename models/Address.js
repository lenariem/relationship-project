const mongoose = require('mongoose');
const {
    Schema
} = mongoose;

const AddressSchema = new Schema({
    city: {
        type: String,
        required: true,
        default: "no addons"
    },
    street: {
        type: String,
        required: true,
    },
    zipcode: {
        type: String,
        required: true,
    }
}, {
    versionKey: false
});

module.exports = AddressSchema;
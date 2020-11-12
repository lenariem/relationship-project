const mongoose = require('mongoose')
const {
    Schema,
    model
} = mongoose

const PizzaSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
}, {
    versionKey: false
});

module.exports = model('pizza', PizzaSchema)
const mongoose = require('mongoose');
const {
    Schema
} = mongoose;

const AddonSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    upsell: {
        type: Number,
        required: true,
    }
}, {
    versionKey: false
});

module.exports = AddonSchema
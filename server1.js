const express = require("express")
const app = express()
const mongoose = require("mongoose")
const {
    Schema,
    model
} = mongoose



let PORT = 5000
app.listen(PORT, () => console.log("Served started up"))

mongoose.connect('mongodb+srv://new_user1:pamTARs@cluster0.uiclr.mongodb.net/exerciseDB?retryWrites=true&w=majority', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    })
    .then(() => console.log("Connected to DB successfully"))
    .catch(err => console.log("Connection failed", err.message))



// EMBEDDING address into customer
const AddressSchema = new Schema({
    street: {
        type: String,
        required: true
    },
    zipcode: {
        type: String,
        required: false
    },
    city: {
        type: String,
        required: true
    }
})

const CustomerSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    address: [AddressSchema]
}) 

const Customer = model('Customer', CustomerSchema)

// seed in "embedded data"
app.get('/seed', async (req, res, next) => {

    await Customer.deleteMany() // delete all from Customer collection, prevent adding the same customers over and over again 

    const customers = await Customer.insertMany([{
            firstName: "Petra",
            lastName: "Weiss",
            address: [{
                street: "Alexanderplatz",
                zipcode: "12345",
                city: "Berlin"
            }]
        },
        {
            firstName: "Michael",
            lastName: "Rot",
            address: [{
                street: "Templehofer  Damm",
                zipcode: "12389",
                city: "Berlin"
            }]
        }
    ])

    res.send(customers)
}) 


app.get('/seed', async (req, res, next) => {

    await Customer.deleteMany() // delete all from Customer collection, prevent adding the same customers over and over again 

    const customers = await Customer.insertMany([{
            firstName: "Petra",
            lastName: "Weiss",
            address: [{
                street: "Alexanderplatz",
                zipcode: "12345",
                city: "Berlin"
            }]
        },
        {
            firstName: "Michael",
            lastName: "Rot",
            address: [{
                street: "Templehofer  Damm",
                zipcode: "12389",
                city: "Berlin"
            }]
        }
    ])

    res.send(customers)
})



app.get('/customers', async (req, res, next) => {
    let customers = await Customer.find()
    res.send(customers)
})
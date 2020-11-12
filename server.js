const express = require("express")
const connectDB = require('./config/db')
const app = express()
const mongoose = require("mongoose")
const faker = require('faker')

//to import models
const Customer = require('./models/Customer')
const Order = require('./models/Order')
const Pizza = require('./models/Pizza')

//middleware
app.use(express.json())

let PORT = 5000
app.listen(PORT, () => console.log("Served started up"))

//connect DB
connectDB()

app.get('/seed', async (req, res, next) => {

    await Customer.deleteMany() // delete all from Customer collection, prevent adding the same customers over and over again 
    await Order.deleteMany()
    await Pizza.deleteMany()

    //create 2 customers
    const customers = await Customer.insertMany([{
            firstName: faker.name.firstName(),
            lastName: faker.name.lastName(),
            address: {
                street: faker.address.streetName(),
                zipcode: faker.random.number({
                    min: 0,
                    max: 500
                }),
                city: faker.address.city()
            }
        },
        {
            firstName: faker.name.firstName(),
            lastName: faker.name.lastName(),
            address: {
                street: faker.address.streetName(),
                zipcode: faker.random.number({
                    min: 0,
                    max: 500
                }),
                city: faker.address.city()
            }
        }
    ])


    //create 3 pizzas
    const pizzas = await Pizza.insertMany([{
            name: "Margarita",
            price: 6
        },
        {
            name: "Salami",
            price: 8
        },
        {
            name: "Prosciutto",
            price: 10
        },
    ])



    //create 2 orders
    const orders = await Order.insertMany([{
            order_date: "2020-10-29",
            customer: customers[0]._id,
            orderItem: [{
                pizza: pizzas[0]._id,
                quantity: 2
            }]
        },
        {
            order_date: "2020-10-28",
            customer: customers[1]._id,
            orderItem: [{
                    pizza: pizzas[1]._id,
                    quantity: 3
                },
                {
                    pizza: pizzas[2]._id,
                    quantity: 1,
                    addon: [{
                        name: "broccoli",
                        upsell: 0.8
                    }]
                }

            ]
        },
    ])
    res.send(orders)
})





//after seed, DB is filled with customers
app.get('/customers', async (req, res, next) => {
    let customers = await Customer.find()
    res.send(customers)
})

app.get('/orders', async (req, res, next) => {
    let orders = await Order.find()
        .select('-_id -__v')
        .populate('customer', 'address.city-_id')
        .populate('orderItem.pizza', '-_id')
    res.send(orders)
})

//updating quantity of an order item
app.patch('/orders/:id/orderItem/:orderItemId', async (req, res, next) => {

    const {
        id,
        orderItemId
    } = req.params
    const order = await Order.findById(id)
    let orderToUpdate = order.orderItem.id(orderItemId)
    Object.assign(orderToUpdate, req.body)
    let updatedOrder = await order.save()
    res.send(updatedOrder)
})


//sum of one order
app.get('/result/:orderItemId', async (req, res, next) => {
    const {orderItemId} = req.params
    let order = await Order.findById(orderItemId)
        .populate('orderItem.pizza', '-_id')
    console.log(order)
    let result = order.orderItem.reduce((sum, orderItem) => sum + orderItem.pizza.price * orderItem.quantity, 0);
    res.send({
        OrderSum: result,
        OrderId: orderItemId
    })
})

//sum of all orders
app.get('/sum/', async (req, res, next) => {

    let orders = await Order.find().populate('orderItem.pizza', '-_id')
    let sum = orders.map(order => {
        let result = order.orderItem.reduce((sum, orderItem) => sum + orderItem.pizza.price * orderItem.quantity, 0);
        // from map, we are inside map
        return ({
            OrderSum: result,
            OrderId: order.id
        })
    })
    console.log(sum)
    /* [{ OrderSum: 12, OrderId: '5f9e9a76f9874e55e4aadef8' },
      { OrderSum: 34, OrderId: '5f9e9a76f9874e55e4aadefa' }] */

    let total = orders.reduce((acc, order) => {
        let ordersSum = order.orderItem.reduce((accOrder, orderItem) => {
            return accOrder + orderItem.pizza.price * orderItem.quantity
        }, 0)
        let totalSum = acc + ordersSum
        return totalSum
    }, 0)
    res.send({
        sumByOrder: sum,
        total: total
    })
})


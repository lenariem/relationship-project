# Data Modelling - Exercise #2 - References (Ref)

In this exercise we want to train creating relationship by REFERENCING MongoDB documents
(= outsourcing related documents to own collections)

## Create a pizza shop data model

### Part 1 - Order model

* Create an order model (with a field: order_date)

    * How to work with dates? => https://mongoosejs.com/docs/tutorials/dates.html
        * The initial two code snippets show to define and insert a date (that's all you need)

* Setup relationships between Orders and Customers
    
    * Place a ref to the customer model in the order schema ("Every order has exaxtly ONE customer")
   
    * Hint: use a "ref" field to declare relations: ` { type: Schema.Types.ObjectId, ref: '<OtherModel>' } `


### Part 2 - Pizza model

* Create a pizza model (fields: name, price)

* Setup relationships between Pizzas & Orders

    * Place an array of pizza refs in the order schema ("Every order can have ONE up to MANY pizzas")

    * Hint: creating an array of "refs": ` [{ type: Schema.Types.ObjectId, ref: '<OtherModel>' }] `


## BONUS TASK - Seed it

Update your seed route for inserting relational data:

- Setup purging (=removing) of all data before seeding
    - Clear all orders
    - Clear all pizzas
    - Clear all customers

- Create three pizzas

- Create two orders:
	- customer 1 ordered one pizza today
	- customer 2 ordered two pizzas yesterday
    - hint: you can hardcode the order dates (format: YYYY-MM-DD)
    - remember you have to insert IDs (!) as value for a reference field
    - how to reference an array of IDs (=refs): ` pizzas: [ pizzaID1, pizzaID2, ... ] `

Test if it works by starting your app and calling your seed route in the browser 

This will prevent that you get an overload of data into your DB (much easier for testing)


## BONUS TASK - Give us some structure...

* Outsource the schemas + models to a models folder 
    * Create a file for each schema: customer.js, order.js, pizza.js
    * Export the model at the end of each file

* Import the models in your server.js file

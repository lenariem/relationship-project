# Data Modelling - Exercise #1 - Schema nesting

In this exercise we want to train document nesting in a schema.

## Task: Provide a customer schema

* Install package mongoose
* Create a file server.js
    
    * Import mongoose and setup a mongoose connection
    * Connect to a database "pizza_db": `mongooose.connect("mongodb://localhost/pizza_db")`
        * remember: The pizza_db does not need to exist yet!
        * It will be created automaticaly once we create / write our first document to a collection

    * Create a customer schema with these basic fields: 
        * firstname, lastname
        * embedd the customer address in your customer schema
            * fields: street, zipcode, city
            * use a separate schema for the address please
    * Create a Customer model


## BONUS

Setup an Express app in server.js

Create a GET route "/seed"

In the seed route:
- insert two Customers hardcoded (or - if you are not lazy today - do it with faker :))

Test your seed route by starting your app and calling the /seed route in the browser

Seeding works? 
- add purging of all customers before you seed data
    - At the beginning of your seed route: Clear all your customers using the deleteMany() function
    - This way you prevent adding the same customers over and over again


## BONUS

* Make the nested address document required 
* In case it was not taught: Research how to make an embedded document required in a Mongoose schema

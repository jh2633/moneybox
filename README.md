#Instructions

Pull this repository

Run npm install to install the npm modules listed in package.json
```
$npm install
```

Setup mongoDB and start the mongodb server, instructions can be found [here](http://mongodb.github.io/node-mongodb-native/2.2/quick-start/?_ga=1.2108464.1286289227.1480666318)

Start the node server

```
$node server.js
```

#Requirements

New transaction  - POST /api/transactions  
View single transaction  - GET /api/transactions/:transactionId  
Update transaction  - PUT /api/transactions/:transactionId  
Delete transaction  - DELETE /api/transactions/:transactionId  
All transactions - GET /api/transactions

#Time & Reflection
The tech test took me seven hours to complete, however this is the first time
that I've worked with MongoDB, and some issues that arose during setup caused
some delay, but all difficulties were eventually overcome.

A schema was  created for the transactions, and it can be viewed in the models
directory.

#Features to be added
Further testing will be added using Mocha and Superagent.
RESTful API functions tested using Postman.

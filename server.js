
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var Transaction = require('./app/models/transaction.js');

var mongoose   = require('mongoose');
mongoose.connect('mongodb://localhost'); // connect to our database

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;        // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });
});
router.route('/transactions')

    // create a bear (accessed at POST http://localhost:8080/api/bears)
    .post(function(req, res) {

        var transaction = new Transaction();      // create a new instance of the Bear model
        transaction.transactionId = req.body.id;  // set the bears name (comes from the request)
        transaction.transactionDate = req.body.date;
        transaction.transactionAmount = req.body.amount;
        transaction.description = req.body.description;
        transaction.createdDate = new Date();
        transaction.currencyCode = req.body.currency;
        transaction.merchant = req.body.merchat;
        // save the bear and check for errors
        transaction.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'New transaction recorded!' });
        });
      })

    .get(function(req, res) {
            Transaction.find(function(err, transactions) {
        if (err)
            res.send(err);

        res.json(transactions);
    });

    });

router.route('/transactions/:transactionId')

        // get the bear with that id (accessed at GET http://localhost:8080/api/bears/:bear_id)
        .get(function(req, res) {
            Transaction.find({"transactionId": req.params.transactionId}, function(err, transaction) {
                if (err)
                    res.send(err);
                res.json(transaction);
            });
        });

app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Connection on port ' + port);

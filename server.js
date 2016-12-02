require('dotenv').config();
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var Transaction = require('./app/models/transaction.js');

var mongoose   = require('mongoose');
mongoose.connect('mongodb://'+process.env.DB_USER+':'+process.env.DB_PASS+'@ds119578.mlab.com:19578/techtest'); // connect to our database

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

    .post(function(req, res) {

        var transaction = new Transaction();
        transaction.transactionId = req.body.id;
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

        .get(function(req, res) {
            Transaction.find({"transactionId": req.params.transactionId}, function(err, transaction) {
                if (err)
                    res.send(err);
                res.json(transaction);
            });
        })

        .put(function(req, res) {

          Transaction.findOne({"transactionId": req.params.transactionId}, function(err, transaction) {

            if (err)
              res.send(err);

              transaction.transactionId = req.body.id;
              transaction.transactionDate = req.body.date;
              transaction.transactionAmount = req.body.amount;
              transaction.description = req.body.description;
              transaction.modifiedDate = new Date();
              transaction.currencyCode = req.body.currency;
              transaction.merchant = req.body.merchat;

              transaction.save(function(err) {
                if (err)
                    res.send(err);
                    res.json({ message: 'Transaction updated!' });
            });

        })
      })

        .delete(function(req, res) {
            Transaction.remove({ "transactionId": req.params.transactionId}, function(err, transaction) {
        if (err)
            res.send(err);
            res.json({ message: 'Successfully deleted' });
            });
        });


app.use('/api', router);

app.listen(port);
console.log('Connection on port ' + port);

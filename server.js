var express    = require('express');
var mongskin = require('mongoskin')
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var db = mongoskin.db('localhost:8080/test', {safe:true});

app.param('transaction', function(req, res, next, transactionName){
  req.collection = db.collection(transactionName)
  return next()
} )

app.get('/', function(req, res){
  res.send('Welcome, please select a transaction')
})

app.get('/transactions/:transactionName', function(req, res){
  req.collection.find({}, {limit:10, sort: [['_id, -1']]}).toArray(function(e, results){
    if (e) return next(e)
    res.send(results)
   })
})

app.get()

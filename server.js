var express    = require('express');
var mongoskin = require('mongoskin')
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var db = mongoskin.db('mongodb://localhost:27017/test', {safe:true});

var port = process.env.PORT || 3000

app.param('collectionName', function(req, res, next, collectionName){
  req.collection = db.collection(collectionName)
  return next()
} )

app.get('/transactions', function(req, res){
  res.send('Welcome, please select a transaction')
});

app.get('/transactions/:collectionName', function(req, res){
  req.collection.find({}, {limit:10, sort: [['_id, -1']]}).toArray(function(err, results){
    if (err) return next(err)
    res.send(results)
   })
});

app.post('/transactions/:collectionName', function(req, res){
  req.collection.insert(req.body, {}, function(err, results){
    if (err) return next(err)
    res.send(results)
  })
});

app.listen(port);
console.log('Server running on port '+ port);

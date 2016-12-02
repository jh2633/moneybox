var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TransactionSchema   = new Schema({
    transactionId: Number,
    transactionDate: Date,
    description: String,
    transactionAmount: Number,
    createdDate: Date,
    modifiedDate: Date,
    currencyCode: String,
    merchant: String
});

module.exports = mongoose.model('Transaction', TransactionSchema);

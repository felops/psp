var express = require('express')
var path = require('path')

var transactionsRouter = require('./routes/transactions');
var payablesRouter = require('./routes/payables');

var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/transactions', transactionsRouter);
app.use('/payables', payablesRouter);

module.exports = app;

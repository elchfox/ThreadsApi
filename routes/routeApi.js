var express = require('express');
var app = express();

var thread = require('./threadApi')

app.use('/thread', thread);


module.exports = app;
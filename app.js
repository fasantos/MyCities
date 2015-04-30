'use strict';

var express = require('express');
var app = express();

app.use(express.static('public'));

app.get('/', function(req, res) {
	res.send('Hello World');
});

module.exports = app;

app.get('/cities', function(request, response) {
	var cities = ['Lisboa', 'Barcelona', 'Madrid'];
	response.json(cities);
});






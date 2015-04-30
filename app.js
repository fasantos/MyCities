'use strict';

var express = require('express');
var app = express();

var bodyParser = require('body-parser');
var urlencode = bodyParser.urlencoded({extended: false});

app.use(express.static('public'));

app.get('/', function(req, res) {
	res.send('Hello World');
});

module.exports = app;

var cities = {
	'Lisboa': 'some desc', 
	'Barcelona': 'des', 
	'Madrid': 'descr'
};

app.get('/cities', function(request, response) {
	response.json(Object.keys(cities));
});

app.post('/cities', urlencode, function(request, response) {
	var newCity = request.body;
	cities[newCity.name] = newCity.description; 
	response.status(201).json(newCity.name);
});






var request = require('supertest');
var app = require('./app');

var redis = require('redis');
var client = redis.createClient();
client.select('test'.length);
client.flushdb();

describe('Request to the root path', function () {

	it('Returns a 200 status code', function(done) {
	request(app)
		.get('/')
		.expect(200, done);
	});

	it('Returns a HTML format', function(done) {
		request(app)
			.get('/')
			.expect('Content-Type', /html/, done);
	})

	it('Returns an index file with Cities', function(done) {
		request(app)
			.get('/')
			.expect(/cities/i, done);
	})

});

describe('Listing cities on /cities', function () {

	it('Returns 200 status code',function (done) {
		request(app)
			.get('/cities')
			.expect(200, done)		
	})

	it('Returns JSON format', function (done) {
		request(app)
			.get('/cities')
			.expect('Content-Type', /json/, done);
	});

	it('Returns initial cities', function (done) {
		request(app)
			.get('/cities')
			.expect(JSON.stringify([]), done);
	});
});

describe('Creating new Cities', function () {

	

	it('Returns a 201 status code',function (done) {
		request(app)
			.post('/cities')
			.send('name=Gzira&description=where+I+live')
			.expect(201, done);
	});

	it('Return the city name', function(done) {
		request(app)
			.post('/cities')
			.send('name=Gzira&description=where+I+live')
			.expect(/Gzira/i, done);
	});

	it('Validates city name and description', function(done) {
		request(app)
			.post('/cities')
			.send('name=&description')
			.expect(400, done);
	});
});

describe('Deleting cities', function () {

	before(function() {
		client.hset('cities', 'Valleta', 'is the capital of Malta');
	});

	after(function() {
		client.flushdb();
	});

	it('Return a 204 status code',function (done) {
		request(app)
			.delete('/cities/Valleta')
			.expect(204, done);	
	});
});

describe('Show city info', function (done) {

	before(function() {
		client.hset('cities', 'Valleta', 'is the capital of Malta');
	});

	after(function() {
		client.flushdb();
	});

	it('Returns 200 status code',function (done) {
		request(app)
			.get('/cities/Valleta')
			.expect(200, done);
	});

	it('Returns HTML format', function(done) {
		request(app)
			.get('/cities/Valleta')
			.expect('Content-Type', /html/, done);
	});

	it('Returns information for given city', function(done) {
		request(app)
			.get('/cities/Valleta')
			.expect(/\n/, done);
	});
});
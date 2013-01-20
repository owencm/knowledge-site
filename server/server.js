var express = require('express');
var app = express();

function start(route) {
	// app.get('/', function(req, res){
	// 	var body = 'Hello World';
	// 	res.setHeader('Content-Type', 'text/plain');
	// 	res.setHeader('Content-Length', body.length);
	// 	res.end(body);
	// });

	app.get('/questions', function(req, res){
		res.send('[{"question":"How old is Owen Campbell-Moore", "answer":"21"}]');
	});

	var directory = '/Users/owencm/Documents/knowledge/' // TODO: factorise me into a config area
	app.use(express.static(directory + '/client'));

	app.listen(8888);

	console.log("Server has started");
}

exports.start = start;
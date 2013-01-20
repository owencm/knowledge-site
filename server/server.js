var express = require('express');
var app = express();

function start(route) {
	app.get('/', function(req, res){
		var body = 'Hello World';
		res.setHeader('Content-Type', 'text/plain');
		res.setHeader('Content-Length', body.length);
		res.end(body);
	}).listen(8888);

	console.log("Server has started");
}

exports.start = start;
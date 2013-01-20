var express = require('express');
var db = require('./db')
var Sequelize = require('sequelize')
var app = express();

function start() {
	// app.get('/', function(req, res){
	// 	var body = 'Hello World';
	// 	res.setHeader('Content-Type', 'text/plain');
	// 	res.setHeader('Content-Length', body.length);
	// 	res.end(body);
	// });

	var User = db().define('User', {
	  username: {
	    type: Sequelize.STRING
	  },
	  email: {
	    type: Sequelize.STRING
	  },
	  password: {
	    type: Sequelize.STRING
	  }
	});

	console.log(User);

	app.get('/questions', function(req, res){
		res.send('[{"question":"How old is Owen Campbell-Moore", "answer":"21"}]');
	});

	var directory = '/Users/owencm/Documents/knowledge-site/' // TODO: factorise me into a config area
	app.use(express.static(directory + '/client'));

	app.listen(8888);

	console.log("Server has started");
}

exports.start = start;
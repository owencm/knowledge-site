var express = require('express');
var db = require('./db');
var Sequelize = require('sequelize');
var async = require('async');
var app = express();

function start() {

	var User = db().define('User', {
		username: {
			type: Sequelize.STRING
		}
	});

	var Question = db().define('Question', {
		question: {
			type: Sequelize.STRING
		},
		answer: {
			type: Sequelize.STRING
		}
	});

	User.sync();
	Question.sync();

	Question
		.build({
			question: "What database are you using?",
			answer: "MySql"
		})
		.save();

	User.build({
		username: "owencm"
	}).save()

	app.get('/questions', function(req, res){
		Question.findAll().success(function(questions) {
			async.map(
				questions, 
				function(question, next) { next(null, question.values); }, 
				function(e, questions) { res.send(questions); } //Success
				);
		});
	});

	var directory = '/Users/owencm/Documents/knowledge-site/' // TODO: factorise me into a config area
	app.use(express.static(directory + '/client'));

	app.listen(8888);

	console.log("Server has started");
}

exports.start = start;
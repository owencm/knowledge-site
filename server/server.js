var express = require('express');
var async = require('async');
var models = require('./models');
var app = express();

function start() {

	models.User.sync(),
	models.Question.sync()

	app.use(express.bodyParser());

	app.post('/questions', function(req, res){
		var questionText = req.param('question'); 
		var answerText = req.param('answer');
		models.Question
			.build({question: questionText, answer: answerText})
			.save()
			.success(function(question) {
				console.log(question.values);
				res.send(question.values);
			});
	});

	app.delete('/questions/:id?', function(req, res) {
		var id = req.params.id;
		// Todo: sanitize
		models.Question
				.find(id)
				.success(function(question) {
					question.destroy()
					res.send(question)
				});
	});

	app.get('/questions', function(req, res){
		models.Question.findAll().success(function(questions) {
			async.map(
				questions, 
				function(question, next) { next(null, question.values); }, 
				function(e, questions) { res.send(questions); } //Success
				);
		});
	});

	var directory = '/Users/owencm/Documents/knowledge-site/' // TODO: factorise me into a config area
	app.use(express.static(directory + '/client'));

	app.listen(8080);

	console.log("Server has started");
}

exports.start = start;
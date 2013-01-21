var db = require('./db');
var Sequelize = require('sequelize');

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

exports.User = User
exports.Question = Question
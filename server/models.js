var db = require('./db');
var Sequelize = require('sequelize');

var User = db().define('User', {
	username: {
		type: Sequelize.STRING
	}
});

var Question = db().define('Question', 
	{
		question: {
			type: Sequelize.STRING
		},
		answer: {
			type: Sequelize.STRING
		}
	},
	{
		instanceMethods: {
			doSomething: function() { 
				return "hi";
			}
		}
	});

User.hasMany(Question);
Question.belongsTo(User);

User.sync().success(function() {
	Question.sync();
});


exports.User = User;
exports.Question = Question;
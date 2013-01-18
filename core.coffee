jQuery ->
	class Question extends Backbone.Model
		defaults:
			question: 'Question'
			answer: 'Answer'

	class QuestionList extends Backbone.Collection
		model: Question

	class ListView extends Backbone.View
		el: $ 'body'

		initialize: ->
			_.bindAll @
			@collection = new QuestionList
			@collection.bind 'add', @appendQuestion
			@render()

		render: ->
			$(@el).append '<input type="text" id="question"></input><input type="text" id="answer"></input>'
			$(@el).append '<button>Add question</button>'
			$(@el).append '<ul></ul>'

		addQuestion: ->
			question = new Question
			question.set 
				question: $('#question').val()
				answer: $('#answer').val()
			@collection.add question

		appendQuestion: (question) ->
			$('ul').append "<li>#{question.get 'question'}? #{question.get 'answer'}"

		events: 'click button': 'addQuestion'

	list_view = new ListView
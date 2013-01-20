@app = window.app ? {}

jQuery ->
    class Question extends Backbone.Model
        defaults:
            question: 'Question'
            answer: 'Answer'

    class Questions extends Backbone.Collection
        model: Question
        url: 'api/questions'

        initialize: ->
            @bind 'all', (eventType) -> console.log "#{eventType} event occurred! The collection is now:"; console.log @

    class ListView extends Backbone.View
        el: $ 'body'

        initialize: ->
            _.bindAll @
            app.questions.bind 'add', @appendQuestion
            app.questions.bind 'reset', @resetQuestions
            @render()

        render: ->
            $(@el).append '<input type="text" id="question"></input><input type="text" id="answer"></input>'
            $(@el).append '<button>Add question</button>'
            $(@el).append '<ul></ul>'

        addQuestion: ->
            app.questions.create 
                question: $('#question').val()
                answer: $('#answer').val()

        appendQuestion: (question) ->
            $('ul').append "<li>#{question.get 'question'}? #{question.get 'answer'}"

        resetQuestions: ->
            $('ul').innerHTML = ""
            @appendQuestion question for question in app.questions.models

        events: 'click button': 'addQuestion'

    app.questions = new Questions
    app.questions.fetch()
    app.list_view = new ListView
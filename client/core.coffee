@app = window.app ? {}

jQuery ->
    class Question extends Backbone.Model
        defaults:
            question: 'Question'
            answer: 'Answer'

        initialize: ->
            @bind 'remove', -> @destroy({
                                          success: (model, response) ->
                                            console.log "Success removing"
                                          error: (model, response) ->
                                            console.log "Error removing"
                                        })

    class Questions extends Backbone.Collection
        model: Question
        url: 'questions'

        initialize: ->
            @bind 'all', (eventType) -> console.log "#{eventType} event occurred! The collection is now:"; console.log @

    class ListView extends Backbone.View
        el: $ 'body'

        initialize: ->
            _.bindAll @
            app.questions.bind 'add', @appendQuestion
            app.questions.bind 'remove', @removeQuestion
            app.questions.bind 'reset', @resetQuestions
            @render()

        render: ->
            $(@el).append '<input type="text" id="question"></input><input type="text" id="answer"></input>'
            $(@el).append '<button>Add question</button>'
            $(@el).append '<ul></ul>'

        addQuestion: ->
            app.questions.create { question: $('#question').val(), answer: $('#answer').val() }, {wait: true}


        removeQuestion: (question) ->
            $('#question-'+question.get('id')).remove()

        removeClickedQuestionFromModel: (e) ->
            e.preventDefault()
            @removeQuestionFromModel app.questions.get(e.toElement.id)

        removeQuestionFromModel: (question) ->
            app.questions.remove(question)

        appendQuestion: (question) ->
            $('ul').append "<li id='question-#{question.get 'id'}'>#{question.get 'question'}? #{question.get 'answer'} <a href='#' class='remove' id='#{question.get 'id'}'>Remove</a></li>"

        resetQuestions: ->
            $('ul').innerHTML = ""
            @appendQuestion question for question in app.questions.models

        events: 
            'click button': 'addQuestion'
            'click .remove': 'removeClickedQuestionFromModel'

    app.questions = new Questions
    app.questions.fetch()
    app.list_view = new ListView
jQuery ->
    class Question extends Backbone.Model
        defaults:
            question: 'Question'
            answer: 'Answer'

    class QuestionList extends Backbone.Collection
        model: Question

        initialize: ->
            @bind 'all', (eventType) -> console.log "#{eventType} event occurred! The collection is now:"; console.log @

    class ListView extends Backbone.View
        el: $ 'body'

        initialize: ->
            _.bindAll @
            question_list.bind 'add', @appendQuestion
            @render()

        render: ->
            $(@el).append '<input type="text" id="question"></input><input type="text" id="answer"></input>'
            $(@el).append '<button>Add question</button>'
            $(@el).append '<ul></ul>'

        addQuestion: ->
            question_list.create 
                question: $('#question').val()
                answer: $('#answer').val()

        appendQuestion: (question) ->
            $('ul').append "<li>#{question.get 'question'}? #{question.get 'answer'}"

        events: 'click button': 'addQuestion'

    Backbone.sync = (method, model) -> console.log method + ": " + JSON.stringify(model)

    question_list = new QuestionList
    question_list.fetch()
    list_view = new ListView
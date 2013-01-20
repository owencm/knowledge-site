var config = require('./config')
var DBFactory = require('./DBFactory')

module.exports = (new DBFactory(config)).make //Make can be passed an argument instructing a different db to be used
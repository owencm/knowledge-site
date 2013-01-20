var Sequelize = require('sequelize')

function DBFactory(config) {
  var databases = config.databases
  var defaultDB = config.defaultDB

  var instances = {}

  this.make = function (key) {
    key = key ? key : defaultDB

    if(instances[key])
      return instances[key]

    if(! databases[key])
      return null

    var dbParams = databases[key]

    var instance = new Sequelize(
      dbParams.database,
      dbParams.username,
      dbParams.password,
      dbParams.settings
    )

    instances[key] = instance
    return instance;
  }
}

module.exports = exports = DBFactory
util    = require 'util'
Promise = require 'bluebird'

CustomError = (@message, @statusCode) ->
  Error.captureStackTrace this, @constructor
  @name = @constructor.name

util.inherits CustomError, Error

module.exports =
  newCustomError: (msg, statusCode)->
    Promise.reject new CustomError( msg, statusCode )

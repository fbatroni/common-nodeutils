util  = require 'util'
_     = require 'lodash'
fs    = require 'fs'
path  = require 'path'


wrapErrors = (items)->
  items.map (item)->
    if (item instanceof Error) && item.stack?
      util.inspect( item, { showHidden: true, depth: null } ) + "\n" + item.stack
    else
      if _.isString item
        item
      else
        util.inspect( item, { showHidden: true, depth: null } )

format = (loggingEvent)->
  data = if _.isArray(loggingEvent.data)
    loggingEvent.data
  else
    Array.prototype.slice.call(loggingEvent.data)

  util.format.apply util, wrapErrors( data )

colorTokens =
  w: -> "\x1b[37;1m"
  b: -> "\x1b[34m"
  g: -> "\x1b[32m"
  z: -> "\x1b[0m"
  M: format

plainTokens =
  w: -> ""
  b: -> ""
  g: -> ""
  z: -> "\x1b[0m"
  M: format

if process.env.NODE_ENV == 'test'
  tokens = plainTokens
  colorStart = ""
  colorEnd = ""
else
  tokens = colorTokens
  colorStart = "%["
  colorEnd = "%]"


module.exports = (options) ->
  appenders: [
    {
      type: "console"
      layout:
        type: "pattern"
        pattern: "%x{z}[%x{z}%x{b}%d%x{z}] %p %x{w}%c%x{z} #{colorStart}%x{M}#{colorEnd}"
        tokens: tokens
    }
    {
      type: "file"
      maxLogSize: 1024
      backups: 3
      filename: options?.filename if options.filename
      layout:
        type: "pattern"
        pattern: "[%d] %p %c %x{M}"
        tokens:
          M: format
    }
  ]
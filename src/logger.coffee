util  = require 'util'   
_     = require 'lodash'
uuid  = require 'node-uuid'
path  = require 'path'   
fs    = require 'fs' 


formatMessage = (args) ->
  _(args).map((a) -> 
    a = JSON.stringify a unless _.isString(a)
    a
  )

log =
  error: (args...) ->       
      id = args[0]?.contextId || uuid.v4()
      err = 
        msg: "[ERROR] #{id} \n #{formatMessage args}"
        uuid: id
      util.log err.msg 
      console.error args[0]?.stack if args[0]?.stack
      err

  info: (args...) -> util.log "[INFO] #{formatMessage args}"
  warn: (args...) -> util.log "[WARN] #{formatMessage args}"
  test: (args...) ->
    if process.env.DEBUG
      util.log "[TEST] #{formatMessage args}"
  debug: (args...) ->
    if process.env.DEBUG
      util.log "[DEBUG] #{formatMessage args}"
  event: (args...) ->
    if process.env.DEBUG
      util.log "[EVENT] #{formatMessage args}"
  pp: (msg, obj) ->
    util.log "[DEBUG] #{msg} \n\n #{util.inspect obj, { showHidden: false, depth: null}} \n\n"


module.exports = (category, filename) ->
  if category?
    log4js = require 'log4js'
    if filename?
      logDir = path.dirname(filename)
      if !fs.existsSync(logDir)
        fs.mkdirSync(logDir)
      options = {filename: filename} 
    else
      options = {filename: "#{category}.log"}
    log4js.configure( require( './config/log4js' )(options) )
    logger = log4js.getLogger( category )
    
    ## Log4js Log Levels
    # OFF nothing is logged
    # FATAL fatal errors are logged
    # ERROR errors are logged
    # WARN  warnings are logged
    # INFO  infos are logged
    # DEBUG debug infos are logged
    # TRACE traces are logged
    # ALL everything is logged
    # The levels are cumulative.
    ## If you for example set the logging level to WARN all warnings, errors and fatals are logged: 

    logger.setLevel (process.env.LOG_LEVEL or 'INFO')
    return logger
  else 
    return log 
    

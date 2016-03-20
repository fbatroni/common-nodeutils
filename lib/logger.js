(function() {
  var _, formatMessage, fs, log, path, util, uuid,
    slice = [].slice;

  util = require('util');

  _ = require('lodash');

  uuid = require('node-uuid');

  path = require('path');

  fs = require('fs');

  formatMessage = function(args) {
    return _(args).map(function(a) {
      if (!_.isString(a)) {
        a = JSON.stringify(a);
      }
      return a;
    });
  };

  log = {
    error: function() {
      var args, err, id, ref, ref1, ref2;
      args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
      id = ((ref = args[0]) != null ? ref.contextId : void 0) || uuid.v4();
      err = {
        msg: "[ERROR] " + id + " " + (formatMessage(args)),
        uuid: id
      };
      util.log(err.msg);
      if ((ref1 = args[0]) != null ? ref1.stack : void 0) {
        console.error((ref2 = args[0]) != null ? ref2.stack : void 0);
      }
      return err;
    },
    info: function() {
      var args;
      args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
      return util.log("[INFO] " + (formatMessage(args)));
    },
    warn: function() {
      var args;
      args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
      return util.log("[WARN] " + (formatMessage(args)));
    },
    test: function() {
      var args;
      args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
      if (process.env.DEBUG) {
        return util.log("[TEST] " + (formatMessage(args)));
      }
    },
    debug: function() {
      var args, forceDebug;
      forceDebug = arguments[0], args = 2 <= arguments.length ? slice.call(arguments, 1) : [];
      if (forceDebug) {
        process.env.DEBUG = true;
        util.log("[DEBUG] " + (formatMessage(args)));
        return delete process.env.DEBUG;
      } else {
        return util.log("[DEBUG] " + (formatMessage(args)));
      }
    },
    event: function() {
      var args;
      args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
      if (process.env.DEBUG) {
        return util.log("[EVENT] " + (formatMessage(args)));
      }
    },
    pp: function(msg, obj) {
      return util.log("[DEBUG] " + msg + " \n\n " + (util.inspect(obj, {
        showHidden: false,
        depth: null
      })) + " \n\n");
    }
  };

  module.exports = function(category, filename) {
    var log4js, logDir, logger, options;
    if (category != null) {
      log4js = require('log4js');
      if (filename != null) {
        logDir = path.dirname(filename);
        if (!fs.existsSync(logDir)) {
          fs.mkdirSync(logDir);
        }
        options = {
          filename: filename
        };
      } else {
        options = {
          filename: category + ".log"
        };
      }
      log4js.configure(require('./config/log4js')(options));
      logger = log4js.getLogger(category);
      logger.setLevel(process.env.LOG_LEVEL || 'INFO');
      return logger;
    } else {
      return log;
    }
  };

}).call(this);

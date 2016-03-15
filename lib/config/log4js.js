(function() {
  var _, colorEnd, colorStart, colorTokens, format, fs, path, plainTokens, tokens, util, wrapErrors;

  util = require('util');

  _ = require('lodash');

  fs = require('fs');

  path = require('path');

  wrapErrors = function(items) {
    return items.map(function(item) {
      if ((item instanceof Error) && (item.stack != null)) {
        return util.inspect(item, {
          showHidden: true,
          depth: null
        }) + "\n" + item.stack;
      } else {
        if (_.isString(item)) {
          return item;
        } else {
          return util.inspect(item, {
            showHidden: true,
            depth: null
          });
        }
      }
    });
  };

  format = function(loggingEvent) {
    var data;
    data = _.isArray(loggingEvent.data) ? loggingEvent.data : Array.prototype.slice.call(loggingEvent.data);
    return util.format.apply(util, wrapErrors(data));
  };

  colorTokens = {
    w: function() {
      return "\x1b[37;1m";
    },
    b: function() {
      return "\x1b[34m";
    },
    g: function() {
      return "\x1b[32m";
    },
    z: function() {
      return "\x1b[0m";
    },
    M: format
  };

  plainTokens = {
    w: function() {
      return "";
    },
    b: function() {
      return "";
    },
    g: function() {
      return "";
    },
    z: function() {
      return "\x1b[0m";
    },
    M: format
  };

  if (process.env.NODE_ENV === 'test') {
    tokens = plainTokens;
    colorStart = "";
    colorEnd = "";
  } else {
    tokens = colorTokens;
    colorStart = "%[";
    colorEnd = "%]";
  }

  module.exports = function(options) {
    return {
      appenders: [
        {
          type: "console",
          layout: {
            type: "pattern",
            pattern: "%x{z}[%x{z}%x{b}%d%x{z}] %p %x{w}%c%x{z} " + colorStart + "%x{M}" + colorEnd,
            tokens: tokens
          }
        }, {
          type: "file",
          maxLogSize: 1024,
          backups: 3,
          filename: options.filename ? options != null ? options.filename : void 0 : void 0,
          layout: {
            type: "pattern",
            pattern: "[%d] %p %c %x{M}",
            tokens: {
              M: format
            }
          }
        }
      ]
    };
  };

}).call(this);

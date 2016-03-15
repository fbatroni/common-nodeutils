'use strict';

var expect = require('chai').expect;
var commonNodeutils = require('../lib');
var path = require('path');
var fs = require('fs');
var logtrap = require('logtrap');
var util = require('util');

describe('common-nodeutils', function () {
  describe('logger', function(){
    var logger;
    var filename = 'logs/tests.log';
    var currentLogMsg = null;

    var message = function(msgType){
      var message = util.format('this is a test %s message', msgType);
      return message;
    }

    var logMessage = function(msgType){
      var str = message(msgType);
      var msg = logtrap.stdoutTrap(function() {
       return logger[msgType](str);
      });
      currentLogMsg = {
        msgType: msgType,
        message: str
      }
      return msg;
    }

    beforeEach(function() {  
      logger = commonNodeutils.logger('test', filename);
    });

    it('Creates a log file', function () {
      expect(fs.existsSync(filename)).to.be.ok;
    })

    it('should log a fatal message ', function () {
      var msg = logMessage('fatal');
      expect(msg).to.contain(currentLogMsg.message);
    });

    it('should log an error message', function () {
      var msg = logMessage('error');
      expect(msg).to.contain(currentLogMsg.message);
    });
    it('should log a warning message', function () {
      var msg = logMessage('warn');
      expect(msg).to.contain(currentLogMsg.message);
    });

    it('should log an info message', function () {
      var msg = logMessage('info');
      expect(msg).to.contain(currentLogMsg.message);
    });

    it('should log a debug message', function () {
      // Need to set the log level appropriately
      logger.setLevel ('DEBUG');
      var msg = logMessage('debug');
      expect(msg).to.contain(currentLogMsg.message);
    });
    
  })
});

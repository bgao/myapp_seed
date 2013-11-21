/**
 * Module dependencies.
 */

var express = require('express')
// , routes = require('./app/routes')
// , user = require('./app/routes/user')
, http = require('http')
//, path = require('path')
, passport = require('passport')
, fs = require('fs');


//Load configurations
//if test env, load example file
var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development'
, config = require('./config/config')
, auth = require('./config/middlewares/authorization')
, mongoose = require('mongoose');

//Bootstrap db connection
var db = mongoose.connect(config.db);

//Bootstrap models
var models_path = __dirname + '/app/models';
var walk = function(path) {
  fs.readdirSync(path).forEach(function(file) {
    var newPath = path + '/' + file;
    var stat = fs.statSync(newPath);
    if (stat.isFile()) {
      if (/(.*)\.(js|coffee)/.test(file)) {
        require(newPath);
      }
    } else if (stat.isDirectory()) {
      walk(newPath);
    }
  });
};
walk(models_path);

//bootstrap passport config
require('./config/passport')(passport);

var app = express();

//express settings
require('./config/express')(app, passport);

//Bootstrap routes
require('./config/routes')(app, passport, auth);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

//expose app
exports = module.exports = app;
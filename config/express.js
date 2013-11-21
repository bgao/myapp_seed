/**
 * Module dependencies.
 */
var express = require('express')
, mongoStore = require('connect-mongo')(express)
, config = require('./config')
, path = require('path')
, flash = require('connect-flash');

module.exports = function(app, passport) {
  // all environments
  app.set('port', config.port);
  app.set('views', path.join(__dirname, '../app/views'));
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));  // TODO: this needs to be changed
  app.use(express.json());
  app.use(express.urlencoded());
  app.use(express.static(path.join(__dirname, '../public')));

  //cookieParser should be above session
  app.use(express.cookieParser());
  
  //bodyParser should be above methodOverride
  app.use(express.json());
  app.use(express.urlencoded());
  app.use(express.methodOverride());
  
  //express/mongo session storage
  app.use(express.session({
    secret: 'MYAPP',
    store: new mongoStore({
      url: config.db,
      collection: 'sessions'
    })
  }));
  
  //connect flash for flash messages
  app.use(flash());
  
  //use passport session
  app.use(passport.initialize());
  app.use(passport.session());

  //routes should be at the last
  app.use(app.router);

  // development only
  if ('development' == app.get('env')) {
    app.use(express.errorHandler());
  }
};

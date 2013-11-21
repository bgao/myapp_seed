'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('myApp.services', []).
  value('version', '0.1').
  factory('Global', [function() {
    var _this = this;
    _this._data = {
      user: window.user,
      authenticated: !!window.user
    };
    return _this._data;
  }]);

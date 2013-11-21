'use strict';

/* Controllers */

angular.module('myApp.controllers', [])
  .controller('MyCtrl1', [function() {

  }])
  .controller('MyCtrl2', [function() {

  }])
  .controller('HeaderController', ['$scope', 'Global', function ($scope, Global) {
    $scope.global = Global;
    $scope.menu = [];
  }]);
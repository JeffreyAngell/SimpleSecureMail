var app = angular.module("app", [
  'ngRoute',
  'ssmailServices',
  'ssmailControllers']);

app.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/', {
        templateUrl: 'about.html',
        controller: 'EncryptControl'
      }).
      when('/tutorial', {
        templateUrl: 'tutorial.html',
        controller: 'EncryptControl'
      }).
      when('/encrypt', {
        templateUrl: 'encrypt.html',
        controller: 'EncryptControl'
      }).
      when('/decrypt', {
        templateUrl: 'decrypt.html'
        //controller: 'DecryptCtrl'
      }).
      otherwise({
        redirectTo: '/'
      });
  }]);

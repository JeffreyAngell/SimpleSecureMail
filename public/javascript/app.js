var app = angular.module("app", [
  'ngRoute',
  'ssmailServices',
  'ssmailControllers']);

app.config(['$routeProvider', '$locationProvider',
  function($routeProvider, $locationProvider) {
  	$locationProvider.html5Mode({enabled: true, requireBase: false});
  	
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
        templateUrl: 'decrypt.html',
        controller: 'DecryptControl'
      }).
      otherwise({
        redirectTo: '/'
      });
  }]);
  
app.run(function($rootScope, $location, $http){
	$rootScope.$on('$locationChangeStart', function(a, b){
		var list = $location.path().split("&");
		for(var i = 0; i < list.length; i++){
			var params = list[i].split("=");
			if(params[0] == "access_token"){
				$http.defaults.headers.common.Authorization = "Bearer " + params[1];
				a.preventDefault();
				$location.path("/decrypt");
			}
		}
	});
});

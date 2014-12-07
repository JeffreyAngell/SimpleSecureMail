'use strict';

/* Services */

var ssmailServices = angular.module('ssmailServices', ['ngResource']);

ssmailServices.factory('Key', ['$resource',
  function($resource){
    return $resource('api/:type/:email', {}, {
    });
  }]);

ssmailServices.factory('PrivKey', ['$resource',
	function($resource){
		return $resource('api/:type',{},{});
	}]);



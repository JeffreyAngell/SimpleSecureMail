'use strict';

/* Services */

var ssmailServices = angular.module('ssmailServices', ['ngResource']);

ssmailServices.factory('Key', ['$resource',
  function($resource){
    return $resource('api/:type/:email', {}, {
      getPublic: {method:'GET', params:{type:'public', email:emailAddress}},
      getPrivate:{method:'GET', params:{type:'private', email:emailAddress}}
    });
  }]);



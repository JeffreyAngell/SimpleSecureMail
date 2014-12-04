'use strict';

/* Controllers */

var ssmailControllers = angular.module('ssmailControllers', []);

ssmailControllers.controller('EncryptControl', ['$scope', 'Key',
  function($scope, Key) {
    $scope.checkEmail = function() {    
      if(!$scope.emailForm.$valid){
        alert('Please enter a valid email address');
      } else {
        $scope.pubKeyJson = Key.get({ type : 'public', email : $scope.emailAddress }, function() {
          console.log($scope.pubKeyJson);  
        });
        
        
      }
    }
  }]);

/*phonecatControllers.controller('PhoneDetailCtrl', ['$scope', '$routeParams', 'Phone',
  function($scope, $routeParams, Phone) {
    $scope.phone = Phone.get({phoneId: $routeParams.phoneId}, function(phone) {
      $scope.mainImageUrl = phone.images[0];
    });

    $scope.setImage = function(imageUrl) {
      $scope.mainImageUrl = imageUrl;
    }
  }]);
*/

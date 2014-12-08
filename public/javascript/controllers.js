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
          $scope.pubKey = $scope.pubKeyJson.key;
        });        
      }
    }
    
    $scope.encryptEmail = function() {
      $scope.encrypt = new JSEncrypt();
      $scope.encrypt.setPublicKey($scope.pubKey);
      $scope.result = $scope.encrypt.encrypt($scope.emailBody);
      if($scope.result) {
        $scope.emailBody = $scope.result;
      } else {
        alert('Error: Please check public key and try again');
      }
    }
  }]);
  
ssmailControllers.controller('DecryptControl', ['$scope', 'PrivKey', '$window', '$http',
  function($scope, PrivKey, $window, $http) {

    if ($http.defaults.headers.common.Authorization){
<<<<<<< HEAD
      $scope.buttonText = "Get Key";
      $scope.isLoggedIn = true;
      $http.get("/api/me").success(function(data){
        $scope.loggedInName = data["email"]
      });
    } else {
      $scope.isLoggedIn = false;
      $scope.buttonText = "Login";
=======
      $scope.buttonText = "Get Key"
    } else {
      $scope.buttonText = "Login"
>>>>>>> 31b4ee08ab9a53de3f55bc342d5a6d1b16610f5b
    }



    $scope.checkEmail = function() {  
      if(false){
        alert('Please enter a valid email address');
      } else {
        $scope.privKeyJson = PrivKey.get({ type : 'private' }, function() {
        	if($scope.privKeyJson.redirect != null){
        		$window.location.href = $scope.privKeyJson.redirect;
        	} else{
				$scope.privKey = $scope.privKeyJson.key;
			}
        });        
      }
    }
    
    $scope.decryptEmail = function() {
      $scope.decrypt = new JSEncrypt();
      $scope.decrypt.setPrivateKey($scope.privKey);
      $scope.result = $scope.decrypt.decrypt($scope.emailBody);
      if ($scope.result) {
        $scope.emailBody = $scope.result; 
      } else {
        alert('Error: Please check the private key and try again');
      }
    }
  }]);

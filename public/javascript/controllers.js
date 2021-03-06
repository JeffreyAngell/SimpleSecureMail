'use strict';

/* Controllers */

var ssmailControllers = angular.module('ssmailControllers', []);

String.prototype.endsWith = function(suffix){
	return this.indexOf(suffix, this.length - suffix.length) !== -1;
}

ssmailControllers.controller('EncryptControl', ['$scope', '$location', 'Key',
  function($scope, $location, Key) {   
    $scope.hostName = $location.protocol() + "://" + $location.host();
    $scope.instructions = '\n\nTo decrypt this email, go to ' + $scope.hostName + '/decrypt, and press log in to authenticate with Google.' +
                           ' Then, press the get key button to retrieve your private key, paste the encrypted part of this email into the box '+
                           'and hit decrypt.'
    $scope.validEmail = true;
    $scope.checkEmail = function() {  
      if(!$scope.emailForm.$valid  || !$scope.emailAddress.endsWith('gmail.com')) {
        $scope.validEmail = false;
      } else {
          $scope.validEmail = true;
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
        $scope.emailBody = $scope.result + $scope.instructions;
      } else {
        alert('Error: Please check public key and try again');
      }
    }

    $scope.clearMessage = function() {
      $scope.emailBody = "";
    }
  }]);
  
ssmailControllers.controller('DecryptControl', ['$scope', 'PrivKey', '$window', '$http', '$location', 
  function($scope, PrivKey, $window, $http, $location) {

    if ($http.defaults.headers.common.Authorization){
      $scope.loggedInName = "...(accessing google auth)"
      $scope.fullLocation = $location.absUrl()
      $scope.buttonText = "Get Key";
      $scope.isLoggedIn = true;
      $http.get("/api/me").success(function(data){
        $scope.loggedInName = data["email"]
      });
    } else {
      $scope.isLoggedIn = false;
      $scope.buttonText = "Login";
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

    $scope.clearMessage = function() {
      $scope.emailBody = "";
    }
    
    $scope.invalidateKeys = function(){
    	$http.delete("/api/keys/invalidate").success(function(){});
    }
  }]);

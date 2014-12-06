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
  
ssmailControllers.controller('DecryptControl', ['$scope', 'Key',
  function($scope, Key) {
    $scope.checkEmail = function() {  
      if(!$scope.emailForm.$valid){
        alert('Please enter a valid email address');
      } else {        
        $scope.privKeyJson = Key.get({ type : 'private', email : $scope.emailAddress }, function() {
          $scope.privKey = $scope.privKeyJson.key//.replace('PRIVATE KEY', 'RSA PRIVATE KEY');
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

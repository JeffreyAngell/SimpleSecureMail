var app = angular.module("app", ['ngRoute']);

app.config(function($routeProvider){
  $routeProvider.when("/",
    {
      templateUrl: "about.html"
    }
  ).when("/tutorial",
    {
      templateUrl: "tutorial.html"
    }
  ).when("/download",
    {
      templateUrl: "download.html"
    }
  );
});

app.controller("AppCtrl", function($scope){
});

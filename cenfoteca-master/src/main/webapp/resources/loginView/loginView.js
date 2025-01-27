'use strict';

angular.module('myApp.loginView', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/login', {
    templateUrl: 'resources/loginView/loginView.html',
    controller: 'LoginViewCtrl'
  });
}])

.controller('LoginViewCtrl', ['$scope','$http',function($scope,$http) {
	
	$scope.checkLogin = function(){
    	$http.post('rest/login/checkuser/',$scope.user).success(function (loginResponse) {
    		if(loginResponse.code == 200){
    			var usuario = {
					"idUser":loginResponse.idUsuario,
					"firstName":loginResponse.firstName,
					"lastName":loginResponse.lastName
				};
    			
    			localStorage.loggedUser = JSON.stringify(usuario);
    			
    			var path = "/cenfoteca/app#/view1";
    			window.location.href = path;
    		}else{
    			alert("invalido");
    		}
    	});
    	
    };
}]);
'use strict';

angular.module('myApp.view3', ['ngRoute', 'ui.grid', 'ui.grid.edit', 'ui.grid.cellNav'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view3', {
    templateUrl: 'resources/view3/view3.html',
    controller: 'View3Ctrl'
  });
}])
//**********************************************************
//
.controller('View3Ctrl', ['$scope','$http', '$rootScope' ,function($scope,$http,$upload) {
	/*
	 var unbind = $rootScope.$on('xD', function(){
         console.log('foo');
     });
	
	
	$scope.currentFocused = "";
	$scope.getCurrentFocus = function(){
		var rowCol = $scope.gridApi.cellNav.getFocusedCell();
		if(rowCol !== null) {
			$scope.currentFocused = 'Row Id:' + rowCol.row.entity.id + ' col:' + rowCol.col.colDef.name;
		}	 		
		
		$scope.gridOptions.onRegisterApi = function(gridApi){
			 $scope.gridApi = gridApi;
		}
	}
	
	
	*/
	
	$scope.digameSuID = function(tipoUsuario){
		alert(tipoUsuario.idTipoUsuario);
	}
	
	$scope.tipoUsuarios = [];
	$scope.requestObject = {"pageNumber": 0,"pageSize": 0,"direction": "","sortBy": [""],"searchColumn": "string","searchTerm": "","user": {}};
	$http.get('rest/protected/tipoUsuario/getAll').success(function(response) {
		$scope.tipoUsuarios = response.tipoUsuarioList;
		console.log(response.tipoUsuarioList);
	});
	
	$scope.saveTypeUser = function(event){
		$scope.onError = false;
		var dataCreate = {
			tipo : $scope.tipoUsuario.tipo
		};
		if($scope.tipoUsuario.tipo !=null){
		$http.post('rest/protected/tipoUsuario/createTypeUser',dataCreate).success(function(response) {
			console.log("response",response)
			$scope.tipoUsuarios = $scope.tipoUsuarios.concat(dataCreate);
		});
		}else{
			alert('Mal')
		}
	};
	
	$scope.loadData = function(ptipoUsuario){
		$scope.userToEdit = ptipoUsuario;
		$scope.tipoUsuario =  {};
		$scope.tipoUsuario.tipo = ptipoUsuario.tipo;

		$('#createButton').addClass('hidden');
		$('#updateButton').removeClass('hidden');
	}
	
	
	
	
	$scope.updateTypeUser = function(ptipoUsuario) {
		$scope.onError = false;
		var dataUpdate = {
			idTipoUsuario : $scope.userToEdit.idTipoUsuario,
			tipo: ptipoUsuario.tipo
		};
			$http.put('rest/protected/tipoUsuario/updateTypeUser',dataUpdate).success(function(response) {
				$scope.userToEdit.tipo = ptipoUsuario.tipo;
				$('#createButton').removeClass('hidden');
				$('#updateButton').addClass('hidden');
				$scope.tipoUsuario.tipo = "";
			});
	};
	
	$scope.deleteTypeUser = function(tipoUsuario) {

		$scope.onError = false;
		var dataDelete = {
			idTipoUsuario : tipoUsuario.idTipoUsuario
		};
		
		$http({method: 'DELETE',url:'rest/protected/tipoUsuario/deleteTypeUser', data:dataDelete, headers: {'Content-Type': 'application/json'}}).success(function(response) {
			$scope.tipoUsuarios.splice($scope.tipoUsuarios.indexOf(tipoUsuario), 1);
		});
	};
}]);


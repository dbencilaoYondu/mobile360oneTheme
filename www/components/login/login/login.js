app.controller('LoginCtrl',function($scope,$state,$rootScope,$ionicScrollDelegate,Pages,$http){
	$scope.login = Pages.data.data.login;

	$scope.login.signin = function(){
		$rootScope.loggedIn = true;
		console.log($rootScope);
		$scope.defaultState();
		localStorage.setItem($rootScope.currentAuthRequest,true);
	}
	$scope.login.signout = function(){
		$rootScope.loggedIn = false;
		console.log($rootScope);
	}
	
	console.log($rootScope);

	console.log(localStorage);
});



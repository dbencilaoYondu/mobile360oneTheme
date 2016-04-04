app.controller('LoginCtrl',function($scope,$state,$rootScope,$ionicScrollDelegate,Pages,$http){
	$scope.login = Pages.data.data.login;

	$scope.login.signin = function(){
		$rootScope.loggedIn = true;

		//$scope.defaultState();
		sessionStorage.setItem($rootScope.currentAuthRequest,true);
		$state.go($rootScope.currentState,true);
		console.log($rootScope);
		console.log(sessionStorage);
	}
	$scope.login.signout = function(){
		$rootScope.loggedIn = false;
		console.log($rootScope);
	}
	
	console.log($rootScope);

	console.log(sessionStorage);
});



app.controller('LoginCtrl',function($scope,$rootScope,$ionicScrollDelegate,Pages,$http){
	$scope.login = Pages.data.data.login;

	$scope.login.signin = function(){
		$rootScope.loggedIn = true;
		console.log($rootScope);
	}
	$scope.login.signout = function(){
		$rootScope.loggedIn = false;
		console.log($rootScope);
	}
});



app.controller('LoginCtrl',function($scope,$state,$rootScope,$ionicScrollDelegate,Pages,$http){
	$scope.login = Pages.data.data.login;

	$scope.login.signin = function(){
		$rootScope.loggedIn = true;

		//GLOBAL LOGIN
		sessionStorage.setItem('globalLogin',true);
		$rootScope.globalLogin = sessionStorage.getItem('globalLogin');
		if($scope.login.isGlobal){
			if($rootScope.globalLogin == 'true'){
				$scope.defaultState();
			}
		}
		else{
			//WIDGET LOCK
			sessionStorage.setItem($rootScope.currentAuthRequest,true);
			$state.go($rootScope.currentState,true);

		}

		console.log($rootScope);
		console.log(sessionStorage);
	}
	$scope.login.signout = function(){
		$rootScope.loggedIn = false;
		console.log($rootScope);
	}
	
	console.log($rootScope);
	console.log($scope);
	console.log(sessionStorage);
});



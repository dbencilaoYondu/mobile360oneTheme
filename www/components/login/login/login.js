app.controller('LoginCtrl',function($scope,$http,$state,$rootScope,$ionicScrollDelegate,Pages,$http){
	$scope.login = Pages.data.data.login;
	$scope.formLogin = {};

	Object.toparams = function ObjecttoParams(obj) 
	  {
	    var p = [];
	    for (var key in obj) 
	    {
	      p.push(key + '=' + encodeURIComponent(obj[key]));
	    }
	    return p.join('&');
	  };


	$scope.login.signin = function(){

		//UNCOMMENT WHEN LOGIN API IS READY: CHANGE URL WITH UPDATED API URL
		/*$scope.stringData = JSON.stringify($scope.formLogin);
		$http({
			method:'POST',
			url:'http://192.168.110.15/esg-cms/mobile360_yondu/builder/services/user/login',
			data:Object.toparams({'data':$scope.stringData}),
			headers: {'Content-Type': 'application/x-www-form-urlencoded'}
		})
		.then(function successCallback(response){
			if(response.status == 'OK'){
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
			}
		});*/

		$rootScope.loggedIn = true;
		$scope.loggedIn = $rootScope.loggedIn;

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
		$state.go('app.login', true);
		console.log($rootScope);
	}
	
	console.log($rootScope);
	console.log($scope);
	console.log(sessionStorage);
});



app.controller('ForgotPasswordCtrl',function($scope,$ionicScrollDelegate,Pages,$http){
	$scope.login = Pages.data.data.login;
	$scope.forgotPassword = Pages.data.data.login.forgotPassword;
	
	console.log($scope);
});



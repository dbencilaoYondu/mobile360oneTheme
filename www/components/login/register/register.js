app.controller('RegisterCtrl',function($scope,$ionicScrollDelegate,Pages,$http){
	$scope.login = Pages.data.data.login;
	$scope.register = Pages.data.data.login.register;
	
	$scope.form = {};
	$scope.comparePass = function(){

		console.log($scope.form.password);
		console.log($scope.form.confirmpassword);
		if($scope.form.password == $scope.form.confirmpassword){
			$scope.form.passwordStatus = true;
		}else{
			$scope.form.passwordStatus = false;
		}
	}
	//remove dafault redio
	$scope.removeDefault = function(){
    	$('.item-radio').removeClass('default');
  	}

  	Object.toparams = function ObjecttoParams(obj) 
  	{
	    var p = [];
	    for (var key in obj) 
	    {
	      p.push(key + '=' + encodeURIComponent(obj[key]));
	    }
	    return p.join('&');
  	};

  	angular.forEach($scope.register.customFields,function(value,key){

  		if(value.type == 'checkbox'){

			angular.forEach(value.checkList,function(value,key){
				if(value.isChecked){
					$scope.form.checkbox = {
						[value.group]:{
							[value.label]:true
						}
					};
				}
				
			});
		}

		if(value.type == 'radio'){
			$scope.form.radio = [];
			/*var radioG = {
				[value.group]:{}
			}*/
			$scope.form.radio.push([value.group]);
			angular.forEach(value.radioList,function(value,key){
				if(value.isChecked){
					$scope.form.radio.push([value.group]);
				}
				
			});
		}

  	});
  	

	//register form
	$scope.register.submitForm = function(){
		//$scope.form.prerequisites = {};


		$scope.form.appId = $scope.register.appId;
	    $scope.stringData = JSON.stringify($scope.form);
	
		$http({
		      method:'POST',
		      url:$scope.register.api,
		      data:Object.toparams({'data':$scope.stringData}),
		      headers: {'Content-Type': 'application/x-www-form-urlencoded'}
		    }).then(function successCallback(response){
		        console.log(response);
		        if(response.statusText == 'OK'){
		          $scope.success = $scope.register.onSuccess;
		        }else{
		          $scope.error = $scope.register.onError;
		        }
		      },function errorCallback(response){
		        console.log(response);
		        $scope.error = $scope.register.onError;
		      });
		     $scope.form = {};
		     $ionicScrollDelegate.scrollTop();
	}

	console.log($scope);
});





app.controller('FormCtrl', function($scope,Pages,$state, $http,$ionicScrollDelegate ) {
  $scope.data = Pages;
  Pages.getSpecs();
  
  $scope.form = {};

  Object.toparams = function ObjecttoParams(obj) 
  {
    var p = [];
    for (var key in obj) 
    {
      p.push(key + '=' + encodeURIComponent(obj[key]));
    }
    return p.join('&');
  };

  $scope.updateRadioResult = function(x,y,z){
    console.log(x);
    console.log(y);
    console.log(z);
    
  }

  $scope.submitForm = function(){
  
    $scope.form.prerequisites = {};
    $scope.form.prerequisites.subject = $scope.currentFormData.subject;
    $scope.form.prerequisites.emailId = $scope.currentFormData.emailId;
    $scope.form.prerequisites.label = $scope.currentFormData.label;
    $scope.form.prerequisites.description = $scope.currentFormData.description;
    $scope.form.prerequisites.formName = $scope.currentFormData.formName;
    $scope.stringData = JSON.stringify($scope.form);

    $http(
    {
      method:'POST',
      url:$scope.currentFormData.api,
      data:Object.toparams({'data':$scope.stringData}),
      headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    })
      .then(function successCallback(response){
        console.log(response);
        if(response.statusText == 'OK'){
          $scope.success = $scope.currentFormData.onSuccess;
        }else{
          $scope.error = $scope.currentFormData.onError;
        }
      },function errorCallback(response){
        console.log(response);
        $scope.error = $scope.currentFormData.onError;
      });
     $scope.form = {};
     $ionicScrollDelegate.scrollTop();
  }

  //data sharing
  $scope.currentData = $state.current.data;
  $scope.parentId =  $state.current.parentId;
    //set data to parent form pages
    $scope.currentFormData = $scope.data.scrum2[$scope.currentData];

   if($scope.parentId){
        $scope.homeData = $scope.data.scrum2[$scope.parentId];
        console.log($scope.homeData.subMenu);
        angular.forEach($scope.homeData.subMenu.menuItems,function(value,key){
           
            if($scope.currentData == $scope.homeData.subMenu.menuItems[key].id){
              //alert($scope.homeData.subMenu.menuItems[key].id);
              $scope.currentFormData = $scope.homeData.subMenu.menuItems[key];
            }
        });
      }
    console.log($scope.$parent.currentParentOfSubInfo);
  //end of data sharing

  console.log('form ctrl');
  console.log($scope);

});
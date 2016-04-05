

app.controller('EditorCtrl', function($scope,$rootScope,$timeout,$stateParams, Pages, $sce,$state) {
 

  $scope.data = Pages;
  $scope.paramsId = $stateParams.paramsId;
  
   console.log('editor');
   console.log($scope);
   $scope.$sce = $sce;

   //data sharing
    $scope.currentData = $state.current.data;
    $scope.parentId =  $state.current.parentId;
  //end of data sharing


  if($scope.parentId){
        $scope.homeData = $scope.data.scrum2[$scope.parentId];
        console.log($scope.homeData.subMenu);
        angular.forEach($scope.homeData.subMenu.menuItems,function(value,key){
           
            if($scope.currentData == $scope.homeData.subMenu.menuItems[key].id){
              //alert($scope.homeData.subMenu.menuItems[key].id);
              $scope.currentEditorData = $scope.homeData.subMenu.menuItems[key];
              $scope.currentEditorDataHtml = $sce.trustAsHtml($scope.currentEditorData.content);
            }
        });
      }else{
        $scope.currentEditorData = $scope.data.scrum2[$scope.currentData];
        $scope.currentEditorDataHtml = $sce.trustAsHtml($scope.data.scrum2[$scope.currentData].content);
      }


//widget lock
  if(Pages.data.data.login.isGlobal == true){
        if($rootScope.loggedIn == false){
           $state.go('app.login', true);
        }
    }
    else{

      $scope.lockname = sessionStorage.getItem($scope.currentEditorData.label);

      if($scope.lockname == true){
       console.log('yey!');
      }
      else{
        if($scope.currentEditorData.isLocked){
          
          $rootScope.currentAuthRequest = $scope.currentEditorData.label;
         // alert(typeof localStorage[$rootScope.currentAuthRequest]);
          if(sessionStorage[$rootScope.currentAuthRequest] == 'true'){
            console.log('yey!');

          }
          else{
            sessionStorage.setItem($rootScope.currentAuthRequest, false);
            console.log('else:');
            console.log(sessionStorage[$rootScope.currentAuthRequest]);
            $state.go('app.login', true);
          }
         
        }
      }
    }

    $rootScope.currentState = $state.current.name;

    console.log($state.current.name);

//end of widget lock


});
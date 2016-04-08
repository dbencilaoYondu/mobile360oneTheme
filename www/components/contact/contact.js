
app.controller('ContactCtrl', function($scope,$rootScope,$timeout,Pages,$state) {
  


  $scope.data = Pages;
  console.log('contact ctrl' );
  console.log($scope);
  //data sharing
    $scope.currentData = $state.current.data;
    $scope.parentId =  $state.current.parentId;
    //set data to parent contact pages
    $scope.currentContactData = $scope.data.scrum2[$scope.currentData];

    //transfer data to sub contact pages
    if($scope.parentId){
        $scope.homeData = $scope.data.scrum2[$scope.parentId];
        console.log($scope.homeData.subMenu);
        angular.forEach($scope.homeData.subMenu.menuItems,function(value,key){
           
            if($scope.currentData == $scope.homeData.subMenu.menuItems[key].id){
              //alert($scope.homeData.subMenu.menuItems[key].id);
              $scope.currentContactData = $scope.homeData.subMenu.menuItems[key];
            }
        });
      }
      
  //end of data sharing

//widget lock
   if(Pages.data.data.login.isGlobal == true){
        if($rootScope.loggedIn == false){
           $state.go('app.login', true);
        }
    }
    else{

      $scope.lockname = sessionStorage.getItem($scope.currentContactData.label);

      if($scope.lockname == true){
       console.log('yey!');
      }
      else{
        if($scope.currentContactData.isLocked){
          
          $rootScope.currentAuthRequest = $scope.currentContactData.label;
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
   /*console.log($scope.$parent.currentParentOfSubInfo);
    console.log($scope);
    console.log($rootScope);
    console.log($scope.lockname);
    console.log(sessionStorage[$scope.currentAboutData.label]);*/
    //console.log($scope.currentAboutData.href);
    /*console.log($location.path());*/

    console.log($state.current.name);
});
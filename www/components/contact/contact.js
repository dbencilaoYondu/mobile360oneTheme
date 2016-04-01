
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


  //$timeout(function() {
    if(Pages.data.data.login.isGlobal == true){
        if($rootScope.loggedIn == false){
           $state.go('app.login', true);
        }
    }
    else{
      if($scope.currentContactData.isLocked){
         $state.go('app.login', true);
         localStorage.setItem($scope.currentContactData.label, false);
      }
    }
  //}, 1000);
  
   $rootScope.lockname = localStorage.getItem($scope.currentContactData.label);
    if($rootScope.lockname == false){
       $state.go('app.login', true);
    }

    console.log($scope.$parent.currentParentOfSubInfo);
    console.log($scope);
    console.log($state);
    console.log($rootScope);
    console.log(localStorage);
    console.log($scope.lockname);
});
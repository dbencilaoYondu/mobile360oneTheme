
app.controller('ContactCtrl', function($scope,Pages,$state) {
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
    console.log($scope.$parent.currentParentOfSubInfo);
});
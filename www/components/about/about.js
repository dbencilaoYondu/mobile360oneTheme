
app.controller('AboutCtrl', function($scope,$location,$rootScope,$timeout,$ionicModal,Pages,$state) {

      
      $scope.data = Pages;
      Pages.getSpecs();

      $ionicModal.fromTemplateUrl('aboutMore.html', {
     /* id: $index, // We need to use and ID to identify the modal that is firing the event!*/
      scope: $scope,
      backdropClickToClose: false,
      animation: 'slide-in-up'
      }).then(function(modal) {
        $scope.modal = modal;
      });


      $scope.openModal = function(index) {
        $scope.modal.show(index);
        $scope.$index = index;
      };

      $scope.closeModal = function(index) {
        $scope.modal.hide();
      };
      console.log('About ctrl: ');
      console.log($scope);
      console.log('Parent');

      //data sharing
        $scope.currentData = $state.current.data;
        $scope.parentId =  $state.current.parentId;
        //set data to parent about pages
        $scope.currentAboutData = $scope.data.scrum2[$scope.currentData];
      //end of data sharing

      if($scope.parentId){
        $scope.homeData = $scope.data.scrum2[$scope.parentId];
        console.log($scope.homeData.subMenu);
        angular.forEach($scope.homeData.subMenu.menuItems,function(value,key){
           
            if($scope.currentData == $scope.homeData.subMenu.menuItems[key].id){
              //alert($scope.homeData.subMenu.menuItems[key].id);
              $scope.currentAboutData = $scope.homeData.subMenu.menuItems[key];
            }
        });
      }

//$timeout(function() {
    if(Pages.data.data.login.isGlobal == true){
        if($rootScope.loggedIn == false){
           $state.go('app.login', true);
        }
    }
    else{

      $scope.lockname = localStorage.getItem($scope.currentAboutData.label);
      
      if(localStorage[$scope.lockname] == true){
       console.log('yey!');
      }else{
        $state.go('app.login', true);
      }
      /*else{
        if($scope.currentAboutData.isLocked){
         $state.go('app.login', true);
         localStorage.setItem($scope.currentAboutData.label, false);
         $rootScope.currentAuthRequest = $scope.currentAboutData.label;
        }
      }*/
    }
//  }, 1000);


    console.log($scope.$parent.currentParentOfSubInfo);
    console.log($scope);
    console.log($rootScope);
    console.log($scope.lockname);
    console.log(localStorage[$scope.lockname]);
    //console.log($scope.currentAboutData.href);
    console.log($location.path());
});
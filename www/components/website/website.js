app.controller('WebsiteCtrl', function($scope,$rootScope,$timeout,Pages,$state,$sce,$http) {

  $scope.data = Pages;
  $scope.startLoading(); //start loading
  $scope.$sce = $sce;
  //data sharing
    $scope.currentData = $state.current.data;
    $scope.parentId =  $state.current.parentId;

    if($scope.data.scrum2[$scope.currentData]){
       //set data to parent contact pages
      $scope.currentWebsiteData    = $scope.data.scrum2[$scope.currentData];
      $scope.currentWebsiteDataURL = $sce.trustAsResourceUrl($scope.currentWebsiteData.url);
       $.getScript($scope.currentWebsiteDataURL,function(data, textStatus, jqxhr){
                 //wehn successful stop loading
                $scope.stopLoading();
            });
    }

    
    if($scope.currentParentOfSubInfo){
       $scope.subWebsiteData    = $scope.currentParentOfSubInfo;
       $scope.subWebsiteDataURL = $sce.trustAsResourceUrl($scope.$parent.currentParentOfSubInfo.url);
       $.getScript($scope.subWebsiteDataURL,function(data, textStatus, jqxhr){
                 //wehn successful stop loading
                $scope.stopLoading();
            });
    }

    if($scope.parentId){
      $scope.homeData = $scope.data.scrum2[$scope.parentId];
      console.log($scope.homeData.subMenu);
      angular.forEach($scope.homeData.subMenu.menuItems,function(value,key){
         
          if($scope.currentData == $scope.homeData.subMenu.menuItems[key].id){  
            $scope.homeData.url = $sce.trustAsResourceUrl($scope.homeData.subMenu.menuItems[key].url);
            $.getScript($scope.homeData.url,function(data, textStatus, jqxhr){
                //wehn successful stop loading
                $scope.stopLoading();
            });
          }
      });
    }

    //transfer data to sub contact pages
    console.log('contact ctrl' );
    console.log($scope.currentParentOfSubInfo);
    console.log($scope);
  //end of data sharing
  
//widget lock
  if(Pages.data.data.login.isGlobal == true){
        if($rootScope.loggedIn == false){
           $state.go('app.login', true);
        }
    }
    else{

      $scope.lockname = sessionStorage.getItem($scope.currentVideoData.label);

      if($scope.lockname == true){
       console.log('yey!');
      }
      else{
        if($scope.currentVideoData.isLocked){
          
          $rootScope.currentAuthRequest = $scope.currentVideoData.label;
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
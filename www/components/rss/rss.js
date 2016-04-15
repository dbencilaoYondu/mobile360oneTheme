app.controller("FeedCtrl", ['$scope','$rootScope','$timeout','FeedService','Pages','$state', function ($scope,$rootScope,$timeout,Feed,Pages,$state) {    

    $scope.data = Pages;
    Pages.getSpecs();  
    console.log($scope);


    $scope.startLoading('feeding...');
    $scope.loadFeed = function(url){
        $scope.startLoading('loading feed...');
        Feed.parseFeed(url)
        .then(function(res){
            console.log(res);
            $scope.feeds = res.data.responseData.feed.entries;
             //$scope.stopLoading();
        })
        .then(function(){
          $timeout(function(){
             $scope.stopLoading();
           },3000);
        });
    }
   
    //$scope.loadFeed($scope.currentRssData.content[0].url); 

    $scope.currentData = $state.current.data;
    $scope.parentId =  $state.current.parentId;
    //set data to parent rss pages
    $scope.currentRssData = $scope.data.scrum2[$scope.currentData];

     //transfer data to sub contact pages
    if($scope.parentId){
        $scope.homeData = $scope.data.scrum2[$scope.parentId];
        console.log($scope.homeData.subMenu);
        angular.forEach($scope.homeData.subMenu.menuItems,function(value,key){
           
            if($scope.currentData == $scope.homeData.subMenu.menuItems[key].id){
              //alert($scope.homeData.subMenu.menuItems[key].id);
              $scope.currentRssData = $scope.homeData.subMenu.menuItems[key];
            }
        });
      }
      
    console.log($scope.$parent.currentParentOfSubInfo);


$scope.loadFeed($scope.currentRssData.content[0].url);

//WIDGET LOCK
  if(Pages.data.data.login.isGlobal == true){
        if($rootScope.loggedIn == false){
           $state.go('app.login', true);
        }
    }
    else{

      $scope.lockname = sessionStorage.getItem($scope.currentRssData.label);

      if($scope.lockname == true){
       console.log('yey!');
      }
      else{
        if($scope.currentRssData.isLocked){
          
          $rootScope.currentAuthRequest = $scope.currentRssData.label;
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

}]);
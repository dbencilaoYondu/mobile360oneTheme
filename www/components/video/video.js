app.controller('VideoCtrl', function($scope,$rootScope,$timeout,$state, $http, Pages){

    //get youtube iframe api
     $.getScript( "https://www.youtube.com/iframe_api", function( data, textStatus, jqxhr ) {
      console.log( data ); // Data returned
      console.log( textStatus ); // Success
      console.log( jqxhr.status ); // 200
      console.log( "Load was performed." );
    });

    $scope.data = Pages;
    $scope.currentData = $state.current.data;
    $scope.parentId =  $state.current.parentId;

    $scope.currentVideoData = $scope.data.scrum2[$scope.currentData];
    
     //transfer data to sub contact pages
    if($scope.parentId){
        $scope.homeData = $scope.data.scrum2[$scope.parentId];
        console.log($scope.homeData.subMenu);
        angular.forEach($scope.homeData.subMenu.menuItems,function(value,key){
           
            if($scope.currentData == $scope.homeData.subMenu.menuItems[key].id){
              //alert($scope.homeData.subMenu.menuItems[key].id);
              $scope.currentVideoData = $scope.homeData.subMenu.menuItems[key];
            }
        });
      }

    console.log('video ctrl');
    console.log($scope);

     $scope.youtubeParams = {
         key: $scope.currentVideoData.youtube.key,
         type: 'video',
         maxResults: $scope.currentVideoData.youtube.resultLimit,
         part: 'id,snippet',
         order: 'date',
         //forUsername: 'aybutchikik',
         channelId: $scope.currentVideoData.youtube.channelId
     }
     
     $http.get('https://www.googleapis.com/youtube/v3/search', {

        params: $scope.youtubeParams

      })

      .success(function(response){

        $scope.videos  = response.items;

        angular.forEach(response.items, function(child){
             console.log (child);
        });
      });
       
      $scope.playerVars = {
       rel: 0,
       showinfo: 0,
       modestbranding: 0,
      }

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
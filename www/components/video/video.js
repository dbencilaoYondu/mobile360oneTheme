app.controller('VideoCtrl', function($scope,$state, $http, Pages){

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
});
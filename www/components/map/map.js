app.controller('MapCtrl', function($scope ,$rootScope,$timeout,$state, Pages,$cordovaGeolocation,$ionicLoading,$ionicPlatform) {

 $ionicPlatform.ready(function() { 

         $scope.currentData = $state.current.data;
         $scope.parentId =  $state.current.parentId;

          $scope.currentMapData = $scope.data.scrum2[$scope.currentData];
         
         //transfer data to sub contact pages
          if($scope.parentId){
              $scope.homeData = $scope.data.scrum2[$scope.parentId];
              console.log($scope.homeData.subMenu);
              angular.forEach($scope.homeData.subMenu.menuItems,function(value,key){
                 
                  if($scope.currentData == $scope.homeData.subMenu.menuItems[key].id){
                    //alert($scope.homeData.subMenu.menuItems[key].id);
                    $scope.currentMapData = $scope.homeData.subMenu.menuItems[key];
                  }
              });
            }

        console.log($scope);
        $ionicLoading.show({
            template: '<ion-spinner icon="bubbles"></ion-spinner><br/>Acquiring location!'
        });
         
        var posOptions = {
            enableHighAccuracy: true,
            timeout: 20000,
            maximumAge: 0
        };
 
        $cordovaGeolocation.getCurrentPosition(posOptions).then(function (position) {
            var lat  = position.coords.latitude;
            var long = position.coords.longitude;
             
            //var myLatlng = new google.maps.LatLng(-33.890542, -33.890542);

            var mapOptions = {
                center: {lat: $scope.currentMapData.mapOptions.center.lat, lng: $scope.currentMapData.mapOptions.center.lng},
                zoom: $scope.currentMapData.mapOptions.zoom,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };          
            
           // var image = 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png';

            var map = new google.maps.Map(document.getElementById($scope.currentMapData.label), mapOptions);          
            angular.forEach($scope.currentMapData.mapOptions.markers,function(value,key){
              console.log(key);
              console.log(value);
              var marker = new google.maps.Marker({
                position: {lat: $scope.currentMapData.mapOptions.markers[key].lat, lng:$scope.currentMapData.mapOptions.markers[key].lng},
                animation: google.maps.Animation.DROP,
                map:map,
                title: $scope.currentMapData.mapOptions.markers[key].title,
                zIndex:$scope.currentMapData.mapOptions.markers[key].zIndex
              });

            });
            
            $scope.map = map;   
            $ionicLoading.hide();  
             
        }, function(err) {
            $ionicLoading.hide();
            console.log(err);
        });
    });           

//widget lock
  if(Pages.data.data.login.isGlobal == true){
        if($rootScope.loggedIn == false){
           $state.go('app.login', true);
        }
    }
    else{

      $scope.lockname = sessionStorage.getItem($scope.currentMapData.label);

      if($scope.lockname == true){
       console.log('yey!');
      }
      else{
        if($scope.currentMapData.isLocked){
          
          $rootScope.currentAuthRequest = $scope.currentMapData.label;
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
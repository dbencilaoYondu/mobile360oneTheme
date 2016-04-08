app.controller('GalleryCtrl', function($scope,$rootScope,$timeout,$stateParams,$state, Pages) {

  $scope.data = Pages;
  $scope.paramsId = $stateParams.paramsId;
  $scope.id = $stateParams.id;
  console.log('Gallery Ctrl:');
  console.log($scope);

  $scope.galleryWrapper = true ;
  //show all photos in an album
  $scope.showAlbum = function($index){
    
      $scope.activeAlbum = $index;
      $scope.galleryWrapper = false;
      $scope.albumWrapper = true;

      if($scope.currentParentOfSubInfo){
        $scope.currentAlbumsObj = $scope.currentParentOfSubInfo.albums[$index];
      }

      if($scope.currentGalleryData){
        $scope.currentAlbumsObj = $scope.data.scrum2[$scope.currentData].albums[$scope.activeAlbum];
      }

      console.log($scope);
  }

  // show single photo
  $scope.showPhoto = function($index){
    
      $scope.activePhoto = $index;
      //$scope.activeAlbum = false;
      $scope.albumWrapper = false;
      $scope.photoWrapper = true;
      
       if($scope.currentParentOfSubInfo){
          $scope.singlePhoto = $scope.currentParentOfSubInfo.albums[$scope.activeAlbum].photos[$scope.activePhoto];
       }
       if($scope.currentGalleryData){
         $scope.singlePhoto = $scope.data.scrum2[$scope.currentData].albums[$scope.activeAlbum].photos[$scope.activePhoto];
      }

    console.log($scope);
  }  

   //back to gallery list
  $scope.backToGallery = function(){
    $scope.galleryWrapper = true;
    $scope.albumWrapper = false;
  }
  //back to albums
  $scope.backToAlbums = function(){
    $scope.galleryWrapper = false;
    $scope.albumWrapper = true;
    $scope.photoWrapper = false;
  }
  

  $scope.currentData = $state.current.data;
  $scope.parentId =  $state.current.parentId;
    //set data to parent rss pages
    $scope.currentGalleryData = $scope.data.scrum2[$scope.currentData];

     if($scope.parentId){
        $scope.homeData = $scope.data.scrum2[$scope.parentId];
        console.log($scope.homeData.subMenu);
        angular.forEach($scope.homeData.subMenu.menuItems,function(value,key){
           
            if($scope.currentData == $scope.homeData.subMenu.menuItems[key].id){
              //alert($scope.homeData.subMenu.menuItems[key].id);
              $scope.currentGalleryData = $scope.homeData.subMenu.menuItems[key];
            }
        });
      }

    console.log('scope with sub info');
    console.log($scope);
    console.log('sub info');
    console.log($scope.currentParentOfSubInfo);

//widget lock
  if(Pages.data.data.login.isGlobal == true){
        if($rootScope.loggedIn == false){
           $state.go('app.login', true);
        }
    }
    else{

      $scope.lockname = sessionStorage.getItem($scope.currentGalleryData.label);

      if($scope.lockname == true){
       console.log('yey!');
      }
      else{
        if($scope.currentGalleryData.isLocked){
          
          $rootScope.currentAuthRequest = $scope.currentGalleryData.label;
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
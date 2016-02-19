var app = angular.module('starter.controllers', [])

/**
 * This variable will store the base configuration which we get using the config service in AppCtrl
 */
app.baseConfig = false;

/**
 * This controllers reads the configuration and adds the states
 */
app.controller('InitCtrl', function ($scope, $state, $timeout, $ionicHistory, config) {
    $scope.startLoading();

    $ionicHistory.nextViewOptions({
        disableAnimate: true,
        disableBack: true,
        historyRoot: true
    });

    var existingStates = [];

    var addStates = function (states) {
        existingStates = getExistingStates();
        for (var idx in states) {
            addState(states[idx]);
        }
    };

    var getExistingStates = function () {
        var states = $state.get();
        var result = [];
        for (var idx in states) {
            result.push(states[idx].name)
        }
        return result;
    };

    var stateExist = function (state) {
        return existingStates.indexOf(state) !== -1;
    };

    var setDefaultState = function (state) {
        // Store defaultState in defaultStateSafe as it gets overwritten while re-initializing
        app.baseConfig.defaultState = app.defaultStateSafe = state.state;
        app.urlRouterProvider.otherwise(state.state);
    };

    var addState = function (state) {
        app.baseConfig.defaultState = app.defaultStateSafe;

        // Only add states that are not there yet
        if (!stateExist(state.state)) {
            if (state.defaultState) {
                setDefaultState(state);
            }
            app.stateProvider.state(state.state, {
                url: state.url,
                views: {
                    'menuContent': {
                        templateUrl: state.templateUrl,
                        controller: state.controller
                        
                    },
                    'sideMenu':{
                       templateUrl:'templates/sideMenu.html',
                       controller:'SettingsCtrl'            
                     }
                },
                data:state.data
            });
        }
    };
    $timeout(function () {

        // Read the configuration
        config.config().then(function (response) {

            // Set the baseConfig
            app.baseConfig = response.data;

            // Add the states
            addStates(app.baseConfig.states);

            // Go to the default state
            $state.go(app.baseConfig.defaultState, {}, {location: true})
        });

    }, 1000);

});

/**
 * The AppCtrl takes care of the parent view for all the other views
 * It is defined in one of the two static states in this application
 */
app.controller('AppCtrl', function ($scope, $state, $ionicHistory, $cordovaInAppBrowser,Pages) {
    

    $scope.stopLoading();

    $ionicHistory.nextViewOptions({
        disableAnimate: true,
        disableBack: true,
        historyRoot: true
    });

    $scope.appName = app.baseConfig.appName;
    $scope.menuItems = app.baseConfig.menuItems;
    

    var options = {
      location: 'yes',
      clearcache: 'yes',
      toolbar: 'no'
     };

     $scope.openBrowser = function(type,index) {
      console.log('clicked open browser ' + type + ' '+ index);
      console.log(type );

      if(type == 'website'){
        $cordovaInAppBrowser.open($scope.menuItems[index].url, '_self', options)
      
        .then(function(event) {
           // success
        })
      
        .catch(function(event) {
           // error
        });
      }
        
     }

     $scope.data = Pages;
     $scope.currentData = $state.current.data;
     Pages.getSpecs();

     $scope.subsSwitch = function(label,index){
        $scope.subsOn = true;

        $('.backdrop.active').removeClass('visible');
        
        if(Pages.data.data.menuItems[index].label == label){

          $scope.currentParentOfSub = Pages.data.data.menuItems[index].subMenu;

          console.log('subSwitch: ');
          console.log($scope.currentParentOfSub);
          console.log($scope);
        }

      }

      $scope.pageInfo = function(index){      
         $scope.currentParentOfSubInfo = $scope.currentParentOfSub.menuItems[index];
         console.log('Pageinfo: ');
         console.log(index);
         $scope.aboutIndex = index;
         console.log($scope.currentParentOfSubInfo);
      }

      $scope.backToParentMenu = function(){
          $scope.subsOn = false;
        }
      $scope.backdropHide = function() {
        $('.backdrop.active').removeClass('visible');
        $('.flyout').removeClass('active');
      }
});

/**
 * The LayoutCtrl is attached to the body
 */
app.controller('LayoutCtrl', function ($scope, $state, $ionicLoading) {
    $scope.init = function () {
        $state.go('init', true);
    };
    $scope.defaultState = function () {
        $state.go(app.baseConfig.defaultState, true);
    };
    $scope.startLoading = function () {
        $ionicLoading.show({
            template: 'Loading...'
        });
    };
    $scope.stopLoading = function () {
        $ionicLoading.hide();
    };
});



app.controller('HeaderCtrl',function($scope,Pages){$scope.data = Pages;});
app.controller('SettingsCtrl',function($scope,$ionicModal,Pages, $ionicHistory){

    $scope.data = Pages;
    Pages.getSpecs();

     $ionicModal.fromTemplateUrl('settings.html', {
      id: '1', // We need to use and ID to identify the modal that is firing the event!
      scope: $scope,
      backdropClickToClose: false,
      animation: 'slide-in-up'
      }).then(function(modal) {
        $scope.oModalSettings = modal;
      });

      $scope.openModal = function(index) {
        $scope.oModalSettings.show();
      };

      $scope.closeModal = function(index) {
        $scope.oModalSettings.hide();
      };

       $scope.myGoBack = function() {
          $ionicHistory.goBack();
        };

        $scope.flyOut = function(){
          $('.flyout').addClass('active');

          if($('.menuList.menu1 > li').length > 6){
             $scope.withHeight = true;
          }else{
             $scope.withHeight = false;
          }

        }
        $scope.flyBack = function(){
          $('.flyout').removeClass('active');
        }

        //Show a backdrop
        $scope.backdrop = function() {
          $('.backdrop.active').toggleClass('visible');
        };
         $scope.backdropActive = function() {
          $('.backdrop.active').addClass('visible');
        };

        //for sorting menu orientation
        $scope.sortIcon = "ion-ios-more-outline";
        $scope.sortMenu = function(){
          if($('.menu1').hasClass('active')){
            $('.menu1').removeClass('active');
             $('.menu2').addClass('active');
             $scope.sortIcon = "ion-grid"
          }else{
           $('.menu2').removeClass('active');
             $('.menu1').addClass('active');
             $scope.sortIcon = "ion-ios-more-outline"
          }
        }
      
/*    console.log('settings: ');
    console.log($scope);*/
});
app.controller('MenuCtrl', function($scope,Pages,menuInfo) {
      $scope.data = Pages;
      console.log('Menu ctrl: ');
      console.log($scope);
});

app.controller('AboutCtrl', function($scope,$ionicModal,Pages,$state) {

      $scope.data = Pages;
      Pages.getSpecs();
      $scope.currentAbout = Pages.data.about;
      console.log($state);
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

      //data sharing
        console.log('About ctrl: ');
        console.log($scope);
        console.log('Parent');

        $scope.currentData = $state.current.data;
        //set data to parent about pages
        $scope.currentAboutData = $scope.data.scrum2[$scope.currentData];

        console.log($scope.$parent.currentParentOfSubInfo);
      //end of data sharing

})
app.controller('ContactCtrl', function($scope,Pages,$state) {
  $scope.data = Pages;
  console.log('contact ctrl' );
  console.log($scope);
  //data sharing
    $scope.currentData = $state.current.data;
    //set data to parent contact pages
    $scope.currentContactData = $scope.data.scrum2[$scope.currentData];

    //transfer data to sub contact pages
    if($scope.$parent.currentParentOfSubInfo){
      $scope.currentContactData = $scope.$parent.currentParentOfSubInfo;
    }
    console.log($scope.$parent.currentParentOfSubInfo);
  //end of data sharing
});
app.controller('FormCtrl', function($scope,Pages, $http,$state,$ionicScrollDelegate) {
  $scope.data = Pages;
  Pages.getSpecs();
  console.log($scope);

  $scope.form = {}

  $scope.submitForm = function(){
    console.log($scope);
    console.log($scope.form);
    $http.post($scope.currentFormData.api,$scope.form)
      .then(function successCallback(response){
        if(response.status == true){
          $scope.success = $scope.currentFormData.onSuccess;
        }
      },function errorCallback(response){
        console.log(response);
        $scope.error = $scope.currentFormData.onError;
      });
    $scope.form = {};
     $ionicScrollDelegate.scrollTop();
  }

  //data sharing
  $scope.currentData = $state.current.data;
    //set data to parent contact pages
    $scope.currentFormData = $scope.data.scrum2[$scope.currentData];

    //transfer data to sub contact pages
    if($scope.$parent.currentParentOfSubInfo){
      $scope.currentFormData = $scope.$parent.currentParentOfSubInfo;
    }
    console.log($scope.$parent.currentParentOfSubInfo);
  //end of data sharing
  console.log('form ctrl');
  console.log($scope);


});
app.controller('GalleryCtrl', function($scope,$stateParams, Pages) {
  $scope.data = Pages;
  $scope.paramsId = $stateParams.paramsId;
  $scope.id = $stateParams.id;
});

app.controller('EditorCtrl', function($scope,$stateParams, Pages, $sce,$state) {
  $scope.data = Pages;
  $scope.paramsId = $stateParams.paramsId;
  
   console.log('editor');
   console.log($scope);
   $scope.$sce = $sce;
   $scope.currentData = $state.current.data;
});
app.controller("FeedCtrl", ['$scope','FeedService','Pages','$state', function ($scope,Feed,Pages,$state) {    
    $scope.data = Pages;
    Pages.getSpecs();  
    console.log($scope);

    $scope.loadFeed=function(url){
        Feed.parseFeed(url).then(function(res){
            console.log(res);
            $scope.feeds = res.data.responseData.feed.entries;
        });
    }

    $scope.currentData = $state.current.data;
    //set data to parent rss pages
    $scope.currentRssData = $scope.data.scrum2[$scope.currentData];

    //transfer data to sub rss pages
    if($scope.$parent.currentParentOfSubInfo){
      $scope.currentRssData = $scope.$parent.currentParentOfSubInfo;
    }
    console.log($scope.$parent.currentParentOfSubInfo);

}]);


app.controller('MapCtrl', function($scope ,$state, Pages,$cordovaGeolocation) {
  var options = {timeout: 10000, enableHighAccuracy: true};
 
  $cordovaGeolocation.getCurrentPosition(options).then(function(position){
 
    var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
 
    var mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
 
    $scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);
 
  }, function(error){
    console.log("Could not get location");
  });


});
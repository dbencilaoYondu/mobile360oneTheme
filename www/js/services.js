var app = angular.module('starter.services', [])
app.factory('Pages',function($http,$compile){
  var obj = {};
  $http.get('../app.json').then(function(result){
        obj.data = result;
            });
  obj.getSpecs = function(item){

    obj.scrum = [];
    obj.scrum2 = {};
     angular.forEach(obj.data.data.menuItems,function(a,b){
        //console.log("key:"+b+" ,"+"value:"+a);
        obj.scrum.push(a);
        obj.scrum2[a.label] = a;
       
    });
  }


  return obj;
});

app.factory('config', function ($q, $http) {
    var config = {
        config: function () {
            return $http.get('../app.json').success(function (data) {
                return data;
            });
        }
    };
    return config;
});


app.factory('FeedService',['$http',function($http){
    return {
        parseFeed : function(url){
            return $http.jsonp('//ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=50&callback=JSON_CALLBACK&q=' + encodeURIComponent(url));
        }
    }
}]);

app.factory('Markers', function($http) {
 
  var markers = [];
 
  return {
    getMarkers: function(){
 
      return $http.get("../app.json").then(function(response){
          markers = response;
          return markers;
      });
 
    }
  }
});

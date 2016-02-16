var app = angular.module('starter.services', [])
app.factory('Pages',function($http){
  var obj = {};
  
  $http.get('../app.json').then(function(result){
        obj.data = result;
            });
  obj.getSpecs = function(item){
     angular.forEach(obj.data.data.menuItems,function(a,b){
        //console.log("key:"+key+" ,"+"value:"+value);
        if(a.type == "about"){
           return obj.about = a;
        }
        if(a.type == "gallery"){
          return obj.gallery = a;
        }
        if(a.type == "map"){
          return obj.map = a;
        }
        if(a.type == "contact"){
          return obj.contact = a;
        }
        if(a.type == "form"){
          return obj.form = a;
        }
         if(a.type == "website"){
          return obj.website = a;
        }
       if(a.type == "rss"){
          return obj.rss = a;
        }
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

angular.module('app').controller('HomeController', [
  '$scope',
  '$http',

  function($scope,$http){

   $http({
    method: 'GET',
    url: '/tweets'
   }).then(function(tweets){
    $scope.sent = tweets.data;
   });

  $scope.map = new Datamap({
    element: document.getElementById('container'),
    scope: 'usa',
      geographyConfig: {
        popOnHover: true,
        highlightOnHover: true,
      },
     done: function(datamap) {
          datamap.svg.selectAll('.datamaps-subunit').on('click', function(geography) {
              // alert(geography.properties.name);
               $http({
                  method: 'GET',
                  url: '/tweets/'+geography.properties.name
                 }).then(function(tweets){
                  $scope.sent = tweets.data;
                 });
          });
      }
   });
    // var map = new Datamap({
    //     element: document.getElementById('container'),
    //     done: function(datamap) {
    //         datamap.svg.selectAll('.datamaps-subunit').on('click', function(geography) {
    //             alert(geography.properties.name);
    //         });
    //     }
    // });

  $scope.getBubbles = function(map,sent){
        map.bubbles(sent, {
        popupTemplate: function (geo, data) { 
                return ['<div class="hoverinfo">' +  data.text,
                '<br/>created_at: ' +  data.created_at,
                '<br/>Sentiment: ' +  data.sentiment + '',
                '</div>'].join('');
        }
      });
    }



}


]);




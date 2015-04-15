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
        scope: 'world',
          geographyConfig: {
            popOnHover: true,
            highlightOnHover: true,
          },
          fills: {
            'TX': "#FFCC9",
            defaultFill: "grey"
          },
          data: {
            'TX': {fillKey: 'TX'}
          }
    });
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




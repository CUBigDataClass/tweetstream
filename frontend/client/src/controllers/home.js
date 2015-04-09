angular.module('app').controller('HomeController', [
  '$scope',
  '$http',

  function($scope,$http){

   // $http({
   //  method: 'GET',
   //  url: '/tweets'
   // }).then(function(tweets){
   //  $scope.sent = tweets.data;
   // });
$scope.sent = [{"latitude":52.079961,"longitude":-0.739411,"text":"Closelineddddddddd","sentiment":0,"created_at":"Wed Feb 25 22:14:09 +0000 2015", "radius":20}]
// $scope.map = {
//     type: 'usa',
//     data: [{
//       values: [
//         { "location": "TX", "color": "#0066FF", "name":"testing123", "id": 123 },
//       ]
//     }],
//     options: {
//       width: 1110,
//       legendHeight: 60 // optionally set the padding for the legend
//     }
//   }

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




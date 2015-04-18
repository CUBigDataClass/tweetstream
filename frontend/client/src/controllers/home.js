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


    $scope.getTweetText = function(sent){
      var div = document.getElementById("sidebar");
      div.textContent = 'Tweet Text:';
      var l = sent.length;
      //todo: add a button to view tweets 1-10, 10-20, etc if l is huge 
      if (l < 10){
        for (var i = 0; i < l; i++) {
            div.textContent += sent[i].text;
        }
      }else {
          for (var i = 0; i < 10; i++) {
            div.textContent += sent[i].text;
        }

      }
      var text = div.textContent;
     }



}


]);




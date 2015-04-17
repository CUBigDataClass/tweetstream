angular.module('app').controller('HomeController', [
  '$scope',
  '$http',

  function($scope,$http){
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
        var state = geography.properties.name
        if(state == "Pennsylvania") state = "penna"
         $http({
            method: 'GET',
            url: '/tweets/'+state
           }).then(function(tweets){
            $scope.sent = tweets.data;
            var totalSent = 0;
            for(var index in tweets.data){
              tweetSent = tweets.data[index].sentiment
              totalSent += tweetSent
            }

            averageSent = totalSent/(tweets.data.length)
            // console.log(totalSent)
            // console.log(tweets.data.length)
            console.log("average" + averageSent)


           });
        });
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




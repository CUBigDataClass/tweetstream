angular.module('app').controller('HomeController', [
  '$scope',
  '$http',

  function($scope,$http){

  $http({
    method: 'GET',
    url: '/getlatest'
  }).then(function(tweets){
    $scope.latest = tweets;
  })

  $scope.map = new Datamap({

    element: document.getElementById('container'),
    scope: 'usa',
      geographyConfig: {
        popOnHover: true,
        highlightOnHover: false,
      },
      data: stateJSON = returnStateJSON(),
      fills: {
        defaultFill: '#99CC99'
      },
     done: function(datamap) {
        datamap.svg.selectAll('.datamaps-subunit').on('click', function(geography) {
        // alert(geography.properties.name);
        var state = geography.properties.name
        if(state == "Pennsylvania") state = "penna"
         $scope.state = state;
         $scope.stateTweets = []
         $http({
            method: 'GET',
            url: '/tweets/'+state
           }).then(function(tweets){
            $scope.sent = tweets.data;
            var totalSent = 0;
            for(var index in tweets.data){
              tweetSent = tweets.data[index].sentiment
              totalSent += tweetSent
              $scope.stateTweets.push(tweets.data[index])
            }

            averageSent = totalSent/(tweets.data.length);
            // $scope.averageSent = averageSent;
            if (averageSent < 0){
              console.log("true")
              averageSent = "#ff4c4c"
            } else {
              console.log("false")
              averageSent = "#6666FF"

            }
            stateJSON = returnStateJSON()

            var stateKey = String(geography.id)
            stateJSON[stateKey] = averageSent
            datamap.updateChoropleth(stateJSON);
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




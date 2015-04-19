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
      data: {
          "AZ": { "fillKey": "" },
          "CO": { "fillKey": "" },
          "DE": { "fillKey": "" },
          "FL": { "fillKey": "" },
          "GA": { "fillKey": "" },
          "HI": { "fillKey": "" },
          "ID": { "fillKey": "" },
          "IL": { "fillKey": "" },
          "IN": { "fillKey": "" },
          "IA": { "fillKey": "" },
          "KS": { "fillKey": "" },
          "KY": { "fillKey": "" },
          "LA": { "fillKey": "" },
          "MD": { "fillKey": "" },
          "ME": { "fillKey": "" },
          "MA": { "fillKey": "" },
          "MN": { "fillKey": "" },
          "MI": { "fillKey": "" },
          "MS": { "fillKey": "" },
          "MO": { "fillKey": "" },
          "MT": { "fillKey": "" },
          "NC": { "fillKey": "" },
          "NE": { "fillKey": "" },
          "NV": { "fillKey": "" },
          "NH": { "fillKey": "" },
          "NJ": { "fillKey": "" },
          "NY": { "fillKey": "" },
          "ND": { "fillKey": "" },
          "NM": { "fillKey": "" },
          "OH": { "fillKey": "" },
          "OK": { "fillKey": "" },
          "OR": { "fillKey": "" },
          "PA": { "fillKey": "" },
          "RI": { "fillKey": "" },
          "SC": { "fillKey": "" },
          "SD": { "fillKey": "" },
          "TN": { "fillKey": "" },
          "TX": { "fillKey": "" },
          "UT": { "fillKey": "" },
          "WI": { "fillKey": "" },
          "VA": { "fillKey": "" },
          "VT": { "fillKey": "" },
          "WA": { "fillKey": "" },
          "WV": { "fillKey": "" },
          "WY": { "fillKey": "" },
          "CA": { "fillKey": "" },
          "CT": { "fillKey": "" },
          "AK": { "fillKey": "" },
          "AR": { "fillKey": "" },
          "AL": { "fillKey": "" }
        },
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
            console.log(averageSent)
            if (averageSent < 0){
              console.log("true")
              averageSent = "#ff4c4c"
            } else {
              console.log("false")
              averageSent = "#6666FF"

            }

            var stateKey = String(geography.id)
            var m = {};
            m[stateKey] = averageSent
            // console.log(stateKey)

            datamap.updateChoropleth(m);
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




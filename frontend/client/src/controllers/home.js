angular.module('app').controller('HomeController', [
  '$scope',
  '$http',

  function($scope,$http){

  $scope.resetForm = function()
  {
    $scope.word = '';
    $scope.startDate = '';
    $scope.endDate = '';
    $scope.sent = null;
  };

  $scope.map = new Datamap({
    element: document.getElementById('container'),
    scope: 'usa',
      geographyConfig: {
        popOnHover: true,
        highlightOnHover: false,
        popupTemplate: function(geography, data) {
            return '<div class="hoverinfo">' + geography.properties.name 
        }
      },
      data: stateJSON = returnStateJSON(),
      fills: {
        defaultFill: '#99CC99',
        negative: '#ff4c4c',
        positive: '#6666FF'
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

            $scope.totalItems = $scope.sent.length;
            var totalSent = 0;
            for(var index in tweets.data){
              tweetSent = tweets.data[index].sentiment
              totalSent += tweetSent
              $scope.stateTweets.push(tweets.data[index])
            }

            averageSent = totalSent/(tweets.data.length);
            if (averageSent < 0){
              averageSent = '{"fillKey": "negative", "Tweets":"' + String(tweets.data.length) + '"}'
              averageSent = JSON.parse(averageSent)
            } else {
              averageSent = '{"fillKey": "positive", "Tweets":"' + String(tweets.data.length) + '"}'
              averageSent = JSON.parse(averageSent)
            }
            stateJSON = returnStateJSON()

            var stateKey = String(geography.id)
            stateJSON[stateKey] = averageSent
            datamap.updateChoropleth(stateJSON);
           });
        });
      }
   });

    $scope.word = '';
    $scope.query = function () {
     $http({
         method: 'GET',
         url: '/tweet_filter',
         params: {word:$scope.word, startDate:String($scope.startDate), endDate:String($scope.endDate)}
      }).then(function(tweets){
         $scope.sent = tweets.data;
         $scope.totalItems = $scope.sent.length;
     });
    }

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

  $scope.currentPage = 1;
  $scope.numPerPage = 10;

   $scope.paginate = function(value) {
    var begin, end, index;
    begin = ($scope.currentPage - 1) * $scope.numPerPage;
    end = begin + $scope.numPerPage;
    index = $scope.sent.indexOf(value);
    return (begin <= index && index < end);
  };

}

]);
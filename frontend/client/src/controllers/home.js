angular.module('app').controller('HomeController', [
  '$scope',
  '$http',
  '$interval',

  function($scope,$http, $interval){

    $scope.sent = [];
    $scope.oldString = [];

  $interval(function(){
    $http({
      method: 'GET',
      url: '/getlatest'
    }).then(function(newTweets){
          var newString = [];
          newTweets.data.forEach(function(tweet){
            tweet = angular.toJson(tweet);
            newString.push(tweet);
          });
            var toCompare = [];

          $scope.oldString.forEach(function(tweet){
              tweet = angular.toJson(tweet);
              toCompare.push(tweet); 
          });

          var toAdd = newString.filter(function(obj){
            return toCompare.indexOf(obj) == -1;
          });
          if(toAdd[0] !== null){
            toAdd.forEach(function(item){
              $scope.oldString.push(JSON.parse(item));
            });
          }
          $scope.latest = $scope.oldString;
          $scope.totalItems = $scope.latest.length;
      });
  },1000);

  $scope.resetForm = function()
  {
    $scope.word = '';
    $scope.startDate = '';
    $scope.endDate = '';
    $scope.sent = null;
    var stateJSON = returnStateJSON();
    $scope.map.updateChoropleth(stateJSON);
  };

  $interval(function(){
    $http({
      method: 'GET',
      url: '/count'
    }).then(function(count){
      count = JSON.stringify(count);
      count = JSON.parse(count)
      $scope.count = count.data;
    });
  },1000);

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
            $scope.onlyTwenty = tweets.data.slice(0,20);
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
         $scope.stateFills = {}

         for (var index in tweets.data){
          current_State = tweets.data[index].state;
          $scope.stateFills[current_State] = 0;
         }

         for(var index in tweets.data){
          current_State = tweets.data[index].state;
          $scope.stateFills[current_State] += tweets.data[index].sentiment;
         }

         stateJSON = returnStateJSON()
         for (var key in $scope.stateFills){
            if ($scope.stateFills[key] < 0) {

              averageSent = '{"fillKey": "negative", "Tweets":"' + String(tweets.data.length) + '"}'
              averageSent = JSON.parse(averageSent)
            } else {
              averageSent = '{"fillKey": "positive", "Tweets":"' + String(tweets.data.length) + '"}'
              averageSent = JSON.parse(averageSent)
            }
            var statekeys = returnStateKeysJSON();
            var stateKey = statekeys[String(key)]
            stateJSON[stateKey] = averageSent
         }


        $scope.map.updateChoropleth(stateJSON);

       });
         $scope.sent = tweets.data;
          $scope.totalItems = $scope.sent.length;
     };
        
     

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
  $scope.paginate2 = function(value) {
    var begin, end, index;
    begin = ($scope.currentPage - 1) * $scope.numPerPage;
    end = begin + $scope.numPerPage;
      index = $scope.latest.indexOf(value);
    return (begin <= index && index < end);
  };



}

]);
angular.module('app').controller('HomeController', [
  '$scope',
  '$http',

  function($scope,$http){

  $(function() {
    $( "#from" ).datepicker({
      defaultDate: "+1w",
      changeMonth: true,
      numberOfMonths: 3,
      onClose: function( selectedDate ) {
        $( "#to" ).datepicker( "option", "minDate", selectedDate );
      }
    });
    $( "#to" ).datepicker({
      defaultDate: "+1w",
      changeMonth: true,
      numberOfMonths: 3,
      onClose: function( selectedDate ) {
        $( "#from" ).datepicker( "option", "maxDate", selectedDate );
      }
    });
  });

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
      console.log(($scope.startDate))
     $http({
         method: 'GET',
         url: '/tweet_filter',
         params: {word:$scope.word, startDate:String($scope.startDate), endDate:String($scope.endDate)}
      }).then(function(tweets){
         $scope.sent = tweets.data;
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


}

]);


// angular.module('app').directive('dateRange', function () {
//   return {
//     templateUrl: 'partials/home.html',
//     scope: {
//       start: '=',
//       end: '='
//     },
//     link: function (scope, element, attrs) {

//       /*
//        * If no date is set on scope, set current date from user system
//        */
//       scope.start = new Date(scope.start || new Date());
//       scope.end = new Date(scope.end || new Date());

//       attrs.$observe('disabled', function(isDisabled){
//           scope.disableDatePickers = !!isDisabled;
//         });
//       scope.$watch('start.getTime()', function (value) {
//         if (value && scope.end && value > scope.end.getTime()) {
//           scope.end = new Date(value);
//           console.log(scope.end)
//         }
//       });
//       scope.$watch('end.getTime()', function (value) {
//         if (value && scope.start && value < scope.start.getTime()) {
//           scope.start = new Date(value);
//         }
//       });
//     }
//   };
// });



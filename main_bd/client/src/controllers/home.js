angular.module('app').controller('HomeController', [
  '$scope',
  '$http',

  function($scope,$http){

   // $http({
   //  method: 'GET',
   //  url: '/tweets'
   // }).then(function(tweets){
   //  $scope.sent = ;
   // });
$scope.map = {
  type: 'usa',
  data: [{
    values: [
      { "location": "TX", "value": 125 },
      { "location": "CAN", "value": 50 },
      { "location": "FRA", "value": 70 },
      { "location": "RUS", "value": 312 }
    ]
  }],
  colors: ['#666666', '#b9b9b9', '#fafafa'],
  options: {
    width: 1110,
    legendHeight: 60 // optionally set the padding for the legend
  }
}
}


]);




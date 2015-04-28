  Array.prototype.diff = function(a) {
    return this.filter(function(i) {return a.indexOf(i) < 0;});
  };

    // var tweets = [];
    // var arr  = [];


    //   if($scope.arr.diff(tweets)){
    //     var differ = arr.diff(tweets);
    //     $scope.arr.push(differ);
    //     console.log($scope.arr);
    //   }

var one = {
    "_id": {
        "$oid": "5536e0f7ac7402cf3584431a"
    },
    "created_at": {
        "$date": "2015-04-16T23:27:06.000Z"
    },
    "text": "My sister got me a pandora bracelet with 2 charms im so happy 😊 http://t.co/vIOYlg4vaf",
    "longitude": -73.484979,
    "latitude": 40.664796,
    "sentiment": 6,
    "state": "New York",
    "city": "",
    "tweet_id": 588846106412511230,
    "retweet_count": 0,
    "favorite_count": 0,
    "radius": 5,
    "__v": 0
};

var two = {
    "_id": {
        "$oid": "asdasda"
    },
    "created_at": {
        "$date": "2015-04-16T23:27:06.000Z"
    },
    "text": "My sister got me a pandora bracelet with 2 charms im so happy 😊 http://t.co/vIOYlg4vaf",
    "longitude": -73.484979,
    "latitude": 40.664796,
    "sentiment": 6,
    "state": "New York",
    "city": "",
    "tweet_id": 588846106412511230,
    "retweet_count": 0,
    "favorite_count": 0,
    "radius": 5,
    "__v": 0
};

one = JSON.stringify(one);
two = JSON.stringify(two);
var t = [one,'v','l', 'n'].diff([two,'v','a', 'q']);

console.log(t);
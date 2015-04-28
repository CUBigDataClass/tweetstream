var db        = require('./mongo.js');
var Tweet = db.tweetInit('test');
var moment = require('moment')



var stream = Tweet.find().stream();

stream.on('data', function (doc) {
  doc = JSON.stringify(doc);
  doc = JSON.parse(doc);
  var date = new Date(doc.created_at);



  Tweet.findByIdAndUpdate(doc._id, { $set: { created_at: date }}, function (err, tweet) {
    if (err) return handleError(err);
    console.log(tweet);
  });
}).on('error', function (err) {
  throw err;
}).on('close', function () {
});

// Tweet.find({"created_at": {"$gte": new Date(2014, 7, 14), "$lt": new Date(2014, 7, 15)}}, function(err,tweet){
//  tweet = JSON.stringify(tweet)
//  tweet = JSON.parse(tweet)
//  console.log(tweet);
// })
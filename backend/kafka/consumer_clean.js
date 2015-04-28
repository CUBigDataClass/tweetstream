'use strict';

var getSentiment = require("../helper/sentiment");
var getState     = require("../helper/statefinder.js");
var db = require('../helper/mongo.js').tweetInit('processed_data');
var AWS          = require('aws-sdk');
  
  AWS.config.loadFromPath('../config.json');

// var client = new Client('localhost:2181');
// var topics = [
//         {topic: topic, partition: 0}
//     ],
//     options = { autoCommit: false, fetchMaxWaitMs: 1000, fetchMaxBytes: 1024*1024 };

// var consumer = new Consumer(client, topics, options);
// var offset = new Offset(client);

// consumer.on('message', function (message) {


  var sqs    = new AWS.SQS();
var params = {
  QueueUrl: 'https://sqs.us-west-2.amazonaws.com/680925280915/TweetQueue', /* required */
  AttributeNames: [
    'All'
  ],
  MessageAttributeNames: [
    'message',
  ],
  VisibilityTimeout: 0,
  WaitTimeSeconds: 0
};

sqs.receiveMessage(params, function(err, data) {
  if (err) console.log(err, err.stack); // an error occurred
  else     console.log(data);           // successful response
});

    // message = JSON.parse(message.value);
    // var q = [];
    // var sent = getSentiment(message.text);

    // var date = new Date(message.created_at);

    // if(message.geo !== undefined){
    //     getState.getGeotagByLL(message.geo.coordinates[0]+","+message.geo.coordinates[1]).then(function(val){
    //       q = {created_at:date, text: message.text, longitude:message.geo.coordinates[1], latitude:message.geo.coordinates[0], sentiment:sent.score, state: val.region, city: val.city, tweet_id:message.id, retweet_count:message.retweet_count, favorite_count:message.favorite_count, radius: 5};
    //         db.create(q, function(err,doc){
    //             if(err) throw err;
    //         })
    //     });
    // }
// });

// consumer.on('error', function (err) {
//     console.log('error', err);
// });

/*
* If consumer get `offsetOutOfRange` event, fetch data from the smallest(oldest) offset
*/
// consumer.on('offsetOutOfRange', function (topic) {
//     topic.maxNum = 2;
//     offset.fetch([topic], function (err, offsets) {
//         var min = Math.min.apply(null, offsets[topic.topic][topic.partition]);
//         consumer.setOffset(topic.topic, topic.partition, min);
//     });
// });

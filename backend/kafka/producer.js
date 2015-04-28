var Twit       = require('twit'), // wrapper on top of twitter api
  dotenv       = require('dotenv'), // used for keys -> get from .env
  getSentiment = require("../helper/sentiment"),
  getState     = require("../helper/statefinder.js"),
  AWS          = require('aws-sdk');
  
  AWS.config.loadFromPath('../config.json');
  // kafka        = require('kafka-node'),
  // Producer     = kafka.Producer,
  // KeyedMessage = kafka.KeyedMessage,
  // Client       = kafka.Client,
  // client       = new Client('localhost:2181'),
  // argv         = require('optimist').argv,
  // topic        = argv.topic || 'tweets',
  // p            = argv.p || 0,
  // a            = argv.a || 0,
  // producer     = new Producer(client, { requireAcks: 1 });



dotenv.load();

  var T = new Twit({
      consumer_key:       process.env.TWITTER_CONSUMER_KEY,
      consumer_secret:    process.env.TWITTER_SECRET_KEY,
      access_token:       process.env.TWITTER_ACCESS_TOKEN,
      access_token_secret:  process.env.TWITTER_ACCESS_KEY
  });




  var sqs    = new AWS.SQS();
  var stream = T.stream('statuses/sample');
  
  stream.on('tweet', function(tweet){
    if(tweet.geo != null && tweet.lang == "en" && tweet.place !== null){
     if(tweet.place.country_code == "US"){
       var tweetJson = JSON.stringify(tweet);
       if(tweetJson !== undefined){
         sqs.sendMessage(buildParams(tweetJson), function(err, data) {
          if (err) console.log(err, err.stack); // an error occurred
          else     console.log(data);           // successful response
        });
      }
     }
    }
    });

function buildParams(tweet){
  return {
    MessageBody: tweet, /* required */
    QueueUrl: 'https://sqs.us-west-2.amazonaws.com/680925280915/TweetQueue', /* required */
    DelaySeconds: 0,
    // MessageAttributes: {
    //   someKey: {
    //     DataType: 'String' /* required */
    //     StringValue: 'tweet'
    //   },
    // }
  }
};

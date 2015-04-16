var Twit   = require('twit'), // wrapper on top of twitter api
  dotenv   = require('dotenv'), // used for keys -> get from .env
  kafka = require('kafka-node'),
  Producer = kafka.Producer,
  KeyedMessage = kafka.KeyedMessage,
  Client = kafka.Client,
  client = new Client('localhost:2181'),
  argv = require('optimist').argv,
  topic = argv.topic || 'tweets',
  p = argv.p || 0,
  a = argv.a || 0,
  producer = new Producer(client, { requireAcks: 1 });

dotenv.load();

  var T = new Twit({
      consumer_key:       process.env.TWITTER_CONSUMER_KEY,
      consumer_secret:    process.env.TWITTER_SECRET_KEY,
      access_token:       process.env.TWITTER_ACCESS_TOKEN,
      access_token_secret:  process.env.TWITTER_ACCESS_KEY
  });



producer.on('ready', function () {
    var stream = T.stream('statuses/sample');
    var q = [];

    stream.on('tweet', function(tweet){
      if(tweet.geo != null && tweet.lang == "en" && tweet.place.country_code == "US"){
          q.push(tweet);
      }
        var ret = q.shift();
        ret = JSON.stringify(ret);
        var toSend = [{ topic: topic, partition: p, messages: ret, attributes: a }];
        if(ret !== undefined){
          producer.send(toSend, function (err, result) {
                console.log(err || result);
                console.log(ret);
          });
        }
    });
  });




producer.on('error', function (err) {
    console.log('error', err)
});

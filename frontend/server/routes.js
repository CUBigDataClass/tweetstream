var db        = require('./mongo.js');
var Tweet = db.tweetInit('processed_data');
var elasticsearch = require('elasticsearch');

module.exports = function(app){


// ***
// Initialize elasticsearch client
// ***
var client = new elasticsearch.Client({
  host: 'localhost:9200',
  log: 'trace'
});


app.post('/search',function(req,res){
    client.search({
    q: req.query.word,
    size: 5000
  }).then(function (body) {
    var hits = body.hits.hits;
    res.send(hits);
  }, function (error) {
    console.trace(error.message);
  });
});

// ***
// Main view
// ***
  app.get('/', function(req, res) {
    res.render('index');
  });
  
  
// ***
// Gets Count of all tweets real time
// ***
  app.get('/count', function(req,res){
    Tweet.count({}, function(err,count){
      res.send(String(count));
    });
  });

// ***
// Gets Tweets based on certain date and keyword queries
// ***
  app.get('/tweet_filter', function(req,res){
    if(req.query.word && !req.query.startDate && !req.query.endDate){
      Tweet.find({text: { "$regex": req.query.word, "$options": "i" }}).find(function(err,tweet){
        if(err) throw err;
        res.status(200).send(tweet);
      });
    }
    else if(req.query.startDate && req.query.endDate && !req.query.word){
      Tweet.find({"created_at": {"$gte": new Date(req.query.startDate), "$lt": new Date(req.query.endDate)}}, function(err,tweet){
        if(err) throw err;
        res.status(200).send(tweet);
      });
    }
    else if(req.query.startDate && req.query.endDate && req.query.word){
       Tweet.find({text: { "$regex": req.query.word, "$options": "i" }, "created_at": {"$gte": new Date(req.query.startDate), "$lt": new Date(req.query.endDate)}}, function(err,tweet){
        if(err) throw err;
        res.status(200).send(tweet);
       });
    }
    else{
      res.status(404).send("Not found, try entering a query string");
    }
  });

// ***
// Gets Tweets from a certain state
// ***
  app.get('/tweets/:state', function(req,res){
  	var q = Tweet.find({state:req.params.state}).sort({created_at: -1}).limit(2000);
  	q.exec(function(err, tweets){
  		if (err) throw err
  		res.status(200).send(tweets);
  	})
  })



// ***
// Gets 10 latest tweets
// ***
  app.get('/getlatest', function(req,res){
  	Tweet.find({}).sort({created_at: -1}).limit(10).exec(function(err,tweet){
	  res.status(200).send(tweet)
	})
  })
};


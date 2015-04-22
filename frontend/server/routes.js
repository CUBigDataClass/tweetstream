var db        = require('./mongo.js');
var Tweet = db.tweetInit('processed_data');


module.exports = function(app){
	
  app.get('/', function(req, res) {
    res.render('index');
  });



  app.get('/tweet_filter', function(req,res){
    if(req.query.word){
      Tweet.find({text: { "$regex": req.query.word, "$options": "i" }}).find(function(err,tweet){
        if(err) throw err;
        res.status(200).send(tweet);
      });
    }
    else if(req.query.startDate && req.query.endDate){
      Tweet.find({"created_at": {"$gte": new Date(req.query.startDate), "$lt": new Date(req.query.endDate)}}, function(err,tweet){
        res.status(200).send(tweet);
      });
    }
    else if(req.query.startDate && req.query.endDate && req.query.word){
       Tweet.find({text: { "$regex": req.query.word, "$options": "i" }, {"created_at": {"$gte": new Date(req.query.startDate), "$lt": new Date(req.query.endDate)}}, function(err,tweet){
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
  	var q = Tweet.find({state:req.params.state}).limit(2000);
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


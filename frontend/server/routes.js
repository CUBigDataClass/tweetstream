var db        = require('./mongo.js');
var Tweet = db.tweetInit('processed_data');


module.exports = function(app){
	
  app.get('/', function(req, res) {
    res.render('index');
  });


// ***
// Outputs everything in the database
// ***
  app.get('/tweets', function(req,res){
    Tweet.find(function(err,doc){
      if(err) res.send(err);
      res.status(200).send(doc);
    });
  });

  app.get('/tweets_search/:word', function(req,res){
    if(req.params.word){
      Tweet.find({text: { "$regex": req.params.word, "$options": "i" }}).find(function(err,doc){
        if(err) throw err;
        res.status(200).send(doc);
        console.log(doc);
      });
    }else{
      Tweet.find(function(err,doc){
        if(err) throw err;
        res.status(200).send(doc);
        console.log(doc);
      });
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


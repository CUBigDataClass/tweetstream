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

  app.get('/stream', function(req, res){
  	// var stream = Tweet.find({state:"Texas"}).stream()
  	// stream.on('data', function(doc){
  	// 	res.status(200).send(doc)
  	// }).on('error', function(err){
  	// 	if (err) throw err
  	// })

  	Tweet.find({ state: "Texas" }).stream().pipe(res)

  	// Tweet.find().stream().pipe(res);
  })


};


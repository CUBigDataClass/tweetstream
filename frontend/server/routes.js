var db        = require('./mongo.js');
var Tweet = db.tweetInit('test_flattened');


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


};


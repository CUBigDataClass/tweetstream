var db        = require('./mongo.js');
var Tweet = db.tweetInit('statefinder');


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

  app.get('/tweets/:word', function(req,res){
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


};


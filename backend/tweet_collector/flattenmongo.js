var mongoose    = require('mongoose');

mongoose.connect('mongodb://Zandrr:password@ds047911.mongolab.com:47911/twitterstream');


var Any = new mongoose.Schema({ any: mongoose.Schema.Types.Mixed },{ strict: false });
function tweetInit(){
  return mongoose.model('Tweet', Any, 'flatten');
}


exports.tweetInit = tweetInit;



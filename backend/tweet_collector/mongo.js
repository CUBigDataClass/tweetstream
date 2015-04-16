var mongoose    = require('mongoose');

mongoose.connect('mongodb://localhost/tweetstream');


var Any = new mongoose.Schema({ any: mongoose.Schema.Types.Mixed },{ strict: false });
function tweetInit(collection){
  return mongoose.model('Tweet', Any, collection);
}


exports.tweetInit = tweetInit;



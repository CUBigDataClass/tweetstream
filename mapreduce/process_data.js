var mongoose    = require('mongoose'),
    db          = require('../tweet_collector/mongo.js').tweetInit();
var o = {};
o.map = function(){emit(this.id_str, {created_at:this.created_at,text:this.text,coordinates:this.geo.coordinates})};

o.reduce = function(key,values){return values[0];};

o.out = {replace:"tweets_processed"};

db.mapReduce(o, function(err,model, stats){
  if(err) console.log(err);
    console.log('map reduce took %d ms', stats.processtime);
    mongoose.connection.close();
});

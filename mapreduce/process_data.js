var mongoose    = require('mongoose'),
    db          = require('../tweet_collector/mongo.js').tweetInit(),
    sentiment 	= require('../sentiment');

var o = {};

o.map = function(){
	var sent = getsentiment(this.text).score;
	emit(this.id_str, {created_at:this.created_at,text:this.text,coordinates:this.geo.coordinates,sentiment:sent});
};

o.reduce = function(key,values){return values[0];};
o.out = {replace:"sent_test"};
o.scope = {getsentiment:sentiment}

db.mapReduce(o, function(err,model, stats){
  if(err) console.log(err);
    console.log('map reduce took %d ms', stats.processtime);
    mongoose.connection.close();
});


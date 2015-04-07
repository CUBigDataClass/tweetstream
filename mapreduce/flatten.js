var mongoose    = require('mongoose'),
    db          = require('../tweet_collector/flattenmongo.js'),
    Tweet 		= db.tweetInit();

Tweet.aggregate([
		{ $project: { 'latitude': '$value.latitude', 'longitude': '$value.longitude', 'text': '$value.text','sentiment': '$value.sentiment', 'created_at': '$value.created_at'}},
		{ $out : "flattened" }
	], function (err, result) {
        if (err) {
            console.log(err);
            return;
        }
        console.log("db flattened");
        
    });


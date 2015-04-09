var mongoose    = require('mongoose'),
    db          = require('../tweet_collector/mongo.js').tweetInit("intermediate"); //intermediary db

// takes out attrs from value and flattens them. outputs to db named flattened.
function flatten(outDB){
    return db.aggregate([
		{ $project: { 'latitude': '$value.latitude', 'longitude': '$value.longitude', 'text': '$value.text','sentiment': '$value.sentiment', 'created_at': '$value.created_at'}},
		{ $out : outDB }
	], function (err, result) {
        if (err) {
            console.log(err);
            return;
        }
        console.log("db flattened");

    });
}

exports.flatten = flatten;



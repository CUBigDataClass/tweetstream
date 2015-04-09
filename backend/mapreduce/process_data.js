var mongoose    = require('mongoose'),
    db          = require('../tweet_collector/mongo.js').tweetInit(),
    sentiment   = require('./sentiment'),
    afinn       = require('./sentiment/build/AFINN.json'),
    emojiRegex  = require('emoji-regex');

var o = {};

o.map = function(){
    var sent = getsentiment(this.text).score;
    emit(this.id_str, {created_at:this.created_at,text:this.text,longitude:this.geo.coordinates[1],latitude:this.geo.coordinates[0],sentiment:sent});
};

o.reduce = function(key,values){return values[0];};
o.out = {replace:"sent_test"};
o.scope = {
    getsentiment:sentiment, 
    tokenize:function tokenize (input) {
    var str = input
            .replace(/[^a-zA-Z- ]+/g, '')
            .replace('/ {2,}/',' ')
            .toLowerCase()
            .split(' ');
    var emojis = input
            .match(emojiRegex());
    if(emojis != null ) {
        return str.concat(emojis);
    }
    return str
    },
    afinn:afinn,
    emojiRegex:emojiRegex
    }

db.mapReduce(o, function(err,model, stats){
  if(err) console.log(err);
    console.log('map reduce took %d ms', stats.processtime);
    mongoose.connection.close();
});

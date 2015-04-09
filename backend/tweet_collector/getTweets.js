var tweets = require('./coordinateTweets.js');
function getTweets(args) {
  args = process.argv.slice(2);
  if(args == 'first'){
    tweets.getTweetsOne();
  }
  else if(args == 'second'){
    tweets.getTweetsTwo();
  }
  else if(args == 'newyork'){
    tweets.getNewYork();
  }
  else if(args == 'smile'){
    tweets.getSmile();
  }
}
getTweets();
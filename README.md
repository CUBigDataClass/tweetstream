# twitterstream
Simple express app that streams in a sample of live tweets, these tweets are then run through a 3rd party sentiment analysis library and given a score Implemented using Node.js and Express.

## To Run: 
 Add a file named ".env" that contains your twitter API keys in the root directory. It should be in the following format:
```
TWITTER_CONSUMER_KEY=xxxx
TWITTER_SECRET_KEY=xxxx
TWITTER_ACCESS_TOKEN=xxxx
TWITTER_ACCESS_KEY=xxxx
```

Install dependencies:
```
npm install
```

Start server and you should see incoming tweets and their sentiment analysis printing to the console.
```
npm start
```

## Map Reduce
Found in ```/mapreduce/``` 

 ```process_data.js``` processes the raw twitter data and extracts the text, location, and performs sentiment analysis on the tweet.
 
 ```flatten.js``` transforms the processed data to a format that works with the front end maps.

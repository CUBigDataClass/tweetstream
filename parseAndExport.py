import json
from pprint import pprint
import heatmap

#reads a json file full o' tweets and turns it into a pair of (latitude, longitude) tuples
#uses heatmap library to export a .kml file that produces a heatmap
#currently uses tweet density; does not support sentiment color shading yet

json_data=open('tweets.json')


data = json.load(json_data)

coordlist = []

for i in range(0, len(data)):
	x = data[i]['coordinates']['coordinates']
	lat,long = (x[0],x[1])
	coordlist.append((lat,long))



hm = heatmap.Heatmap()


hm.heatmap(coordlist, dotsize = 30)
hm.saveKML("tweetcoords.kml")


json_data.close()
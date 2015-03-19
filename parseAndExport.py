import json
from pprint import pprint
import heatmap
import sys
import pycurl

try:
	if len(sys.argv) < 4:
		print "Not enough command line arguments! \nparseAndExport.py <latitude> <longitude> <keyword>"
	else:
		longitude = sys.argv[2]
		latitude = sys.argv[1]
		keyword = sys.argv[3]
except:
	print "Error parsing command line arguments!"
	sys.exit()

#square zoom 8 :0.588519
#square zoom 13:0.008733
print "Creating heatmap centered at ("+latitude+","+longitude+")......"
lowerLeftLat = float(latitude)-0.588519
lowerLeftLon = float(longitude)-0.588519
squareSide = 0.588519*2


flags = "-O"
requestString = '"' + 'https://maps.googleapis.com/maps/api/staticmap?center='+latitude+","+longitude+'&zoom=8&size=1024x1024'+ '"'
cURL = "curl " + flags + " " + requestString


json_data=open('tweets.json')


data = json.load(json_data)


coordlist = []

for i in range(0, len(data)):
	x = data[i]['coordinates']['coordinates']
	text = data[i]['text'].lower().split(" ")
	lat,long,words = (x[1],x[0],text)
	coordlist.append((lat,long,text))

#latitude = up/down (first element)
#longitude = left/right (second element)





heatpoints = []
for i in range(0, len(data)):
	x = coordlist[i]
	lat,long = (x[0],x[1])
	text = x[2]
	if long >= lowerLeftLon:
		if long <= lowerLeftLon + squareSide:
			if lat >= lowerLeftLat:
				if lat <= lowerLeftLat + squareSide:
					for word in text:
						if word == keyword:	
							heatpoints.append((lat,long))




#print heatpoints

print "Mapping " + str(len(heatpoints)) + " coordinates onto heatmap filtering for keyword " + keyword +"....."
hm = heatmap.Heatmap()


if len(heatpoints) > 0:
	hm.heatmap(heatpoints, dotsize = 30)
	hm.saveKML("tweetcoords.kml")
else:
	print "No tweets recorded in this location!"


print "\njust paste this curl request into your terminal to get the map corresponding to your lat/long, because libcurl is stupid:\n"
print cURL+"\n"


""" sanity checker: uncomment this if you want to see what the lat/long box is we are looking for
print lowerLeftLat, lowerLeftLon
print lowerLeftLat + squareSide, lowerLeftLon
print lowerLeftLat + squareSide, lowerLeftLon + squareSide
print lowerLeftLat, lowerLeftLon + squareSide
"""

json_data.close()


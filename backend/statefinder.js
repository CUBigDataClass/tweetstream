var unirest = require('unirest');
var Q = require('q');




// function getGeotagByAddress(addressString) {

// 	var location = addressString

// 	unirest.get("https://montanaflynn-geocoder.p.mashape.com/address?address="+location)
// 	.header("X-Mashape-Key", "coUtA6xOROmshQHp8rFDi5ddoI0vp1w3GTBjsnfJsZiuoAHXkv")
// 	.header("Accept", "application/json")
// 	.end(function (result) {
// 	  console.log(result.status, result.headers, result.body);
// 	});
// }

// function getGeotagByIP(IPString) {

// 	var location = IPString

// 	unirest.get("https://montanaflynn-geocoder.p.mashape.com/ip?ip="+location)
// 	.header("X-Mashape-Key", "coUtA6xOROmshQHp8rFDi5ddoI0vp1w3GTBjsnfJsZiuoAHXkv")
// 	.header("Accept", "application/json")
// 	.end(function (result) {
// 	  console.log(result.status, result.headers, result.body);
// 	});
// }

function getGeotagByLL(LLString) {

	var location = LLString.split(",");
	
	var latitude = location[0];
	var longitude = location[1];

	var deferred = Q.defer();


	unirest("GET","https://montanaflynn-geocoder.p.mashape.com/reverse?latitude="+latitude+"&longitude="+longitude)
	.header("X-Mashape-Key", "coUtA6xOROmshQHp8rFDi5ddoI0vp1w3GTBjsnfJsZiuoAHXkv")
	.header("Accept", "application/json")
	.end(function (result) {
	  deferred.resolve(result.body);
	});

	return deferred.promise;
}

// typeRequest = process.argv[2]
// param = process.argv[3]

// if (typeRequest == "-a")
// 	{console.log("\nLooking up address " + param +" just for you!  You're so lucky!\n")
// 	getGeotagByAddress(param)}
// else if (typeRequest =="-i")
// 	{console.log("\nLooking up IP address " + param +" just for you!  You're so lucky!\n")
// 	getGeotagByIP(param)}
// else if (typeRequest == "-l")
// 	{console.log("\nLooking up Latitude/Longitude " + param +" just for you!  You're so lucky!\n")
// 	getGeotagByLL(param)}
// else 
// 	console.log("Unknown API request!!\nUsage:\n	-a Search by address\n	-i Search by IP address\n	-l Search by Latitude/Longitude\n")

//as usual tutorial has little bearing on the reallll worrllldd......

//var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

// var xhr = new XMLHttpRequest();
// xhr.open("GET", "https://montanaflynn-geocoder.p.mashape.com/address?address=20368+Airmont+Road+Round+Hill+VA", false);

// xhr.setRequestHeader('Accept', 'application/json');
// xhr.send();

// console.log(xhr.status)
// console.log(xhr.statusText)

// xmlDocument = xhr.responseXML;
// console.log(xmlDocument.body);
exports.getGeotagByLL = getGeotagByLL;

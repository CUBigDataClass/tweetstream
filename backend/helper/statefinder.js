var unirest = require('unirest');
var Q = require('q');


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

exports.getGeotagByLL = getGeotagByLL;

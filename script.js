//On click should set variables for the input fields
$("#submitAddresses").on("click", function(){
    console.log("Functioning");
    let addressOne = $("#addressOne").val();
    let addressTwo = $("#addressTwo").val();
    alert(addressOne + addressTwo);
});

var settings = {
	"async": true,
	"crossDomain": true,
	"url": "https://forward-reverse-geocoding.p.rapidapi.com/v1/forward?polygon_geojson=0&state=NY&limit=5&street=12%20West%204th%20Street&polygon_svg=0&country=USA&polygon_kml=0&namedetails=0&accept-language=en&city=New%20York&addressdetails=1&polygon_threshold=0.0&polygon_text=0&bounded=0&format=json",
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "forward-reverse-geocoding.p.rapidapi.com",
		"x-rapidapi-key": "d5a9e5282bmshadfe616217dbda8p1fd537jsn689affc185cc"
	}
}

$.ajax(settings).done(function (response) {
	console.log(response);
});
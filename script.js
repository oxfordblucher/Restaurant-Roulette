// A $( document ).ready() block.
$( document ).ready(function() {
    //On click should set variables for the input fields
$("#submitAddresses").on("click", function(){
    console.log("Functioning");
    let streetOne = $("#streetOne").val();
    let cityOne = $("#cityOne").val();
    let stateOne = $("#stateOne").val();
    let codeOne = $("#codeOne").val();
    let streetTwo = $("#streetTwo").val();
    let cityTwo = $("#cityTwo").val();
    let stateTwo = $("#stateTwo").val();
    let codeTwo = $("#codeTwo").val();


    var setting1 = {
        "async": true,
        "crossDomain": true,
        "url": "https://forward-reverse-geocoding.p.rapidapi.com/v1/forward?polygon_geojson=0&state=" + stateOne + "&limit=1&street=" + streetOne + "&polygon_svg=0&postalcode=" + codeOne + 
        "&polygon_kml=0&namedetails=0&accept-language=en&city=" + cityOne + "&addressdetails=1&polygon_threshold=0.0&polygon_text=0&bounded=0&format=json",
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "forward-reverse-geocoding.p.rapidapi.com",
            "x-rapidapi-key": "d5a9e5282bmshadfe616217dbda8p1fd537jsn689affc185cc"
        }
    }

    var setting2 = {
        "async": true,
        "crossDomain": true,
        "url": "https://forward-reverse-geocoding.p.rapidapi.com/v1/forward?polygon_geojson=0&state=" + stateTwo + "&limit=1&street=" + streetTwo + "&polygon_svg=0&postalcode=" + codeTwo + 
        "&polygon_kml=0&namedetails=0&accept-language=en&city=" + cityTwo + "&addressdetails=1&polygon_threshold=0.0&polygon_text=0&bounded=0&format=json",
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "forward-reverse-geocoding.p.rapidapi.com",
            "x-rapidapi-key": "d5a9e5282bmshadfe616217dbda8p1fd537jsn689affc185cc"
        }
    }
    test(setting1,setting2);

});

function test(setting1, setting2){
    $.ajax(setting1)
    .then(function(response) {
        var temp={lat:response[0].lat, lon: response[0].lon};
        return temp
    }).then(function(temp) {
        $.ajax(setting2)
        .then(function(response2) {
            //action1
            console.log(temp);
            var temp2={lat:response2[0].lat, lon: response2[0].lon};
            console.log(temp2);
            var lat1 = parseFloat(temp.lat);
            var lat2 = parseFloat(temp2.lat);
            var lon1 = parseFloat(temp.lon);
            var lon2 = parseFloat(temp2.lon);
            var avgLat = (lat1 + lat2) /2;
            var avgLon = (lon1 + lon2) /2;
            var coord = {
                lat: avgLat, 
                lon: avgLon
            };
            return coord;
        }).then(function(coord) {
            console.log(coord);
            var foodUrl = "https://developers.zomato.com/api/v2.1/search?count=10&lat=" + coord.lat + "&lon=" + coord.lon + "&radius=3219";
            $.ajax({
                url: foodUrl,
                headers: {
                    'user-key': "0b0b28bbc4c8c280f62ef50d44784da7"
                },
                method: 'GET'
        }).then(function(response) {
            console.log(response);
        })
      });
})}})
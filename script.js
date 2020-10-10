$(".modal-button").click(function () {
    var target = $(this).data("target");
    $("html").addClass("is-clipped");
    $(target).addClass("is-active");
});

$(".modal-close").click(function () {
    $("html").removeClass("is-clipped");
    $(this).parent().removeClass("is-active");
});

// A $( document ).ready() block.
$(document).ready(function () {
    //On click should set variables for the input fields
    $("#submitAddresses").on("click", function () {

    let bingLoc = "";

        
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
        "url": "https://forward-reverse-geocoding.p.rapidapi.com/v1/forward?polygon_geojson=0&state=" + stateOne + "&limit=1&street=" + streetOne + "&polygon_svg=0&polygon_kml=0&namedetails=0&accept-language=en&city=" + cityOne + "&addressdetails=1&polygon_threshold=0.0&polygon_text=0&bounded=0&format=json",
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "forward-reverse-geocoding.p.rapidapi.com",
            "x-rapidapi-key": "d5a9e5282bmshadfe616217dbda8p1fd537jsn689affc185cc"
        }
    }

    var setting2 = {
        "async": true,
        "crossDomain": true,
        "url": "https://forward-reverse-geocoding.p.rapidapi.com/v1/forward?polygon_geojson=0&state=" + stateTwo + "&limit=1&street=" + streetTwo + "&polygon_svg=0&polygon_kml=0&namedetails=0&accept-language=en&city=" + cityTwo + "&addressdetails=1&polygon_threshold=0.0&polygon_text=0&bounded=0&format=json",
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "forward-reverse-geocoding.p.rapidapi.com",
            "x-rapidapi-key": "d5a9e5282bmshadfe616217dbda8p1fd537jsn689affc185cc"
        }
    }
    test(setting1, setting2);

});
function test(setting1, setting2) {
    $.ajax(setting1)
        .then(function (response) {
            var temp = { lat: response[0].lat, lon: response[0].lon };
            return temp
        }).then(function (temp) {
            $.ajax(setting2)
                .then(function (response2) {
                    //action1
                    console.log(temp);
                    var temp2 = { lat: response2[0].lat, lon: response2[0].lon };
                    console.log(temp2);
                    var lat1 = parseFloat(temp.lat);
                    var lat2 = parseFloat(temp2.lat);
                    var lon1 = parseFloat(temp.lon);
                    var lon2 = parseFloat(temp2.lon);
                    var avgLat = (lat1 + lat2) / 2;
                    var avgLon = (lon1 + lon2) / 2;
                    console.log(avgLat, avgLon);
                    //Bing requires funky formatting, so I've included it here.
                    bingLoc = new Microsoft.Maps.Location(avgLat, avgLon);

                    
                    var coord = {
                        lat: avgLat,
                        lon: avgLon
                    };
                    return coord;
                }).then(function (coord) {
                    console.log(coord);
                    var foodUrl = "https://developers.zomato.com/api/v2.1/search?count=10&lat=" + coord.lat + "&lon=" + coord.lon + "&radius=3219";
                    $.ajax({
                        url: foodUrl,
                        headers: {
                            'user-key': "0b0b28bbc4c8c280f62ef50d44784da7"
                        },
                        method: 'GET'
                    }).then(function (response) {
                        console.log(response);
                        console.log(response.restaurants[0].restaurant.location.latitude);

                    //Here we are establishing a new map in place of the old one
                    var map = new Microsoft.Maps.Map(document.getElementById('myMap'), {
                        credentials: 'ApFZwBlF5C4sFUrPWvHt7DxQbosvOYl24WTQE-GGMHphkpiCCHm14tkZq0S8CvJZ'
                    });

                    //With the attributes...
                    map.setView({
                        //set to the avgLat and avgLon coordinates
                        mapTypeId: Microsoft.Maps.MapTypeId.road,
                        center: bingLoc,
                        zoom: 12
                    });

                    Microsoft.Maps.loadModule('Microsoft.Maps.SpatialMath', function () {

                        //createCircle is a Bing pre-baked function that uses a location, radius, and color to create a circle polygon element
                        var circle = createCircle(bingLoc, 2, 'rgba(0,0,150,0.2)');
                        //After we've define it, we push it to our map as an entity.
                        map.entities.push(circle);
                        pushPin();
                    })

                    function createCircle(bingLoc, radius, color) {
                        var locs = Microsoft.Maps.SpatialMath.getRegularPolygon(bingLoc, radius, 36, Microsoft.Maps.SpatialMath.DistanceUnits.Miles);
                        return new Microsoft.Maps.Polygon(locs, { fillColor: color, strokeThickness: 0 });
                        //Once we have the radius mapped, let's call the Zomato API's coordinate array, call a for loop that maps different pins across the board.

                    }

                    function pushPin(){
                        for (i=0; i<10; i++){
                            let estabLoc = new Microsoft.Maps.Location(response.restaurants[i].restaurant.location.latitude, response.restaurants[i].restaurant.location.longitude);
                            var pushpin = new Microsoft.Maps.Pushpin(estabLoc, { title: response.restaurants[i].restaurant.name, subTitle: response.restaurants[i].restaurant.cuisines, enableHoverStyle: true, enableClickedStyle: true });
                            map.entities.push(pushpin);
                        }

                    }

                    
                    });
                });
        })
}
});
//Default Map for on Load
function GetMap() {
    new Microsoft.Maps.Map('#myMap', {
        credentials: 'ApFZwBlF5C4sFUrPWvHt7DxQbosvOYl24WTQE-GGMHphkpiCCHm14tkZq0S8CvJZ'
    });
}




//On click should set variables for the input fields
$("#submitAddresses").on("click", function(){
    console.log("Functioning");
    let numOne = $("#numOne").val();
    let streetOne = $("#streetOne").val();
    let cityOne = $("#cityOne").val();
    let stateOne = $("#stateOne").val();
    let codeOne = $("#codeOne").val();
    let numTwo = $("#numTwo").val();
    let streetTwo = $("#streetTwo").val();
    let cityTwo = $("#cityTwo").val();
    let stateTwo = $("#stateTwo").val();
    let codeTwo = $("#codeTwo").val();


    var settings = {
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
    
    $.ajax(settings).done(function (response) {
        console.log(response);
    });
});


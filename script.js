let streetOne = "";
let cityOne = "";
let stateOne = "";
let streetTwo = "";
let cityTwo = "";
let stateTwo = "";
let firstFill = false;
let firstInput = "";
function GetMap() {
    Microsoft.Maps.loadModule('Microsoft.Maps.AutoSuggest', {
        callback: function () {
            var manager = new Microsoft.Maps.AutosuggestManager({
                placeSuggestions: true
            });
            manager.attachAutosuggest('#streetTwo', '#autoTwo', selectedSuggestion);
        },
        errorCallback: function(msg){
            console.log(msg);
        },
        credentials: 'ApFZwBlF5C4sFUrPWvHt7DxQbosvOYl24WTQE-GGMHphkpiCCHm14tkZq0S8CvJZ'
        
    });
    Microsoft.Maps.loadModule('Microsoft.Maps.AutoSuggest', {
        callback: function () {
            var manager = new Microsoft.Maps.AutosuggestManager({
                placeSuggestions: true
            });
            manager.attachAutosuggest('#streetOne', '#autoOne', selectedSuggestion);
        },
        errorCallback: function(msg){
            console.log(msg);
        },
        credentials: 'ApFZwBlF5C4sFUrPWvHt7DxQbosvOYl24WTQE-GGMHphkpiCCHm14tkZq0S8CvJZ'
        
    });   
}
function selectedSuggestion(result) {
    if(!firstFill){
        streetOne = result.address.addressLine || '';
        cityOne = result.address.locality || '';
        stateOne = result.address.adminDistrict || '';
        document.getElementById('streetOne').value = result.formattedSuggestion;
        firstInput = result.formattedSuggestion
        firstFill = true;
    }else{
        streetTwo = result.address.addressLine || '';
        cityTwo = result.address.locality || '';
        stateTwo = result.address.adminDistrict || '';
        document.getElementById('streetTwo').value = result.formattedSuggestion;
        document.getElementById('streetOne').value = firstInput;
    }


}


// function GetMap() {
//     Microsoft.Maps.loadModule('Microsoft.Maps.AutoSuggest', {
//         callback: function () {
//             var manager = new Microsoft.Maps.AutosuggestManager({
//                 placeSuggestions: true
//             });
//             manager.attachAutosuggest('#streetTwo', '#autoTwo', selectedSuggestion);
//         },
//         errorCallback: function(msg){
//             console.log(msg);
//         },
//         credentials: 'ApFZwBlF5C4sFUrPWvHt7DxQbosvOYl24WTQE-GGMHphkpiCCHm14tkZq0S8CvJZ' 
//     });
//     Microsoft.Maps.loadModule('Microsoft.Maps.AutoSuggest', {
//         callback: function () {
//             var manager = new Microsoft.Maps.AutosuggestManager({
//                 placeSuggestions: true
//             });
//             manager.attachAutosuggest('#streetOne', '#autoOne', selectedSuggestion);
            
//         },
//         errorCallback: function(msg){
//             console.log(msg);
//         },
//         credentials: 'ApFZwBlF5C4sFUrPWvHt7DxQbosvOYl24WTQE-GGMHphkpiCCHm14tkZq0S8CvJZ' 
//     });
// }


// function selectedSuggestion(result) {
    
//     if(!firstFill){
       
//         streetOne = result.address.addressLine || '';
//         cityOne = result.address.locality || '';
//         stateOne = result.address.adminDistrict || '';
//         document.getElementById('streetOne').value = streetOne + ", " + cityOne + ", " + stateOne; 
//     }  else {
//         streetTwo = result.address.addressLine || '';
//         cityTwo = result.address.locality || '';
//         stateTwo = result.address.adminDistrict || '';
//         document.getElementById('streetOne').value = streetOne + ", " + cityOne + ", " + stateOne; 
//         document.getElementById('streetTwo').value = streetTwo + ", " + cityTwo + ", " + stateTwo; 
//     }
// }
 

    var zomatoCall = "";
    var result = "";

    //On click should set variables for the input fields
    $("#submitAddresses").on("click", function () {

        $(".restaurant-list").html("");

        let bingLoc = "";

        let userQuery = $("#userQuery").val();
        
    

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
                        console.log(response2)
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
                        //Bing requires specific location formatting, this translates our lat and lon into Bing's requirements.
                        bingLoc = new Microsoft.Maps.Location(avgLat, avgLon);

                        var coord = {
                            lat: avgLat,
                            lon: avgLon
                        };
                        return coord;
                    }).then(function (coord) {
                        console.log(coord);
                        const distRBs = $("input[name = 'mileage']");
                        let selectedMile;
                        for (const distRB of distRBs) {
                            if (distRB.checked) {
                                selectedMile = distRB.value;
                                break;
                            }
                        }
                        var radius = parseFloat(selectedMile) * 1609;
                        
                        var sortFunc = $("#sortFunc").children("option:selected").val();

                        const sortRBs = $("input[name = 'sortOrd']");
                        let selectedOrd;
                        for (const sortRB of sortRBs) {
                            if (sortRB.checked) {
                                selectedOrd = sortRB.value;
                                break;
                            }
                        }

                        var userQuery = $("#userQuery").val();

                        var foodUrl = "https://developers.zomato.com/api/v2.1/search?q=" + userQuery + "&count=20&lat=" + coord.lat + "&lon=" + coord.lon + "&radius=" + radius + "&sort=" + sortFunc + "&order=" + selectedOrd;
                        
                        console.log(foodUrl);
                        
                        $.ajax({
                            url: foodUrl,
                            headers: {
                                'user-key': "0b0b28bbc4c8c280f62ef50d44784da7",
                            },
                            method: 'GET'
                        }).then(function (response) {
                            zomatoCall = response;                           
                            console.log(zomatoCall);

                            for (let i = 0; i < zomatoCall.restaurants.length; i++) {
                                if (i === 10) {
                                    break;
                                }
                                let restList = $(".restaurant-list");
                                let result = zomatoCall.restaurants[i];

                                //This creates the div tile 
                                var nuTile = $("<div class ='tile rows' id='modal-button' data-target='#modal'>");
                                //This attaches a dynamic ID the will be able to append the restaurant information on click
                                nuTile.attr("id", result.restaurant.name);
                                var restName = $("<div class='restaurantName row is-full'>");
                                var restAddr = $("<div class='restaurantAddress row is-full'>");
                                var restCuis = $("<div class='restaurantCuisine row is-full'>");

                                restList.append(nuTile);
                                restName.text(result.restaurant.name);
                                restAddr.text(result.restaurant.location.address);
                                restCuis.text(result.restaurant.cuisines);
                                nuTile.append(restName, restAddr, restCuis);
                                //Here we are adding a click listener so that whenever the nuTile div is clicked, it opens the modal.
                                nuTile.click(function(){
                                    $(".modal-card-body").html("");
                                    $("#modal").attr("style", "display: block");
                                    //text appending to the modal should go here!
                                    if(this.id === result.restaurant.name) {
                                        $(".modal-card-title").text(result.restaurant.name);
                                        
                                        var restIMG = $("<img class ='restaurantIMG' alt='Featured Image'>");
                                        restIMG.attr("src", result.restaurant.featured_image);

                                        var modalPrice = $("<div class='row is-full'>");
                                        var priceRange = parseInt(result.restaurant.price_range)
                                        modalPrice.text("Price Range: " + "$".repeat(priceRange));

                                        var modalPhone = $("<div class='row is-full'>");
                                        modalPhone.text("Phone number(s): " + result.restaurant.phone_numbers)

                                        var modalTime = $("<div class='row is-full'>");
                                        modalTime.text("Hours: " + result.restaurant.timings);

                                        var modalRate = $("<div class='row is-full'>");
                                        modalRate.text("Rating: " + result.restaurant.user_rating.aggregate_rating);
                                        modalRate.append($("<br>"), "(A '0' usually denotes a lack of ratings.)")

                                        var modalLink = $("<a target='_blank'>Zomato Page</a>");
                                        modalLink.attr("href", result.restaurant.url);

                                        $(".modal-card-body").append(restIMG, modalPrice, modalPhone, modalTime, modalRate, modalLink);
                                    }
                                    
                                });

                                $("#closeModalbg, #closeModalx").click(function(){
                                    $("#modal").attr("style", "display: none")
                                })

                            }
                            //Creates a map
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
                            //Create 10 pushpins on the map at the 10 locations, listed in their array order
                            Microsoft.Maps.loadModule('Microsoft.Maps.SpatialMath', function () {
                                for (i = 0; i < 10; i++) {
                                    result = zomatoCall.restaurants[i];
                                    let label = (i+1).toString();
                                    let estabLoc = new Microsoft.Maps.Location(result.restaurant.location.latitude, result.restaurant.location.longitude);
                                    var pushpin = new Microsoft.Maps.Pushpin(estabLoc, { text: label, title: result.restaurant.name, subTitle: result.restaurant.cuisines, enableHoverStyle: true});
                                    Microsoft.Maps.Events.addHandler(pushpin, 'click', function () {  $("#modal").attr("style", "display: block")  
                                    }); 
                                    map.entities.push(pushpin);
                                }
                            });

                        });
                    })
            });
    }




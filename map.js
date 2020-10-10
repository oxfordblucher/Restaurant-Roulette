var map = new Microsoft.Maps.Map(document.getElementById('myMap'), {});
Microsoft.Maps.loadModule('Microsoft.Maps.Search', function () {
    var searchManager = new Microsoft.Maps.Search.SearchManager(map);
    var reverseGeocodeRequestOptions = {
        location: new Microsoft.Maps.Location(47.640049, -122.129797),
        callback: function (answer, userData) {
            map.setView({ bounds: answer.bestView });
            map.entities.push(new Microsoft.Maps.Pushpin(reverseGeocodeRequestOptions.location));
            document.getElementById('printoutPanel').innerHTML =
                answer.address.formattedAddress;
        }
    };
    searchManager.reverseGeocode(reverseGeocodeRequestOptions);
});
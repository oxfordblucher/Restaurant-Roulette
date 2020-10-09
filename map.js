function GetMap()
{
    var map = new Microsoft.Maps.Map('#myMap', {});

    console.log(map.getCenter());

    Microsoft.Maps.loadModule('Microsoft.Maps.SpatialMath', function(){
        var center = map.getCenter();
        //createCircle is a Bing pre-baked function that uses a location, radius, and color to create a circle polygon element
        var circle = createCircle(center, 2, 'rgba(0,0,150,0.2)');
        //After we've define it, we push it to our map as an entity.
        map.entities.push(circle);
        pinPlace();
    })

    function createCircle(center, radius, color){
        var locs = Microsoft.Maps.SpatialMath.getRegularPolygon(center, radius, 36, Microsoft.Maps.SpatialMath.DistanceUnits.Miles);
        return new Microsoft.Maps.Polygon(locs, {fillColor: color, strokeThickness: 0});
        //Once we have the radius mapped, let's call the Zomato API's coordinate array, call a for loop that maps different pins across the board.
        
    }

    function pinPlace(){
        var pushpin = new Microsoft.Maps.Pushpin(map.getCenter(), { text: 'A', title: 'Location', subTitle: 'Cafe', enableHoverStyle: true, enableClickedStyle: true});
        console.log(pushpin.metadata);
        map.entities.push(pushpin);
    }

}
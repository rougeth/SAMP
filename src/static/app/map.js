var map;
var directionsDisplay;
var directionsService = new google.maps.DirectionsService();
var markers = [];
var brasilia = latlng(-15.7929449, -47.8882138);
var cached = {}
var buses = [];

var user = {
    latlng: null
}



function showCurrentPosition(position) {
    user.latlng = latlng(
        position.coords.latitude,
        position.coords.longitude
    )

    add_user_marker(user.latlng);
    map.setCenter(user.latlng);
}

function latlng(lat, lng) {
    return new google.maps.LatLng(lat, lng);
}

function init_samp_map() {
    var mapOptions = {
//maxZoom: 17,
        minZoom: 12,
        zoom: 15,
        streetViewControl: false,
        mapTypeControl: false,
        center: brasilia,
        styles: [
        {
            featureType: "transit.station.bus",
            stylers: [
            { visibility: "on" }
            ]
        }]
    };

    map = new google.maps.Map(document.getElementById('samp-map'),
        mapOptions);

   // Bounds for DF
   var strictBounds = new google.maps.LatLngBounds(
     latlng(-15.792, -47.888),
     latlng(-15.7929449, -47.8882138)
   );

   // Listen for the dragend event
   google.maps.event.addListener(map, 'dragend', function() {
    if (strictBounds.contains(map.getCenter())) return;

    var c = map.getCenter(),
        x = c.lng(),
        y = c.lat();
        limit = 0.3
        maxX = strictBounds.getNorthEast().lng(),
        maxY = strictBounds.getNorthEast().lat(),
        minX = strictBounds.getSouthWest().lng(),
        minY = strictBounds.getSouthWest().lat();

    if (x < minX-limit) x = minX;
    if (x > maxX+limit) x = maxX;
    if (y < minY-limit) y = minY;
    if (y > maxY+limit) y = maxY;

    map.setCenter(new google.maps.LatLng(y, x));
   });

   google.maps.event.addListener(map, 'click', function(event) {
    console.log(event.latLng.k + ',' + event.latLng.B);

   });
}

function getLocation(userCentered) {
    return navigator.geolocation.getCurrentPosition(showCurrentPosition);
}

function add_user_marker(locale) {
    new google.maps.Marker({
        position: locale,
        map: map,
        icon: '/static/imgs/person.png'
    });
}

function add_bus_stop(locale) {
    var marker = new google.maps.Marker({
        position: locale,
        map: map,
        icon: '/static/imgs/bus_stop.png'
    });
    markers.push(marker);

}

function add_bus(locale) {
    var bus = new google.maps.Marker({
        position: locale,
        map: map,
        icon: '/static/imgs/bus.png'
    });
    buses.push(bus);
}

function add_subway_station(locale) {
    var marker = new google.maps.Marker({
        position: locale,
        map: map,
        icon: '/static/imgs/subway_stop2.png'
    });
    markers.push(marker);
}

function showRoute(waypoints) {
    var p = [];
    remove_rendered_routes();
    directionsDisplay = new google.maps.DirectionsRenderer({
        polylineOptions: {
            strokeColor: '#ff5722',
            strokeOpacity: 0.8,
            strokeWeight: 3,
            icons: [{
                icon: {
                    scale: 3,
                    path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW
                },
                repeat: '200px'
            }]

        },
        suppressMarkers: true
    });
    console.log(directionsDisplay);
    directionsDisplay.setMap(map);
    waypoints.forEach(function(point) {
        p.push({
            location: latlng(point.latitude, point.longitude)
        });
    });
    startPoint = p.shift();
    var request = {
        origin: startPoint.location,
        destination: startPoint.location,
        waypoints: p,
        travelMode: google.maps.TravelMode.DRIVING
    }
    directionsService.route(request, function(response, status) {
        directionsDisplay.setDirections(response);
    });
}

function remove_all_markers() {
    for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(null);
    }
    markers = [];
    for(i = 0; i<buses.length; i++) {
        buses[i].setMap(null);
    }
    buses = [];
}

function remove_rendered_routes() {
    if(directionsDisplay) {
        directionsDisplay.setMap(null);
        directionsDisplay = null;
    }
}

google.maps.event.addDomListener(window, 'load', init_samp_map);

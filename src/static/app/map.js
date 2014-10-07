var map;
var markers = [];

function init_samp_map() {
    var brasilia = new google.maps.LatLng(-15.7929449, -47.8882138);
    var mapOptions = {
        maxZoom: 17,
        minZoom: 14,
        zoom: 15,
        streetViewControl: false,
        center: brasilia,
        styles: [
        {
            featureType: "transit.station.bus",
            stylers: [
            { visibility: "off" }
            ]
        }]
    };

    map = new google.maps.Map(document.getElementById('samp-map'),
        mapOptions);

   // Bounds for DF
   var strictBounds = new google.maps.LatLngBounds(
     new google.maps.LatLng(-15.792, -47.888), 
     new google.maps.LatLng(-15.7929449, -47.8882138)
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
}

function add_bus_stop(locale) {
    var marker = new google.maps.Marker({
        position: locale,
        map: map,
        icon: '/static/imgs/bus_stop.png'
    });
    markers.push(marker);
}

function remove_all_markers() {
    for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(null);
    }
    markers = [];
}

google.maps.event.addDomListener(window, 'load', init_samp_map);

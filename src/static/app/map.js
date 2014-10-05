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

var map;
var markers = [];

function init_samp_map() {
    var brasilia = new google.maps.LatLng(-15.7929449, -47.8882138);
    var mapOptions = {
        maxZoom: 16,
        minZoom: 14,
        zoom: 14,
        streetViewControl: false,
        center: brasilia
    };
    map = new google.maps.Map(document.getElementById('samp-map'),
        mapOptions);
}

function add_marker(locale) {
    var marker = new google.maps.Marker({
        position: locale,
        map: map
    });
    markers.push(marker);
}

google.maps.event.addDomListener(window, 'load', init_samp_map);
var map;
function init_samp_map() {
  var mapOptions = {
    maxZoom: 16,
    minZoom: 14,
    zoom: 14,
    streetViewControl: false,
    center: new google.maps.LatLng(-15.7929449, -47.8882138)
  };
  map = new google.maps.Map(document.getElementById('samp-map'), mapOptions);
}

google.maps.event.addDomListener(window, 'load', init_samp_map);

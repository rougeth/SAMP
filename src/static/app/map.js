var map;
function init_samp_map() {
  var mapOptions = {
    zoom: 8,
    center: new google.maps.LatLng(-34.397, 150.644)
  };
  map = new google.maps.Map(document.getElementById('samp-map'), mapOptions);
}

google.maps.event.addDomListener(window, 'load', init_samp_map);

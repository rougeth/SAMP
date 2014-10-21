from django.conf.urls import patterns, include, url


urlpatterns = patterns('buses.views',
    url(r'^lines$', 'bus_lines', name='bus_lines'),
    url(r'^lines/(?P<region_a>[^/]+)/(?P<region_b>[^/]+)/$',
        'bus_lines_per_regions', name='bus_lines_per_regions'),
    url(r'^route/(?P<line>[^/]+)$', 'bus_route', name='bus_route'),
    url(r'^regions$', 'bus_regions', name='bus_regions'),
    url(r'^stops$', 'bus_stops', name='bus_stops'),
    url(r'^stops/radius/(?P<lat>[^/]+)/(?P<lng>[^/]+)/$',
        'bus_stops_radius', name='bus_stops_radius'),
    url(r'^lines/radius/(?P<origin_lat>[^/]+)/(?P<origin_lng>[^/]+)/(?P<destiny_lat>[^/]+)/(?P<destiny_lng>[^/]+)/$',
        'bus_lines_radius', name='bus_lines_radius'),
    url(r'^buses$', 'bus_buses', name='bus_buses'),
    url(r'^track/(?P<line>[^/]+)$', 'bus_position', name='bus_position'),
)

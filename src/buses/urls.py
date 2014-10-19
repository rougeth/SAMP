from django.conf.urls import patterns, include, url


urlpatterns = patterns('buses.views',
    url(r'^lines$', 'bus_lines', name='bus_lines'),
    url(r'^lines/(?P<region_a>[^/]+)/(?P<region_b>[^/]+)/$',
        'bus_lines_per_regions', name='bus_lines_per_regions'),
    url(r'^route/(?P<line>[^/]+)$', 'bus_route', name='bus_route'),
    url(r'^regions$', 'bus_regions', name='bus_regions'),
    url(r'^stops$', 'bus_stops', name='bus_stops'),
    url(r'^buses$', 'bus_buses', name='bus_buses'),
    url(r'^track/(?P<line>[^/]+)$', 'bus_position', name='bus_position'),
)

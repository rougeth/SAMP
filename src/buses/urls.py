from django.conf.urls import patterns, include, url


urlpatterns = patterns('buses.views',
    url(r'^regions/(?P<region_a>[^/]+)/(?P<region_b>[^/]+)/$', 'bus_lines',
        name='bus_lines'),
    url(r'^route/(?P<line>[^/]+)$', 'bus_route', name='bus_route'),
    url(r'^regions$', 'bus_regions', name='bus_regions'),
    url(r'^stops$', 'bus_stops', name='bus_stops'),
)

from django.conf.urls import patterns, include, url


urlpatterns = patterns('subways.views',
	url(r'^regions/(?P<region_a>[^/]+)/(?P<region_b>[^/]+)/$', 'subway_lines',
        name='subway_lines'),
    url(r'^route/(?P<line>[^/]+)$', 'subway_route', name='subway_route'),
    url(r'^stations$', 'subway_stations', name='subway_stations'),
    url(r'^regions$', 'subway_regions', name='subway_regions'),
)

from django.conf.urls import patterns, include, url


urlpatterns = patterns('buses.views',
    url(r'^stops$', 'bus_stops', name='bus_stops'),
    url(r'^regions$', 'bus_regions', name='bus_regions'),
)

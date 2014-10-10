from django.conf.urls import patterns, include, url


urlpatterns = patterns('subways.views',
    url(r'^stops$', 'subway_stops', name='subway_stops'),
    url(r'^regions$', 'subway_regions', name='subway_regions'),
)

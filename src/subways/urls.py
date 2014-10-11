from django.conf.urls import patterns, include, url


urlpatterns = patterns('subways.views',
    url(r'^stations$', 'subway_stations', name='subway_stations'),
    url(r'^regions$', 'subway_regions', name='subway_regions'),
)

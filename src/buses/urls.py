from django.conf.urls import patterns, include, url

urlpatterns = patterns('buses.views',
    url(r'^stops$', 'bus_stops'),
)

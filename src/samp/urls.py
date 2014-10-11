from django.conf.urls import patterns, include, url
from django.contrib import admin

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'samp.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),

    url(r'^admin/', include(admin.site.urls)),
    url(r'^api/buses/', include('buses.urls')),
    url(r'^api/subways/', include('subways.urls')),
    url(r'', include('core.urls')),
)

from django.contrib import admin

from buses.models import Region, Stop, Line


admin.site.register(Region)
admin.site.register(Stop)
admin.site.register(Line)

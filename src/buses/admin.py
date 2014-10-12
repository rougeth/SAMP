from django.contrib import admin

from buses.models import Region, Stop, Line, LineWaypoint


admin.site.register(Region)
admin.site.register(Stop)
admin.site.register(Line)
admin.site.register(LineWaypoint)

from django.contrib import admin

from subways.models import Region, Station, Line, LineWaypoint


admin.site.register(Region)
admin.site.register(Station)
admin.site.register(Line)
admin.site.register(LineWaypoint)

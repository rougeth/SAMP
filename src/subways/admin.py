from django.contrib import admin

from subways.models import Station, Line, LineWaypoint


admin.site.register(Station)
admin.site.register(Line)
admin.site.register(LineWaypoint)

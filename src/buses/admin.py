from django.contrib import admin

from buses.models import Stop, Line, LineWaypoint


admin.site.register(Stop)
admin.site.register(Line)
admin.site.register(LineWaypoint)

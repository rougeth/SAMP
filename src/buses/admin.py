from django.contrib import admin

from buses.models import Stop, Line, LineWaypoint, Bus, BusPosition


admin.site.register(Stop)
admin.site.register(Line)
admin.site.register(LineWaypoint)
admin.site.register(Bus)
admin.site.register(BusPosition)

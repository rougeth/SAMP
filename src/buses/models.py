from django.db import models
from geoposition.fields import GeopositionField


class BusStop(models.Model):
    position = GeopositionField()

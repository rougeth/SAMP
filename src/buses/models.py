from django.db import models

from core.models import Region


class Stop(models.Model):
    region = models.ForeignKey(Region,
        related_name='%(app_label)s_%(class)s_region')
    latitude = models.FloatField()
    longitude = models.FloatField()


class Line(models.Model):
    name = models.CharField(max_length=50)
    regions = models.ManyToManyField(Region,
        related_name='%(app_label)s_%(class)s_region')

    def __str__(self):
        return self.name


class LineWaypoint(models.Model):
    line = models.ForeignKey(Line)
    latitude = models.FloatField()
    longitude = models.FloatField()

class Bus(models.Model):
    line = models.ForeignKey(Line)
    plate = models.CharField(max_length=7)

class BusPosition(models.Model):
    bus = models.ForeignKey(Bus)
    latitude = models.FloatField()
    longitude = models.FloatField()
    position = models.BooleanField(default=False)

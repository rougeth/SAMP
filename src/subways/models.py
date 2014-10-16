from django.db import models


class Station(models.Model):
    latitude = models.FloatField()
    longitude = models.FloatField()


class Region(models.Model):
    name = models.CharField(max_length=50)

    def __str__(self):
        return self.name


class Line(models.Model):
    name = models.CharField(max_length=50)
    regions = models.ManyToManyField(Region)

    def __str__(self):
        return self.name


class LineWaypoint(models.Model):
    line = models.ForeignKey(Line)
    latitude = models.FloatField()
    longitude = models.FloatField()

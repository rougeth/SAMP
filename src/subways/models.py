from django.db import models


class Stop(models.Model):
    latitude = models.FloatField()
    longitude = models.FloatField()


class Region(models.Model):
    name = models.CharField(max_length=50)

    def __str__(self):
        return self.name


from django.db import models


class Stops(models.Model):
    latitude = models.FloatField()
    longitude = models.FloatField()

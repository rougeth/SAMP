from django.db import models


class Stop(models.Model):
    latitude = models.FloatField()
    longitude = models.FloatField()



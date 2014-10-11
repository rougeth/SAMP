from rest_framework import serializers

from subways.models import Region, Station


class StationsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Station
        fields = ('latitude', 'longitude')

class RegionsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Region
        fields = ('name',)

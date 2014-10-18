from rest_framework import serializers

from core.models import Region
from subways.models import Station, Line, LineWaypoint


class StationsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Station
        fields = ('latitude', 'longitude')

class RegionsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Region
        fields = ('name',)

class LinesSerializer(serializers.ModelSerializer):
    regions = RegionsSerializer(many=True)

    class Meta:
        model = Line
        fields = ('name', 'regions')

class LineWaypointsSerializer(serializers.ModelSerializer):
    class Meta:
        model = LineWaypoint
        fields = ('latitude', 'longitude')

from rest_framework import serializers

from core.models import Region
from buses.models import Line, Stop, LineWaypoint, Bus, BusPosition


class StopsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Stop
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

class BusSerializer(serializers.ModelSerializer):
    line = LinesSerializer()
    class Meta:
        model = Bus
        fields = ('id', 'plate',)

class BusPositionSerializer(serializers.ModelSerializer):
    bus = BusSerializer()

    class Meta:
        model = BusPosition
        fields = ('bus', 'latitude', 'longitude')

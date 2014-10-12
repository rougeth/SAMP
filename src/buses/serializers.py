from rest_framework import serializers

from buses.models import Line, Region, Stop, LineWaypoint


class StopsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Stop
        fields = ('latitude', 'longitude')

class RegionsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Region
        fields = ('name',)

class LinesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Line
        fields = ('name', 'regions')

class LineWaypointsSerializer(serializers.ModelSerializer):
    class Meta:
        model = LineWaypoint
        fields = ('latitude', 'longitude')


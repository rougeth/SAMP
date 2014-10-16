from rest_framework import serializers

from subways.models import Region, Station, Line, LineWaypoint


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

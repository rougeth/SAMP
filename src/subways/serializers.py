from rest_framework import serializers

from subways.models import Region, Stop


class StopsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Stop
        fields = ('latitude', 'longitude')

class RegionsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Region
        fields = ('name',)

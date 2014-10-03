from rest_framework import serializers

from buses.models import Stops


class StopsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Stops
        fields = ('latitude', 'longitude')


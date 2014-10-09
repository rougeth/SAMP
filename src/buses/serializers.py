from rest_framework import serializers

from buses.models import Stop


class StopsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Stop
        fields = ('latitude', 'longitude')


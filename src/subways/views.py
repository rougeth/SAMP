from django.shortcuts import render
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt

from rest_framework.renderers import JSONRenderer
from rest_framework.parsers import JSONParser

from subways.models import Region, Station
from subways.serializers import RegionsSerializer, StationsSerializer


class JSONResponse(HttpResponse):
    """
    An HttpResponse that renders its content into JSON.
    """
    def __init__(self, data, **kwargs):
        content = JSONRenderer().render(data)
        kwargs['content_type'] = 'application/json'
        super(JSONResponse, self).__init__(content, **kwargs)


@csrf_exempt
def subway_stations(request):
    if request.method == 'GET':
        stations = Station.objects.all()
        serializer = StationsSerializer(stations, many=True)
        return JSONResponse(serializer.data)

@csrf_exempt
def subway_regions(request):
    if request.method == 'GET':
        regions = Region.objects.all()
        serializer = RegionsSerializer(regions, many=True)
        return JSONResponse(serializer.data)
from django.shortcuts import render
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt

from rest_framework.renderers import JSONRenderer
from rest_framework.parsers import JSONParser

from buses.models import Line, Region, Stop
from buses.serializers import (LinesSerializer, RegionsSerializer,
                                StopsSerializer)


class JSONResponse(HttpResponse):
    """
    An HttpResponse that renders its content into JSON.
    """
    def __init__(self, data, **kwargs):
        content = JSONRenderer().render(data)
        kwargs['content_type'] = 'application/json'
        super(JSONResponse, self).__init__(content, **kwargs)


@csrf_exempt
def bus_regions(request):
    if request.method == 'GET':
        regions = Region.objects.all()
        serializer = RegionsSerializer(regions, many=True)
        return JSONResponse(serializer.data)


@csrf_exempt
def bus_stops(request):
    if request.method == 'GET':
        stops = Stop.objects.all()
        serializer = StopsSerializer(stops, many=True)
        return JSONResponse(serializer.data)


@csrf_exempt
def bus_lines(request, region_a, region_b):
    if request.method == 'GET':
        region_a = Region.objects.get(name=region_a)
        region_b = Region.objects.get(name=region_b)
        lines = Line.objects.filter(regions__id=region_a.id).filter(regions__id=region_b.id)

        serializer = LinesSerializer(lines, many=True)
        return JSONResponse(serializer.data)

from itertools import cycle

from django.shortcuts import render
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt

from rest_framework.renderers import JSONRenderer
from rest_framework.parsers import JSONParser

from haversine import haversine

from core.models import Region
from buses.models import Line, Region, Stop, LineWaypoint, Bus, BusPosition
from buses.serializers import (LinesSerializer, RegionsSerializer,
                                StopsSerializer, LineWaypointsSerializer,
                                BusSerializer, BusPositionSerializer)


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
        r = Region.objects.get(name='Black Hole')
        stops = Stop.objects.exclude(region=r)
        serializer = StopsSerializer(stops, many=True)
        return JSONResponse(serializer.data)


@csrf_exempt
def bus_lines_per_regions(request, region_a, region_b):
    if request.method == 'GET':
        region_a = Region.objects.get(name=region_a)
        region_b = Region.objects.get(name=region_b)
        lines = Line.objects.filter(regions__id=region_a.id).filter(regions__id=region_b.id)

        serializer = LinesSerializer(lines, many=True)
        return JSONResponse(serializer.data)

@csrf_exempt
def bus_lines(request):
    if request.method == 'GET':
        lines = Line.objects.all()

        serializer = LinesSerializer(lines, many=True)
        return JSONResponse(serializer.data)


@csrf_exempt
def bus_route(request, line):
    if request.method == 'GET':
        line = Line.objects.get(name=line)
        points = LineWaypoint.objects.filter(line=line)

        serializer = LineWaypointsSerializer(points, many=True)
        return JSONResponse(serializer.data)

@csrf_exempt
def bus_buses(request):
    if request.method == 'GET':
        buses = Bus.objects.all()

        serializer = BusSerializer(buses, many=True)
        return JSONResponse(serializer.data)

@csrf_exempt
def bus_position(request, line):
    if request.method == 'GET':
        line = Line.objects.get(name=line)
        buses = Bus.objects.filter(line=line)
        positions = cycle(BusPosition.objects.filter(bus__in=buses))
        r = []
        check = False
        for p in positions:
            if check:
                p.position = True
                p.save()
                check = False
                break
            if p.position:
                r.append(p)
                p.position = False
                p.save()
                check = True

        serializer = BusPositionSerializer(r, many=True)
        return JSONResponse(serializer.data)

@csrf_exempt
def bus_stops_radius(request, lat, lng):
    if request.method == 'GET':
        stops = Stop.objects.all()
        near = []
        for s in stops:
            if haversine((float(lat), float(lng)), (s.latitude, s.longitude)) < 0.3:
                near.append(s)

        serializer = StopsSerializer(near, many=True)
        return JSONResponse(serializer.data)

@csrf_exempt
def bus_lines_radius(request, origin_lat, origin_lng, destiny_lat, destiny_lng):
    if request.method == 'GET':
        stops = Stop.objects.all()
        origin_near = []
        destiny_near = []
        origin = (float(origin_lat), float(origin_lng))
        destiny = (float(destiny_lat), float(destiny_lng))

        for s in stops:
            if haversine(origin, (s.latitude, s.longitude)) < 0.3:
                origin_near.append(s.region)

            if haversine(destiny, (s.latitude, s.longitude)) < 0.3:
                destiny_near.append(s.region)

        origin_near = list(set(origin_near))
        destiny_near = list(set(destiny_near))


        lines = Line.objects.filter(regions__in=destiny_near).filter(regions__in=origin_near)

        serializer = LinesSerializer(lines, many=True)
        return JSONResponse(serializer.data)

from django.shortcuts import render, HttpResponse

# Create your views here.
def bus_stops(request):
    return render(request, 'buses/bus_stops.html')

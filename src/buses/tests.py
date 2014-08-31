from django.core.urlresolvers import resolve
from django.test import TestCase

from buses.views import bus_stops


# Create your tests here.
class BusStopsTest(TestCase):

    def test_url_to_view(self):
        found = resolve('/bus-stops')
        self.assertEqual(found.func, bus_stops)


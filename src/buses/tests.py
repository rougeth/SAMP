from django.core.urlresolvers import resolve
from django.test import TestCase

from buses.views import bus_stops


# Create your tests here.
class BusStopsTest(TestCase):

    def setUp(self):
        self.response = self.client.get('/bus/stops')

    def test_url_to_view(self):
        found = resolve('/bus/stops')
        self.assertEqual(found.func, bus_stops)

    def test_get(self):
        self.assertEqual(self.response.status_code, 200)

    def test_template(self):
        self.assertTemplateUsed(
            self.response,
            'buses/bus_stops.html'
        )


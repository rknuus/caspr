#!/usr/bin/env python
# -*- coding: utf-8 -*-


from caspr.staticcoordinate import StaticCoordinate
import unittest


class TestStaticCoordinate(unittest.TestCase):
    def test_coordinates_in_wgs84_with_floating_point_minutes(self):
        inputs_outputs = {'\n                N 47° 03.204 E 008° 18.557\xa0\n\n            ': 'N 47° 03.204 E 008° 18.557'}
        for input, output in inputs_outputs.items():
            self.assertEquals(StaticCoordinate.match(input), output)

    def test_non_coordinates_yield_empty(self):
        inputs_outputs = {'\n                ???\xa0\n\n            ': None}
        for input, output in inputs_outputs.items():
            self.assertEquals(StaticCoordinate.match(input), output)

# TESTLIST:
# - coordinates_in_wgs84_decimal
# - coordinates_in_wgs84_with_minutes_and_seconds
# - UTM format
# - british grid
# - swiss grid
# - coordinates_in_nad27_with_floating_point_minutes
# - coordinates_in_nad27_decimal
# - coordinates_in_nad27_with_minutes_and_seconds

#!/usr/bin/env python
# -*- coding: utf-8 -*-

from caspr.staticcoordinate import StaticCoordinate
import unittest


class TestStaticCoordinate(unittest.TestCase):
    def test_coordinates_in_wgs84_with_floating_point_minutes(self):
        self.assertEquals(StaticCoordinate.match('\n                N 47° 03.204 E 008° 18.557\xa0\n\n            '),
                          'N 47° 03.204 E 008° 18.557')

    def test_non_coordinates_yield_empty(self):
        self.assertIsNone(StaticCoordinate.match('\n                ???\xa0\n\n            '))

    def test_partial_coordinates_dont_match(self):
        self.assertIsNone(StaticCoordinate.match('N 47° 03.204'))
        self.assertIsNone(StaticCoordinate.match('E 008° 18.557'))

    def test_partial_coordinates_do_match_partially(self):
        self.assertTrue(StaticCoordinate.match_partially('N 47° 03.204'))
        self.assertTrue(StaticCoordinate.match_partially('E 008° 18.557'))

    def test_fullcoordinates_do_match_partially_returns_longitude(self):
        self.assertEquals(StaticCoordinate.match_partially('N 47° 03.204 E 008° 18.557'), 'N 47° 03.204')


# TESTLIST:
# - coordinates_in_wgs84_decimal
# - coordinates_in_wgs84_with_minutes_and_seconds
# - UTM format
# - british grid
# - swiss grid
# - coordinates_in_nad27_with_floating_point_minutes
# - coordinates_in_nad27_decimal
# - coordinates_in_nad27_with_minutes_and_seconds

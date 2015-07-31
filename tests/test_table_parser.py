#!/usr/bin/env python
# -*- coding: utf-8 -*-

from caspr.tableparser import TableParser
import os
import unittest


class TestTableParser(unittest.TestCase):
    def test_(self):
        path = os.path.join(os.path.dirname(__file__), "sample_data/GC2A62B Seepromenade Luzern [DE_EN] (Multi-cache) "
                            "in Zentralschweiz (ZG_SZ_LU_UR_OW_NW), Switzerland created by Worlddiver.html")
        table_parser = TableParser(path)
        self.assertEqual(table_parser.coordinates(), ['\n                N 47° 03.204 E 008° 18.557\xa0\n\n            ',
                                                      '\n                ???\xa0\n\n            ',
                                                      '\n                ???\xa0\n\n            ',
                                                      '\n                ???\xa0\n\n            ',
                                                      '\n                ???\xa0\n\n            ',
                                                      '\n                ???\xa0\n\n            ',
                                                      '\n                ???\xa0\n\n            ',
                                                      '\n                ???\xa0\n\n            '])


# TESTLIST:
# - coordinates_in_wgs84_with_floating_point_minutes
# - coordinates_in_wgs84_decimal
# - coordinates_in_wgs84_with_minutes_and_seconds
# - UTM format
# - british grid
# - swiss grid
# - coordinates_in_nad27_with_floating_point_minutes
# - coordinates_in_nad27_decimal
# - coordinates_in_nad27_with_minutes_and_seconds

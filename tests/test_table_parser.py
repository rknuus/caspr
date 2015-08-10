#!/usr/bin/env python
# -*- coding: utf-8 -*-

from caspr.tableparser import TableParser
import os
import unittest


class TestTableParser(unittest.TestCase):
    def test_get_coordinates(self):
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

    def test_get_names(self):
        path = os.path.join(os.path.dirname(__file__), "sample_data/GC2A62B Seepromenade Luzern [DE_EN] (Multi-cache) "
                            "in Zentralschweiz (ZG_SZ_LU_UR_OW_NW), Switzerland created by Worlddiver.html")
        table_parser = TableParser(path)
        self.maxDiff = None
        self.assertEqual(table_parser.names(),
                         ['\n                Stage 1: Schwanenplatz (Virtuelle Station)\n            ',
                          '\n                Stage 2: Pavillion (Virtuelle Station)\n            ',
                          '\n                Stage 3: Restaurant (Virtuelle Station)\n            ',
                          '\n                Stage 4: Palace (Virtuelle Station)\n            ',
                          '\n                Stage 5: Park (Virtuelle Station)\n            ',
                          '\n                Stage 6: Abkühlung (Virtuelle Station)\n            ',
                          '\n                Stage 7: Dichter und Patriot (Virtuelle Station)\n            ',
                          '\n                Stage 8: Guisan (Virtuelle Station)\n            '])

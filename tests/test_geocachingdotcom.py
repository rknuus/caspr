#!/usr/bin/env python
# -*- coding: utf-8 -*-

from unittest.mock import MagicMock, patch
from urllib.parse import quote_plus
import os
import unittest
import responses

from caspr.casprexception import CasprException
from caspr.geocachingdotcom import GeocachingSite, PageParser, TableParser
from caspr.stage import Stage

_SAMPLE_TABLE_PATH = ('sample_data/GC2A62B Seepromenade Luzern [DE_EN] (Multi-cache) in Zentralschweiz '
                      '(ZG_SZ_LU_UR_OW_NW), Switzerland created by Worlddiver.html')


def _urlencode_parameter(name, value):
    return '{0}={1}'.format(quote_plus(name), quote_plus(value))


class TestCaspr(unittest.TestCase):
    def setUp(self):
        with open('tests/sample_data/login_page.html') as file:
            self._login_page_content = file.read()
        with open('tests/sample_data/login_failed.html') as file:
            self._login_failed_page_content = file.read()
        with open('tests/sample_data/cache.html') as file:
            self._cache_page_content = file.read()

    @responses.activate
    def test_prepare_session_with_correct_password(self):
        responses.add(responses.GET, 'https://www.geocaching.com/login/default.aspx', body=self._login_page_content)
        responses.add(responses.POST, 'https://www.geocaching.com/login/default.aspx')
        GeocachingSite('Jane Doe', 'password')
        self.assertEqual(len(responses.calls), 2)
        self.assertEqual(responses.calls[0].request.url, 'https://www.geocaching.com/login/default.aspx')
        self.assertEqual(responses.calls[1].request.url, 'https://www.geocaching.com/login/default.aspx')
        self.assertIn(_urlencode_parameter('ctl00$ContentBody$tbUsername', 'Jane Doe'),
                      responses.calls[1].request.body)
        self.assertIn(_urlencode_parameter('ctl00$ContentBody$tbPassword', 'password'),
                      responses.calls[1].request.body)

    @responses.activate
    def test_wrong_password_raises_exception(self):
        responses.add(responses.GET, 'https://www.geocaching.com/login/default.aspx', body=self._login_page_content)
        responses.add(responses.POST, 'https://www.geocaching.com/login/default.aspx',
                      body=self._login_failed_page_content)
        with self.assertRaises(CasprException) as context:
            GeocachingSite('Jane Doe', 'wrong_password')
        self.assertIn('Logging in to www.geocaching.com as Jane Doe failed.', context.exception.args[0])

    @responses.activate
    def test_fetch_returns_cache_page(self):
        responses.add(responses.GET, 'https://www.geocaching.com/login/default.aspx', body=self._login_page_content)
        responses.add(responses.POST, 'https://www.geocaching.com/login/default.aspx')
        responses.add(responses.GET, 'http://www.geocaching.com/geocache/ABCDEF', body=self._cache_page_content)
        site = GeocachingSite('Jane Doe', 'password')
        site.fetch('ABCDEF')
        self.assertEqual(len(responses.calls), 3)
        self.assertEqual(responses.calls[2].request.url, 'http://www.geocaching.com/geocache/ABCDEF')


class TestPageParser(unittest.TestCase):
    def test_parse_calls_parse_on_table_parser(self):
        table_parser_mock = MagicMock()
        table_parser_mock.parse.return_value = ('irrelevant', [])
        parser = PageParser(table_parser=table_parser_mock)
        parser.parse(page='irrelevant')
        self.assertTrue(table_parser_mock.parse.called)

    def test_no_iteration_if_data_empty(self):
        parser = PageParser(table_parser=None)
        parser._data = iter([])
        generator = parser._generator()
        actual = list(generator)
        self.assertEqual([], actual)

    def test_generator_iterates_over_data_once(self):
        parser = PageParser(table_parser=None)
        parser._data = iter([{'name': 'irrelevant', 'coordinates': 'irrelevant', 'tasks': {}}])
        generator = parser._generator()
        actual = list(generator)
        self.assertEqual([Stage(name='irrelevant', coordinates='irrelevant', tasks={})], actual)


class TestTableParser(unittest.TestCase):
    @patch('caspr.geocachingdotcom.html')
    def test_parse_calls_html_xpath(self, html_mock):
        table_parser = TableParser()
        table_parser.parse(input='irrelevant')
        self.assertTrue(html_mock.parse.called)
        html_mock.parse.assert_called_with(filename_or_url='irrelevant')

    @patch('caspr.geocachingdotcom.html')
    def test_no_iteration_if_data_empty(self, html_mock):
        dom_mock = MagicMock()
        dom_mock.xpath = MagicMock(return_value=[])
        html_mock.parse = MagicMock(return_value=dom_mock)
        parser = TableParser()
        name, stages = parser.parse('')
        self.assertEqual(len(list(stages)), 0)

    @patch('caspr.geocachingdotcom.CoordinateFilter')
    def test_generator_calls_filter(self, coordinate_filter_mock):
        table_parser = TableParser()
        table_parser._names = ['irrelevant']
        table_parser._coordinates = ['irrelevant']
        generator = table_parser._generator()
        list(generator)
        coordinate_filter_mock.filter.assert_called_with('irrelevant')

    def test_parse_sets_raw_coordinates_of_sample_file(self):
        path = os.path.join(os.path.dirname(__file__), _SAMPLE_TABLE_PATH)
        table_parser = TableParser()
        table_parser.parse(input=path)
        self.assertEqual(table_parser._names,
                         ['\n                Stage 1: Schwanenplatz (Virtuelle Station)\n            ',
                          '\n                Stage 2: Pavillion (Virtuelle Station)\n            ',
                          '\n                Stage 3: Restaurant (Virtuelle Station)\n            ',
                          '\n                Stage 4: Palace (Virtuelle Station)\n            ',
                          '\n                Stage 5: Park (Virtuelle Station)\n            ',
                          '\n                Stage 6: Abkühlung (Virtuelle Station)\n            ',
                          '\n                Stage 7: Dichter und Patriot (Virtuelle Station)\n            ',
                          '\n                Stage 8: Guisan (Virtuelle Station)\n            '])
        self.assertEqual(table_parser._coordinates,
                         ['\n                N 47° 03.204 E 008° 18.557\xa0\n                \n            ',
                          '\n                ???\xa0\n                \n            ',
                          '\n                ???\xa0\n                \n            ',
                          '\n                ???\xa0\n                \n            ',
                          '\n                ???\xa0\n                \n            ',
                          '\n                ???\xa0\n                \n            ',
                          '\n                ???\xa0\n                \n            ',
                          '\n                ???\xa0\n                \n            '])


if __name__ == "__main__":
    unittest.main()

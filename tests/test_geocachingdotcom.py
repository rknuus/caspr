#!/usr/bin/env python
# -*- coding: utf-8 -*-

from unittest.mock import MagicMock, patch
from urllib.parse import quote_plus
import os
import unittest
import responses

from caspr.casprexception import CasprException
from caspr.geocachingdotcom import GeocachingSite, PageParser, TableParser


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


class TestParser(unittest.TestCase):
    @unittest.skip('TEMPORARILY')
    def test_get_coordinates(self):
        path = os.path.join(os.path.dirname(__file__), _SAMPLE_TABLE_PATH)
        table_parser = TableParser()
        parser = GoogleSheet(table_parser)
        with open(path) as file:
            stages = parser.parse(file.read())

        self.assertEqual(stages._coordinates(), ['N 47° 03.204 E 008° 18.557', '', '', '', '', '', '', ''])

    def test_no_iteration_if_data_empty(self):
        data_mock = MagicMock()
        data_mock.__iter__.side_effect = []
        parser = PageParser(data_mock)
        stages = parser.parse('')
        entered = False
        for stage in stages:
            entered = True
            break
        self.assertFalse(entered)

    def test_iterate_once_if_single_data(self):
        stage_mock = MagicMock()
        stage_mock.coordinates.side_effect = ['1']
        data_mock = MagicMock()
        data_mock.__iter__.return_value = iter([stage_mock])
        parser = PageParser(None)
        parser._data = data_mock  # set _data directly instead of calling parse(), which is a bit cheesy
        stages = parser._generator()
        li = list(stages)
        self.assertEqual(len(li), 1)


class Anything:
    def __eq__(self, other):
        return True


class TestTableParser(unittest.TestCase):
    @patch('caspr.geocachingdotcom.etree')
    def test_no_iteration_if_data_empty(self, etree_mock):
        dom_mock = MagicMock()
        expected_coordinates = []
        dom_mock.xpath = MagicMock(return_value=expected_coordinates)
        etree_mock.parse = MagicMock(return_value=dom_mock)
        parser = TableParser()
        stages = parser.parse('')
        entered = False
        for stage in stages:
            entered = True
            break
        self.assertFalse(entered)

    @patch('caspr.geocachingdotcom.etree')
    def test_single_iteration(self, etree_mock):
        dom_mock = MagicMock()
        expected_coordinates = ['\n                N 47° 03.204 E 008° 18.557\xa0\n\n            ']
        dom_mock.xpath = MagicMock(return_value=expected_coordinates)
        etree_mock.parse = MagicMock(return_value=dom_mock)
        table_parser = TableParser()
        coordinates = table_parser.parse('<html></html>')
        self.assertTrue(etree_mock.parse.called)
        etree_mock.parse.assert_called_with(source='<html></html>', parser=Anything())
        self.assertEqual(list(coordinates), expected_coordinates)

    def test_get_coordinates(self):
        path = os.path.join(os.path.dirname(__file__), _SAMPLE_TABLE_PATH)
        table_parser = TableParser()
        table_parser.parse(path)
        self.assertEqual(table_parser._coordinates,
                         ['\n                N 47° 03.204 E 008° 18.557\xa0\n\n            ',
                          '\n                ???\xa0\n\n            ', '\n                ???\xa0\n\n            ',
                          '\n                ???\xa0\n\n            ', '\n                ???\xa0\n\n            ',
                          '\n                ???\xa0\n\n            ', '\n                ???\xa0\n\n            ',
                          '\n                ???\xa0\n\n            '])


if __name__ == "__main__":
    unittest.main()

#!/usr/bin/env python
# -*- coding: utf-8 -*-

from unittest.mock import MagicMock, patch
from urllib.parse import quote_plus
import os
import unittest
import responses

from caspr.casprexception import CasprException
from caspr.geocachingdotcom import GeocachingSite, DescriptionParser, PageParser, TableParser
from caspr.stage import Stage, Task

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
        parser = PageParser(table_parser=table_parser_mock, description_parser=None)
        parser.parse(page='irrelevant')
        self.assertTrue(table_parser_mock.parse.called)

    # TODO(KNR): add test that description parser is called

    def test_no_iteration_if_data_empty(self):
        parser = PageParser(table_parser=None, description_parser=None)
        parser._data = iter([])
        generator = parser._generator()
        actual = list(generator)
        self.assertEqual([], actual)

    def test_generator_iterates_over_data_once(self):
        parser = PageParser(table_parser=None, description_parser=MagicMock())
        parser._data = iter(
            [{'name': 'irrelevant',
              'coordinates': 'irrelevant',
              'description': 'irrelevant',
              'tasks': {}}])
        generator = parser._generator()
        actual = list(generator)
        self.assertEqual([Stage(name='irrelevant',
                                coordinates='irrelevant',
                                description='irrelevant',
                                tasks=[])], actual)


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
        table_parser._descriptions = ['irrelevant']
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
        self.assertEqual(table_parser._descriptions, [
            '\n                Halte nach einem grossen Schriftzug mit einer Krone Ausschau.\nA = wieviele Zacken hat die Krone?\nBCDEF = wandle den Namen nach dem System A=1, B=2... um\nLook out for a big lettering with a crown.\nA = amount of spikes of the crown\nBCDEF = transform the name according to the system A=1, B=2...\n__________________________________________\nRechne / \ncalculate:\nN 47° [ B - C ].[ B x F - E x F - 3 x C ]\nE 008° [ B ].[ F x ( B + D + 2 ) + B + 2 ]\n            ',
            '\n                G = zähle die Anzahl \ngrüner\n Laternen?\nH = auf wie vielen Füssen stehen die beiden Springbrunnen insgesamt (Mittelsockel nicht mit gezählt)?\nG = number of \ngreen\n lamps?\nH = total amount of legs the two fountains are standing on (middle part not counted)?\n_____________________________________________\nRechne / \ncalculate:\nN 47° [ B - G ].[ 2 x G x H + 2 x G + 8 ]\nE 008° [ B ].[ GH x E - 4 + 100 ]\n            ',
            '\n                IJKL = Name des Restaurants\nIJKL = name of the restaurant\n_____________________________________________\nRechne / \ncalculate:\nN 47° [ J - A ].[ 4 + 2 x G x 10 ]\nE 008° [ IJ + L ].[  IKL - A x E ]\n            ',
            '\n                Du findest hier ein Schild von ca. 15x20cm Grösse mit mehreren Zahlen drauf (unten rechts steht "HD").\nOL/R=oben links/rechts | UL=unten links | MI=Mitte\nPeile:\n[OL]+[2xUL]+[UL nach Punkt] °\n[OR]-[2xOL]-[2xMI] m\n___________\nHere you\'ll find a marker of about 15x20cm with several numbers on it (bottom right stands "HD").\nTL/R=top left/right | BL=bottom left | MI=middle\nuse bearing function:\n[TL]+[2xBL]+[BL after dec. sep.] °\n[TR]-[2xTL]-[2xMI] m\n\n            ',
            '\n                M = wie viele Personen und Tiere werden hier insgesamt ausgestellt?\nN = wie viele Füsse dieser Personen und Tiere kannst du erkennen?\nM = how many men and animals are here displayed in total?\nN = how many feet of this men and animals can you see?\n_____________________________________________\nRechne / \ncalculate:\nN 47° [ C / E ].[ F x ( J + L + I ) - I ]\nE 008° [ F - A ].[ N x F + B x D - L ]\n            ',
            '\n                O = Anzahl Stufen, die ins Wasser führen\nP = Anzahl dreiflammige Laternen, die du von hier aus sehen kannst\nO = number of steps going into the water\nP = number of three arm lamps you can see from this spot\n_____________________________________________\nRechne / \ncalculate:\nN 47° [ O - L ].[ N x B + O + P ]\nE 008° [ D + K ].[ G x M x H + 2 x F + O + I ]\n            ',
            '\n                Q = Alter des Dichters und Patrioten\nR = Anzahl der Buchstaben seines Vor- und Nachnamens\nQ = age of this poet and patriot\nR = amount of letters in his first and family name\n_____________________________________________\nRechne / \ncalculate:\nN 47° [ P - I ].[ 3 x Q + N + R ]\nE 008° [ LR ].[ Q x LO + N ]\n            ',
            '\n                S = Todes- minus Geburtsjahr\nT = Anzahl Buchstaben "E" auf der Tafel\nS = year of his death minus year of his birth\nT = total amount of letters "E" on the memorial\n_____________________________________________\nRechne für den Final / \ncalculate for the final:\nN 47° [ 2 x L + I ].[ H x ( 2 x T + L ) + Q + K - 212 ]\nE 008° [ T + K + 1 ].[ S x R + DR - 813 ]\n            '
        ])


class TestDescriptionParser(unittest.TestCase):
    def test_no_iteration_if_data_empty(self):
        parser = DescriptionParser()
        tasks = parser.parse('')
        self.assertEqual(len(list(tasks)), 0)

    def test_no_variable_definition_returns_empty_tasks(self):
        parser = DescriptionParser()
        tasks = parser.parse('foo bar baz')
        self.assertEqual(len(list(tasks)), 0)

    def test_one_task(self):
        expected = [Task(description='foo bar baz', variables='A')]
        parser = DescriptionParser()
        actual = parser.parse('A = foo bar baz')
        self.assertEqual(expected, list(actual))

    def test_two_tasks(self):
        expected = [Task(description='foo bar baz', variables='A'), Task(description='nope', variables='Z')]
        parser = DescriptionParser()
        actual = parser.parse('A = foo bar baz\nZ = nope')
        self.assertEqual(expected, list(actual))

    def test_task_with_preface(self):
        expected = [Task(description='foo bar baz', variables='A')]
        parser = DescriptionParser()
        actual = parser.parse('irrelevant\nA = foo bar baz')
        self.assertEqual(expected, list(actual))

    def test_task_with_multiple_variables(self):
        expected = [Task(description='foo bar baz', variables='ABCDEF')]
        parser = DescriptionParser()
        actual = parser.parse('ABCDEF = foo bar baz')
        self.assertEqual(expected, list(actual))

    def test_task_with_same_variable_repeated(self):
        expected = [Task(description='irrelevant', variables='A'), Task(description='tant pis', variables='A')]
        parser = DescriptionParser()
        actual = parser.parse('A = irrelevant\nA = tant pis')
        self.assertEqual(expected, list(actual))

    def test_task_with_two_variables_on_same_line(self):
        expected = [Task(description='irrelevant,', variables='A'), Task(description='tant pis', variables='A')]
        parser = DescriptionParser()
        actual = parser.parse('A = irrelevant, A = tant pis')
        self.assertEqual(expected, list(actual))


if __name__ == "__main__":
    unittest.main()

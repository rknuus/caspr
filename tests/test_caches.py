#!/usr/bin/env python
# -*- coding: utf-8 -*-

from unittest.mock import call, MagicMock, patch
import unittest

from caspr.caches import Caches
from caspr.googledotcom import WorksheetFactory
from caspr.stage import Stage, Task


class WorksheetFactoryFake(WorksheetFactory):
    def __init__(self):
        self._credentials = MagicMock()
        self._http = MagicMock()
        self._service = MagicMock()
        self._spreadsheets = MagicMock()


class TestCaches(unittest.TestCase):
    # TODO(KNR): duplicate with test_googledotcom
    _SAMPLE_ADDRESSES = dict(zip(map(chr, range(ord('A'), ord('Z') + 1)), range(1, 27)))

    @patch('caspr.geocachingdotcom.GeocachingSite')
    @patch('caspr.geocachingdotcom.PageParser')  # TODO(KNR): replace by factory
    @patch('caspr.googledotcom.WorksheetFactory')
    @patch('caspr.caches.Caches._publish')
    def test_prepares_a_cache(self, publish_mock, factory_mock, parser_mock, site_mock):
        code = 'ABCDEF'
        name = 'foo'
        site_mock.fetch = MagicMock(return_value='<html></html>')
        stages_mock = MagicMock()
        parser_mock.parse = MagicMock(return_value={'name': name, 'stages': stages_mock})

        caches = Caches(site=site_mock, parser=parser_mock, factory=factory_mock)
        caches.prepare([code])

        self.assertTrue(site_mock.fetch.called)
        self.assertEqual(site_mock.mock_calls, [call.fetch(code=code)])

        self.assertTrue(parser_mock.parse.called)
        self.assertIn(call.parse(page=site_mock.fetch.return_value), parser_mock.mock_calls)

        self.assertTrue(publish_mock.called)
        self.assertEqual(publish_mock.mock_calls, [call.publish_mock(name=name,
                                                                     stages=stages_mock,
                                                                     factory=factory_mock)])

    def test_generate_creates_new_sheet_if_not_exists(self):
        factory = WorksheetFactoryFake()
        factory._get_sheet = MagicMock(return_value=None)
        factory._create_new_sheet = MagicMock(return_value=MagicMock())
        Caches._publish(name='irrelevant', stages=[], factory=factory)
        self.assertTrue(factory._create_new_sheet.called)

    def test_generate_does_not_create_new_sheet_if_exists(self):
        factory = WorksheetFactoryFake()
        factory._get_sheet = MagicMock(return_value=MagicMock())
        factory._create_new_sheet = MagicMock(return_value=None)
        Caches._publish(name='irrelevant', stages=[], factory=factory)
        self.assertFalse(factory._create_new_sheet.called)

    def test_generate_fills_in_a_stage_without_tasks(self):
        worksheet_mock = MagicMock()
        factory = WorksheetFactoryFake()
        factory.create = MagicMock(return_value=worksheet_mock)
        Caches._publish(name='irrelevant',
                        stages=[Stage(name='name',
                                      coordinates='coordinates',
                                      description='stage description',
                                      tasks=[])],
                        factory=factory)
        self.assertIn(call.update_cell(row=1, col=1, val='name'), worksheet_mock.mock_calls)
        self.assertIn(call.update_cell(row=1, col=2, val='coordinates'), worksheet_mock.mock_calls)
        self.assertIn(call.update_cell(row=2, col=1, val='stage description'), worksheet_mock.mock_calls)

    def test_generate_fills_in_two_stages_without_tasks(self):
        worksheet_mock = MagicMock()
        factory = WorksheetFactoryFake()
        factory.create = MagicMock(return_value=worksheet_mock)
        Caches._publish(name='irrelevant',
                        stages=[Stage(name='n1',
                                      coordinates='c1',
                                      description='sd1',
                                      tasks=[]), Stage(name='n2',
                                                       coordinates='c2',
                                                       description='sd2',
                                                       tasks=[])],
                        factory=factory)
        self.assertIn(call.update_cell(row=1, col=1, val='n1'), worksheet_mock.mock_calls)
        self.assertIn(call.update_cell(row=1, col=2, val='c1'), worksheet_mock.mock_calls)
        self.assertIn(call.update_cell(row=2, col=1, val='sd1'), worksheet_mock.mock_calls)
        self.assertIn(call.update_cell(row=3, col=1, val='n2'), worksheet_mock.mock_calls)
        self.assertIn(call.update_cell(row=3, col=2, val='c2'), worksheet_mock.mock_calls)
        self.assertIn(call.update_cell(row=4, col=1, val='sd2'), worksheet_mock.mock_calls)

    def test_generate_fills_in_a_stage_with_single_task(self):
        worksheet_mock = MagicMock()
        factory = WorksheetFactoryFake()
        factory.create = MagicMock(return_value=worksheet_mock)
        Caches._publish(name='irrelevant',
                        stages=[Stage(name='name',
                                      coordinates='coordinates',
                                      description='stage description',
                                      tasks=[Task(description='description',
                                                  variables='v')])],
                        factory=factory)
        self.assertIn(call.update_cell(row=1, col=1, val='name'), worksheet_mock.mock_calls)
        self.assertIn(call.update_cell(row=1, col=2, val='coordinates'), worksheet_mock.mock_calls)
        self.assertIn(call.update_cell(row=2, col=1, val='stage description'), worksheet_mock.mock_calls)
        self.assertIn(call.update_cell(row=3, col=1, val='description'), worksheet_mock.mock_calls)
        self.assertIn(call.update_cell(row=3, col=2, val='v'), worksheet_mock.mock_calls)

    def test_generate_fills_in_a_stage_with_two_tasks(self):
        worksheet_mock = MagicMock()
        factory = WorksheetFactoryFake()
        factory.create = MagicMock(return_value=worksheet_mock)
        Caches._publish(name='irrelevant',
                        stages=[Stage(name='name',
                                      coordinates='coordinates',
                                      description='sd',
                                      tasks=[Task(description='d1',
                                                  variables='v'), Task(description='d2',
                                                                       variables='w')])],
                        factory=factory)
        self.assertIn(call.update_cell(row=1, col=1, val='name'), worksheet_mock.mock_calls)
        self.assertIn(call.update_cell(row=1, col=2, val='coordinates'), worksheet_mock.mock_calls)
        self.assertIn(call.update_cell(row=2, col=1, val='sd'), worksheet_mock.mock_calls)
        self.assertIn(call.update_cell(row=3, col=1, val='d1'), worksheet_mock.mock_calls)
        self.assertIn(call.update_cell(row=3, col=2, val='v'), worksheet_mock.mock_calls)
        self.assertIn(call.update_cell(row=4, col=1, val='d2'), worksheet_mock.mock_calls)
        self.assertIn(call.update_cell(row=4, col=2, val='w'), worksheet_mock.mock_calls)

    def test_generate_fills_in_two_stages_with_two_tasks(self):
        worksheet_mock = MagicMock()
        factory = WorksheetFactoryFake()
        factory.create = MagicMock(return_value=worksheet_mock)
        # from nose.tools import set_trace; set_trace()
        Caches._publish(name='irrelevant',
                        stages=[Stage(name='n1',
                                      coordinates='c1',
                                      description='sd1',
                                      tasks=[Task(description='d1',
                                                  variables='v'), Task(description='d2',
                                                                       variables='w')]),
                                Stage(name='n2',
                                      coordinates='c2',
                                      description='sd2',
                                      tasks=[Task(description='d3',
                                                  variables='y'), Task(description='d4',
                                                                       variables='z')])],
                        factory=factory)
        self.assertIn(call.update_cell(row=1, col=1, val='n1'), worksheet_mock.mock_calls)
        self.assertIn(call.update_cell(row=1, col=2, val='c1'), worksheet_mock.mock_calls)
        self.assertIn(call.update_cell(row=2, col=1, val='sd1'), worksheet_mock.mock_calls)
        self.assertIn(call.update_cell(row=3, col=1, val='d1'), worksheet_mock.mock_calls)
        self.assertIn(call.update_cell(row=3, col=2, val='v'), worksheet_mock.mock_calls)
        self.assertIn(call.update_cell(row=4, col=1, val='d2'), worksheet_mock.mock_calls)
        self.assertIn(call.update_cell(row=4, col=2, val='w'), worksheet_mock.mock_calls)
        self.assertIn(call.update_cell(row=6, col=1, val='n2'), worksheet_mock.mock_calls)
        self.assertIn(call.update_cell(row=6, col=2, val='c2'), worksheet_mock.mock_calls)
        self.assertIn(call.update_cell(row=7, col=1, val='sd2'), worksheet_mock.mock_calls)
        self.assertIn(call.update_cell(row=8, col=1, val='d3'), worksheet_mock.mock_calls)
        self.assertIn(call.update_cell(row=8, col=2, val='y'), worksheet_mock.mock_calls)
        self.assertIn(call.update_cell(row=9, col=1, val='d4'), worksheet_mock.mock_calls)
        self.assertIn(call.update_cell(row=9, col=2, val='z'), worksheet_mock.mock_calls)

    def test_generate_fills_in_a_stage_with_one_multi_variable_task(self):
        worksheet_mock = MagicMock()
        factory = WorksheetFactoryFake()
        factory.create = MagicMock(return_value=worksheet_mock)
        Caches._publish(name='irrelevant',
                        stages=[Stage(name='name',
                                      coordinates='coordinates',
                                      description='stage description',
                                      tasks=[Task(description='description',
                                                  variables='vw')])],
                        factory=factory)
        self.assertIn(call.update_cell(row=1, col=1, val='name'), worksheet_mock.mock_calls)
        self.assertIn(call.update_cell(row=1, col=2, val='coordinates'), worksheet_mock.mock_calls)
        self.assertIn(call.update_cell(row=2, col=1, val='stage description'), worksheet_mock.mock_calls)
        self.assertIn(call.update_cell(row=3, col=1, val='description'), worksheet_mock.mock_calls)
        self.assertIn(call.update_cell(row=3, col=2, val='v'), worksheet_mock.mock_calls)
        self.assertIn(call.update_cell(row=4, col=2, val='w'), worksheet_mock.mock_calls)

    def test_generate_fills_in_complex_stages(self):
        worksheet_mock = MagicMock()
        factory = WorksheetFactoryFake()
        factory.create = MagicMock(return_value=worksheet_mock)
        Caches._publish(name='irrelevant',
                        stages=[Stage(name='n1',
                                      coordinates='c1',
                                      description='sd1',
                                      tasks=[Task(description='d1',
                                                  variables='abc'), Task(description='d2',
                                                                         variables='d')]),
                                Stage(name='n2',
                                      coordinates='c2',
                                      description='sd2',
                                      tasks=[Task(description='d3',
                                                  variables='e'), Task(description='d4',
                                                                       variables='fghi')])],
                        factory=factory)
        self.assertIn(call.update_cell(row=1, col=1, val='n1'), worksheet_mock.mock_calls)
        self.assertIn(call.update_cell(row=1, col=2, val='c1'), worksheet_mock.mock_calls)
        self.assertIn(call.update_cell(row=2, col=1, val='sd1'), worksheet_mock.mock_calls)
        self.assertIn(call.update_cell(row=3, col=1, val='d1'), worksheet_mock.mock_calls)
        self.assertIn(call.update_cell(row=3, col=2, val='a'), worksheet_mock.mock_calls)
        self.assertIn(call.update_cell(row=4, col=2, val='b'), worksheet_mock.mock_calls)
        self.assertIn(call.update_cell(row=5, col=2, val='c'), worksheet_mock.mock_calls)
        self.assertIn(call.update_cell(row=6, col=1, val='d2'), worksheet_mock.mock_calls)
        self.assertIn(call.update_cell(row=6, col=2, val='d'), worksheet_mock.mock_calls)

        self.assertIn(call.update_cell(row=8, col=1, val='n2'), worksheet_mock.mock_calls)
        self.assertIn(call.update_cell(row=8, col=2, val='c2'), worksheet_mock.mock_calls)
        self.assertIn(call.update_cell(row=9, col=1, val='sd2'), worksheet_mock.mock_calls)
        self.assertIn(call.update_cell(row=10, col=1, val='d3'), worksheet_mock.mock_calls)
        self.assertIn(call.update_cell(row=10, col=2, val='e'), worksheet_mock.mock_calls)
        self.assertIn(call.update_cell(row=11, col=1, val='d4'), worksheet_mock.mock_calls)
        self.assertIn(call.update_cell(row=11, col=2, val='f'), worksheet_mock.mock_calls)
        self.assertIn(call.update_cell(row=12, col=2, val='g'), worksheet_mock.mock_calls)
        self.assertIn(call.update_cell(row=13, col=2, val='h'), worksheet_mock.mock_calls)
        self.assertIn(call.update_cell(row=14, col=2, val='i'), worksheet_mock.mock_calls)

    def test_merge_duplicate_variables_per_stage(self):
        worksheet_mock = MagicMock()
        factory = WorksheetFactoryFake()
        factory.create = MagicMock(return_value=worksheet_mock)
        Caches._publish(name='irrelevant',
                        stages=[Stage(name='irrelevant',
                                      coordinates='irrelevant',
                                      description='irrelevant',
                                      tasks=[Task(description='d1',
                                                  variables='abc'), Task(description='d2',
                                                                         variables='abc')])],
                        factory=factory)
        self.assertIn(call.update_cell(row=3, col=1, val='d1\nd2'), worksheet_mock.mock_calls)
        self.assertIn(call.update_cell(row=3, col=2, val='a'), worksheet_mock.mock_calls)
        self.assertIn(call.update_cell(row=4, col=2, val='b'), worksheet_mock.mock_calls)
        self.assertIn(call.update_cell(row=5, col=2, val='c'), worksheet_mock.mock_calls)
        self.assertNotIn(call.update_cell(row=6, col=1, val='d2'), worksheet_mock.mock_calls)
        self.assertNotIn(call.update_cell(row=6, col=2, val='a'), worksheet_mock.mock_calls)

    def test_resolve_simple_dynamic_dimension(self):
        expected = ['="N"&" "&47&"° "&( C2 - C3 )&"."&( C2 * C6 - C5 * C6 - 3 * C3 )']
        actual = Caches._generate_formula(
            description='N 47° [ B - C ].[ B x F - E x F - 3 x C ]',
            variable_addresses=TestCaches._SAMPLE_ADDRESSES)
        self.assertEqual(list(actual), expected)

    def test_resolve_dynamic_dimensions_in_text(self):
        expected = ['="N"&" "&47&"° "&( C2 - C3 )&"."&( C2 * C6 - C5 * C6 - 3 * C3 )',
                    '="E"&" "&008&"° "&( C2 )&"."&( C6 * ( C2 + C4 + 2 ) + C2 + 2 )']
        actual = Caches._generate_formula(
            description='\n                Halte nach einem grossen Schriftzug mit einer Krone Ausschau.\n'
            'A = wieviele Zacken hat die Krone?\nBCDEF = wandle den Namen nach dem System A=1, '
            'B=2... um\nLook out for a big lettering with a crown.\nA = amount of spikes of the'
            ' crown\nBCDEF = transform the name according to the system A=1, B=2...\n'
            '__________________________________________\nRechne / \ncalculate:\n'
            'N 47° [ B - C ].[ B x F - E x F - 3 x C ]\n'
            'E 008° [ B ].[ F x ( B + D + 2 ) + B + 2 ]\n            ',
            variable_addresses=TestCaches._SAMPLE_ADDRESSES)
        self.assertEqual(list(actual), expected)

    def test_resolve_dynamic_coordinates(self):
        given = 'Der Schatz liegt bei N 47° PQ.RST E 008° VW.XYZ, wobei'
        expected = ['="N"&" "&47&"° "&(10*C16+1*C17)&"."&(100*C18+10*C19+1*C20) ',
                    '="E"&" "&008&"° "&(10*C22+1*C23)&"."&(100*C24+10*C25+1*C26)']
        actual = Caches._generate_formula(description=given, variable_addresses=TestCaches._SAMPLE_ADDRESSES)
        self.assertEqual(list(actual), expected)

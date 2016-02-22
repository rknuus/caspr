#!/usr/bin/env python
# -*- coding: utf-8 -*-

from unittest.mock import call, MagicMock
import gspread
import re
import unittest

from caspr.casprexception import CasprException
from caspr.googledotcom import FormulaConverter, WorksheetFactory, _generate_formula, publish
from caspr.stage import Stage, Task


class WorksheetFactoryFake(WorksheetFactory):
    def __init__(self):
        self._credentials = MagicMock()
        self._http = MagicMock()
        self._service = MagicMock()
        self._spreadsheets = MagicMock()


class Anything:
    def __eq__(self, other):
        return True


class TestFormulaConverter(unittest.TestCase):
    _SAMPLE_ADDRESSES = dict(zip(map(chr, range(ord('A'), ord('Z') + 1)), range(1, 27)))

    def test_constructor_raises_if_dictionary_empty(self):
        with self.assertRaises(CasprException):
            FormulaConverter(variable_addresses={})

    def test_resolve_simple_formula(self):
        expected = 'C0 + C1'
        converter = FormulaConverter(variable_addresses={'A': 0, 'B': 1})
        actual = converter._resolve_formula(text='A + B')
        self.assertEqual(actual, expected)

    def test_resolve_reference_of_unknown_variable(self):
        expected = 'A'
        converter = FormulaConverter(variable_addresses={'B': 0})
        actual = converter._resolve_formula(text='A')
        self.assertEqual(actual, expected)

    def test_resolve_basic_math_operations(self):
        expected = 'C0 + C1 - C2 * C3 / C4'
        converter = FormulaConverter(variable_addresses={'A': 0, 'B': 1, 'C': 2, 'D': 3, 'E': 4})
        actual = converter._resolve_formula(text='A + B - C * D / E', )
        self.assertEqual(actual, expected)

    def test_resolve_casual_math_operations_without_variable_conflict(self):
        expected = 'A * B / C'
        converter = FormulaConverter(variable_addresses={'A': 0, 'B': 1, 'C': 2})
        actual = converter._normalize(text='A x B / C')
        self.assertEqual(actual, expected)

    # not possible as long as variables are only upper case and x (casual *) is only lower case.
    # def test_casual_math_operations_with_variable_conflict(self):
    #     expected = 'TBD'
    #     converter = FormulaConverter(variable_addresses={'A': 0, 'B': 1, 'x': 2})
    #     actual = converter._resolve_formula(text='A x B')
    #     self.assertEqual(actual, expected)

    def test_resolve_normalization_of_braces(self):
        expected = '()'
        converter = FormulaConverter(variable_addresses={'A': 0})
        for text in ['()', '{}', '[]']:
            actual = converter._normalize(text=text)
            self.assertEqual(actual, expected)

    def test_resolve_dual_digit_variable(self):
        expected = '(10*C0+1*C1)'
        converter = FormulaConverter(variable_addresses={'A': 0, 'B': 1})
        actual = converter._resolve_formula(text='AB')
        self.assertEqual(actual, expected)

    def test_matching_formulae(self):
        given_formulae = [  # arbitrarily taken from GC2A62B
            '[ B ]', '[ LR ]', '[ B - C ]', '[ B - G ]', '[ J - A ]', '[ C / E ]', '[ F - A ]', '[ O - L ]',
            '[ D + K ]', '[ P - I ]', '[ IJ + L ]', '[ 2 x L + I ]', '[ T + K + 1 ]', '[ Q x LO + N ]',
            '[  IKL - A x E ]', '[ N x B + O + P ]', '[ 3 x Q + N + R ]', '[ 4 + 2 x G x 10 ]', '[ GH x E - 4 + 100 ]',
            '[ S x R + DR - 813 ]', '[ N x F + B x D - L ]', '[ B x F - E x F - 3 x C ]', '[ 2 x G x H + 2 x G + 8 ]',
            '[ F x ( J + L + I ) - I ]', '[ F x ( B + D + 2 ) + B + 2 ]', '[ G x M x H + 2 x F + O + I ]',
            '[ H x ( 2 x T + L ) + Q + K - 212 ]'
        ]
        formula = FormulaConverter._FORMULA.format(ws=FormulaConverter._WS,
                                                   braces=FormulaConverter._BRACES,
                                                   math_ops=FormulaConverter._MATH_OPS,
                                                   casual_math_ops=FormulaConverter._CASUAL_MATH_OPS,
                                                   variables='[ABCDEFGHIJKLMNOPQRST]')
        for given in given_formulae:
            self.assertTrue(re.match(formula, given), 'formula {0} not recognized'.format(given))

    def test_matching_dynamic_dimension(self):
        given_coordinates = [  # arbitrarily taken from GC2A62B
            '|N| 47° [ B - C ].[ B x F - E x F - 3 x C ]', '|E| 008° [ B ].[ F x ( B + D + 2 ) + B + 2 ]',
            '|N| 47° [ B - G ].[ 2 x G x H + 2 x G + 8 ]', '|E| 008° [ B ].[ GH x E - 4 + 100 ]',
            '|N| 47° [ J - A ].[ 4 + 2 x G x 10 ]', '|E| 008° [ IJ + L ].[  IKL - A x E ]',
            '|N| 47° [ C / E ].[ F x ( J + L + I ) - I ]', '|E| 008° [ F - A ].[ N x F + B x D - L ]',
            '|N| 47° [ O - L ].[ N x B + O + P ]', '|E| 008° [ D + K ].[ G x M x H + 2 x F + O + I ]',
            '|N| 47° [ P - I ].[ 3 x Q + N + R ]', '|E| 008° [ LR ].[ Q x LO + N ]',
            '|N| 47° [ 2 x L + I ].[ H x ( 2 x T + L ) + Q + K - 212 ]', '|E| 008° [ T + K + 1 ].[ S x R + DR - 813 ]'
        ]
        formula = FormulaConverter._FORMULA.format(ws=FormulaConverter._WS,
                                                   braces=FormulaConverter._BRACES,
                                                   math_ops=FormulaConverter._MATH_OPS,
                                                   casual_math_ops=FormulaConverter._CASUAL_MATH_OPS,
                                                   variables='[ABCDEFGHIJKLMNOPQRST]')
        dynamic_coordinates = FormulaConverter._DYNAMIC_DIMENSION.format(
            ws=FormulaConverter._WS,
            orientation=FormulaConverter._ORIENTATION,
            formula=formula,
            degree=FormulaConverter._DEGREE,
            separator=FormulaConverter._DECIMAL_SEPARATOR)
        for given in given_coordinates:
            self.assertTrue(re.match(dynamic_coordinates, given),
                            'dynamic coordinates {0} not recognized'.format(given))

    def test_resolve_simple_dynamic_dimension(self):
        expected = ['="N"&" "&47&"° "&( C2 - C3 )&"."&( C2 * C6 - C5 * C6 - 3 * C3 )']
        actual = _generate_formula(
            description='N 47° [ B - C ].[ B x F - E x F - 3 x C ]',
            variable_addresses=TestFormulaConverter._SAMPLE_ADDRESSES)
        self.assertEqual(list(actual), expected)

    def test_resolve_dynamic_dimensions_in_text(self):
        expected = ['="N"&" "&47&"° "&( C2 - C3 )&"."&( C2 * C6 - C5 * C6 - 3 * C3 )',
                    '="E"&" "&008&"° "&( C2 )&"."&( C6 * ( C2 + C4 + 2 ) + C2 + 2 )']
        actual = _generate_formula(
            description='\n                Halte nach einem grossen Schriftzug mit einer Krone Ausschau.\n'
            'A = wieviele Zacken hat die Krone?\nBCDEF = wandle den Namen nach dem System A=1, '
            'B=2... um\nLook out for a big lettering with a crown.\nA = amount of spikes of the'
            ' crown\nBCDEF = transform the name according to the system A=1, B=2...\n'
            '__________________________________________\nRechne / \ncalculate:\n'
            'N 47° [ B - C ].[ B x F - E x F - 3 x C ]\n'
            'E 008° [ B ].[ F x ( B + D + 2 ) + B + 2 ]\n            ',
            variable_addresses=TestFormulaConverter._SAMPLE_ADDRESSES)
        self.assertEqual(list(actual), expected)

    def test_resolve_dynamic_coordinates(self):
        given = 'Der Schatz liegt bei N 47° PQ.RST E 008° VW.XYZ, wobei'
        expected = ['="N"&" "&47&"° "&(10*C16+1*C17)&"."&(100*C18+10*C19+1*C20) ',
                    '="E"&" "&008&"° "&(10*C22+1*C23)&"."&(100*C24+10*C25+1*C26)']
        actual = _generate_formula(description=given, variable_addresses=TestFormulaConverter._SAMPLE_ADDRESSES)
        self.assertEqual(list(actual), expected)

    def test_match_static_coordinates(self):
        expected = []
        converter = FormulaConverter(variable_addresses=TestFormulaConverter._SAMPLE_ADDRESSES)
        actual = converter.extract_formulae('N 47° 30.847')
        self.assertEqual(list(actual), expected)

    def test_mask_doesnt_alter_if_no_match(self):
        given = expected = 'Der Schatz liegt bei N 47 PQ.RST E 008 VW.XYZ, wobei'  # no match because missing °
        converter = FormulaConverter(variable_addresses=TestFormulaConverter._SAMPLE_ADDRESSES)
        actual = converter._mask_orientation(given)
        self.assertEqual(actual, expected)

    def test_mask_alters_single_dimension_match(self):
        given = 'Der Schatz liegt bei N 47° PQ.RST, wobei'
        expected = 'Der Schatz liegt bei |N| 47° PQ.RST, wobei'
        converter = FormulaConverter(variable_addresses=TestFormulaConverter._SAMPLE_ADDRESSES)
        actual = converter._mask_orientation(given)
        self.assertEqual(actual, expected)

    def test_mask_alters_double_dimension_match(self):
        given = 'Der Schatz liegt bei N 47° PQ.ABC E 008° VW.XYZ, wobei'
        expected = 'Der Schatz liegt bei |N| 47° PQ.ABC |E| 008° VW.XYZ, wobei'
        converter = FormulaConverter(variable_addresses=TestFormulaConverter._SAMPLE_ADDRESSES)
        actual = converter._mask_orientation(given)
        self.assertEqual(actual, expected)

    def test_mask_ignores_variables_in_longitude_orientation(self):
        given = 'Der Schatz liegt bei N 47° PQ.RST E 008° VW.XYZ, wobei'
        expected = 'Der Schatz liegt bei |N| 47° PQ.RST |E| 008° VW.XYZ, wobei'
        converter = FormulaConverter(variable_addresses=TestFormulaConverter._SAMPLE_ADDRESSES)
        actual = converter._mask_orientation(given)
        self.assertEqual(actual, expected)

    def test_mask_screws_up_static_coordinates(self):
        given = 'Der Schatz liegt bei N 47° 12.345 E 008° 12.345, wobei'
        expected = 'Der Schatz liegt bei |N| 47° 12.345 |E| 008° 12.345, wobei'
        converter = FormulaConverter(variable_addresses=TestFormulaConverter._SAMPLE_ADDRESSES)
        actual = converter._mask_orientation(given)
        self.assertEqual(actual, expected)


class TestWorksheetFactory(unittest.TestCase):
    def test_generate_creates_new_sheet_if_not_exists(self):
        factory = WorksheetFactoryFake()
        factory._get_sheet = MagicMock(return_value=None)
        factory._create_new_sheet = MagicMock(return_value=MagicMock())
        publish(name='irrelevant', stages=[], factory=factory)
        self.assertTrue(factory._create_new_sheet.called)

    def test_generate_does_not_create_new_sheet_if_exists(self):
        factory = WorksheetFactoryFake()
        factory._get_sheet = MagicMock(return_value=MagicMock())
        factory._create_new_sheet = MagicMock(return_value=None)
        publish(name='irrelevant', stages=[], factory=factory)
        self.assertFalse(factory._create_new_sheet.called)

    def test_generate_fills_in_a_stage_without_tasks(self):
        worksheet_mock = MagicMock()
        factory = WorksheetFactoryFake()
        factory.create = MagicMock(return_value=worksheet_mock)
        publish(name='irrelevant',
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
        publish(name='irrelevant',
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
        publish(name='irrelevant',
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
        publish(name='irrelevant',
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
        publish(name='irrelevant',
                stages=[Stage(name='n1',
                              coordinates='c1',
                              description='sd1',
                              tasks=[Task(description='d1',
                                          variables='v'), Task(description='d2',
                                                               variables='w')]), Stage(name='n2',
                                                                                       coordinates='c2',
                                                                                       description='sd2',
                                                                                       tasks=[Task(description='d3',
                                                                                                   variables='y'),
                                                                                              Task(description='d4',
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
        publish(name='irrelevant',
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
        publish(name='irrelevant',
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
        publish(name='irrelevant',
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

    # TODO(KNR): test the entire authentication

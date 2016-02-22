#!/usr/bin/env python
# -*- coding: utf-8 -*-

import re
import unittest

from caspr.casprexception import CasprException
from caspr.googledotcom import FormulaConverter


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

    # TODO(KNR): test the entire authentication

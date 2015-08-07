#!/usr/bin/env python
# -*- coding: utf-8 -*-


from caspr.stages import Stage
from caspr.stages import stages
from testfixtures import compare
from unittest.mock import MagicMock
from unittest.mock import Mock
import unittest


def _expected_stages(count):
    for i in range(count):
        yield Stage(fixed_coordinates=str(i+1))


def _compare_stages(lhs, rhs):
    for left, right in zip(lhs, rhs):
        compare(left, right)


class TestStages(unittest.TestCase):
    def test_no_stages_defined(self):
        parser = Mock()
        parser.coordinates = MagicMock(return_value=[])
        self.assertEqual(tuple(stages(parser)), ())

    def test_one_stage_defined(self):
        parser = Mock()
        parser.coordinates = MagicMock(return_value=['1'])
        _compare_stages(stages(parser), _expected_stages(1))

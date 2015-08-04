#!/usr/bin/env python
# -*- coding: utf-8 -*-


from caspr.stages import Stages
from caspr.tableparser import TableParser
from collections import namedtuple
# from testfixtures import compare
from unittest.mock import MagicMock
import mock  # TODO(KNR): is this module related to unittest.mock?
import unittest


# def _compare_stage(x, y, context):
#     if x.fixed_coordinates == y.fixed_coordinates:
#         return
#     return 'stage '

def expected_generator(count):
    for i in range(count):
        stage = namedtuple("stage", ["fixed_coordinates"])
        stage.fixed_coordinates = str(i+1)
        yield stage


class TestStages(unittest.TestCase):
    def test_no_stages_defined(self):
        parser = mock.create_autospec(TableParser)
        parser.coordinates = MagicMock(return_value=[])
        stages = Stages(parser)
        with self.assertRaises(StopIteration):
            stages.__iter__().__next__()

    def test_one_stage_defined(self):
        parser = mock.create_autospec(TableParser)
        parser.coordinates = MagicMock(return_value=['1'])
        stages = Stages(parser)
        for expected_stage, actual_stage in zip(expected_generator(1), stages):
            self.assertEqual(expected_stage.fixed_coordinates, actual_stage.fixed_coordinates)

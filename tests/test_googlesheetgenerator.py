#!/usr/bin/env python
# -*- coding: utf-8 -*-


from caspr.googlesheetgenerator import generate
from caspr.tableparser import TableParser
from unittest.mock import MagicMock
# from unittest.mock import Mock
# from unittest.mock import patch
import mock
import unittest
# import StringIO


def dummy(obj):
    pass


class TestGoogleSheetGenerator(unittest.TestCase):
    # @patch('caspr.stages.stages')
    # def test_generate_calls_stages(self, stages_mock):
    def test_generate_calls_stages(self):
        # from nose.tools import set_trace; set_trace()
        parser = mock.create_autospec(TableParser)
        parser.coordinates = MagicMock(return_value="1")
        generate(parser)
        # self.assertTrue(stages_mock.stages.called)

#!/usr/bin/env python
# -*- coding: utf-8 -*-


from caspr.googledotcom import GoogleSheet
from unittest.mock import MagicMock
import unittest


class TestGoogleSheet(unittest.TestCase):
    def test_generate_calls_stages(self):
        parser_mock = MagicMock()
        stage_one_mock = MagicMock()
        stage_two_mock = MagicMock()
        parser_mock.__iter__.return_value = [stage_one_mock, stage_two_mock]
        generator = GoogleSheet()
        generator.generate(stages=parser_mock)
        self.assertTrue(stage_one_mock.coordinates.called)
        self.assertTrue(stage_two_mock.coordinates.called)

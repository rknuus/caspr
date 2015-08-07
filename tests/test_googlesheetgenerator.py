#!/usr/bin/env python
# -*- coding: utf-8 -*-


from caspr.googlesheetgenerator import GoogleSheetGenerator
from unittest.mock import patch
import unittest


class TestGoogleSheetGenerator(unittest.TestCase):
    @patch('caspr.stages.stages')
    def test_generate_calls_stages(self, stages_mock):
        generator = GoogleSheetGenerator()
        generator.generate()
        stages_mock.stages.assert_called()

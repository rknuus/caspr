#!/usr/bin/env python
# -*- coding: utf-8 -*-

import gspread
from unittest.mock import call, MagicMock
import unittest

from caspr.googledotcom import GoogleSheet
from caspr.stage import Stage, Task


class GoogleSheetFake(GoogleSheet):
    def __init__(self):
        self._credentials = MagicMock()
        self._http = MagicMock()
        self._service = MagicMock()
        self._spreadsheets = MagicMock()


class Anything:
    def __eq__(self, other):
        return True


class TestGoogleSheet(unittest.TestCase):
    def test_generate_creates_new_sheet_if_not_exists(self):
        sheet = GoogleSheetFake()
        sheet._service.files = MagicMock()
        worksheet_mock = MagicMock()
        sheet._spreadsheets.open.side_effect = [gspread.SpreadsheetNotFound, worksheet_mock]
        sheet.generate(name='GCFOO', stages=[])
        self.assertTrue(sheet._service.files.called)
        self.assertEqual(sheet._service.files.mock_calls, [
            call(), call().insert(body={'mimeType': 'application/vnd.google-apps.spreadsheet',
                                        'title': 'GCFOO'}), call().insert().execute(http=Anything())
        ])

    def test_generate_does_not_create_new_sheet_if_exists(self):
        sheet = GoogleSheetFake()
        worksheet_mock = MagicMock()
        sheet._spreadsheets.open = MagicMock(return_value=worksheet_mock)
        sheet._service.files = MagicMock()
        sheet.generate(name='irrelevant', stages=[])
        self.assertFalse(sheet._service.files.called)

    def test_generate_fills_in_a_stage_without_tasks(self):
        sheet = GoogleSheetFake()
        worksheet_mock = MagicMock()
        sheet._spreadsheets.open = MagicMock(return_value=worksheet_mock)
        sheet.generate(name='irrelevant',
                       stages=[Stage(name='name',
                                     coordinates='coordinates',
                                     description='stage description',
                                     tasks=[])])
        self.assertIn(call.sheet1.update_acell('A1', 'name'), worksheet_mock.mock_calls)
        self.assertIn(call.sheet1.update_acell('B1', 'coordinates'), worksheet_mock.mock_calls)
        self.assertIn(call.sheet1.update_acell('A2', 'stage description'), worksheet_mock.mock_calls)

    def test_generate_fills_in_two_stages_without_tasks(self):
        sheet = GoogleSheetFake()
        worksheet_mock = MagicMock()
        sheet._spreadsheets.open = MagicMock(return_value=worksheet_mock)
        sheet.generate(name='irrelevant',
                       stages=[Stage(name='n1',
                                     coordinates='c1',
                                     description='sd1',
                                     tasks=[]), Stage(name='n2',
                                                      coordinates='c2',
                                                      description='sd2',
                                                      tasks=[])])
        self.assertIn(call.sheet1.update_acell('A1', 'n1'), worksheet_mock.mock_calls)
        self.assertIn(call.sheet1.update_acell('B1', 'c1'), worksheet_mock.mock_calls)
        self.assertIn(call.sheet1.update_acell('A2', 'sd1'), worksheet_mock.mock_calls)
        self.assertIn(call.sheet1.update_acell('A3', 'n2'), worksheet_mock.mock_calls)
        self.assertIn(call.sheet1.update_acell('B3', 'c2'), worksheet_mock.mock_calls)
        self.assertIn(call.sheet1.update_acell('A4', 'sd2'), worksheet_mock.mock_calls)

    def test_generate_fills_in_a_stage_with_single_task(self):
        sheet = GoogleSheetFake()
        worksheet_mock = MagicMock()
        sheet._spreadsheets.open = MagicMock(return_value=worksheet_mock)
        sheet.generate(name='irrelevant',
                       stages=[Stage(name='name',
                                     coordinates='coordinates',
                                     description='stage description',
                                     tasks=[Task(description='description', variables='v')])])
        self.assertIn(call.sheet1.update_acell('A1', 'name'), worksheet_mock.mock_calls)
        self.assertIn(call.sheet1.update_acell('B1', 'coordinates'), worksheet_mock.mock_calls)
        self.assertIn(call.sheet1.update_acell('A2', 'stage description'), worksheet_mock.mock_calls)
        self.assertIn(call.sheet1.update_acell('A3', 'description'), worksheet_mock.mock_calls)
        self.assertIn(call.sheet1.update_acell('B3', 'v'), worksheet_mock.mock_calls)

    def test_generate_fills_in_a_stage_with_two_tasks(self):
        sheet = GoogleSheetFake()
        worksheet_mock = MagicMock()
        sheet._spreadsheets.open = MagicMock(return_value=worksheet_mock)
        sheet.generate(name='irrelevant',
                       stages=[Stage(name='name',
                                     coordinates='coordinates',
                                     description='sd',
                                     tasks=[Task(description='d1', variables='v'), Task(description='d2', variables='w')])])
        self.assertIn(call.sheet1.update_acell('A1', 'name'), worksheet_mock.mock_calls)
        self.assertIn(call.sheet1.update_acell('B1', 'coordinates'), worksheet_mock.mock_calls)
        self.assertIn(call.sheet1.update_acell('A2', 'sd'), worksheet_mock.mock_calls)
        self.assertIn(call.sheet1.update_acell('A3', 'd1'), worksheet_mock.mock_calls)
        self.assertIn(call.sheet1.update_acell('B3', 'v'), worksheet_mock.mock_calls)
        self.assertIn(call.sheet1.update_acell('A4', 'd2'), worksheet_mock.mock_calls)
        self.assertIn(call.sheet1.update_acell('B4', 'w'), worksheet_mock.mock_calls)

    def test_generate_fills_in_two_stages_with_two_tasks(self):
        sheet = GoogleSheetFake()
        worksheet_mock = MagicMock()
        sheet._spreadsheets.open = MagicMock(return_value=worksheet_mock)
        sheet.generate(name='irrelevant',
                       stages=[Stage(name='n1',
                                     coordinates='c1',
                                     description='sd1',
                                     tasks=[Task(description='d1', variables='v'), Task(description='d2', variables='w')]),
                               Stage(name='n2',
                                     coordinates='c2',
                                     description='sd2',
                                     tasks=[Task(description='d3', variables='x'), Task(description='d4', variables='y')])])
        self.assertIn(call.sheet1.update_acell('A1', 'n1'), worksheet_mock.mock_calls)
        self.assertIn(call.sheet1.update_acell('B1', 'c1'), worksheet_mock.mock_calls)
        self.assertIn(call.sheet1.update_acell('A2', 'sd1'), worksheet_mock.mock_calls)
        self.assertIn(call.sheet1.update_acell('A3', 'd1'), worksheet_mock.mock_calls)
        self.assertIn(call.sheet1.update_acell('B3', 'v'), worksheet_mock.mock_calls)
        self.assertIn(call.sheet1.update_acell('A4', 'd2'), worksheet_mock.mock_calls)
        self.assertIn(call.sheet1.update_acell('B4', 'w'), worksheet_mock.mock_calls)
        self.assertIn(call.sheet1.update_acell('A5', 'n2'), worksheet_mock.mock_calls)
        self.assertIn(call.sheet1.update_acell('B5', 'c2'), worksheet_mock.mock_calls)
        self.assertIn(call.sheet1.update_acell('A6', 'sd2'), worksheet_mock.mock_calls)
        self.assertIn(call.sheet1.update_acell('A7', 'd3'), worksheet_mock.mock_calls)
        self.assertIn(call.sheet1.update_acell('B7', 'x'), worksheet_mock.mock_calls)
        self.assertIn(call.sheet1.update_acell('A8', 'd4'), worksheet_mock.mock_calls)
        self.assertIn(call.sheet1.update_acell('B8', 'y'), worksheet_mock.mock_calls)

    def test_generate_fills_in_a_stage_with_one_multi_variable_task(self):
        sheet = GoogleSheetFake()
        worksheet_mock = MagicMock()
        sheet._spreadsheets.open = MagicMock(return_value=worksheet_mock)
        sheet.generate(name='irrelevant',
                       stages=[Stage(name='name',
                                     coordinates='coordinates',
                                     description='stage description',
                                     tasks=[Task(description='description', variables='vw')])])
        self.assertIn(call.sheet1.update_acell('A1', 'name'), worksheet_mock.mock_calls)
        self.assertIn(call.sheet1.update_acell('B1', 'coordinates'), worksheet_mock.mock_calls)
        self.assertIn(call.sheet1.update_acell('A2', 'stage description'), worksheet_mock.mock_calls)
        self.assertIn(call.sheet1.update_acell('A3', 'description'), worksheet_mock.mock_calls)
        self.assertIn(call.sheet1.update_acell('B3', 'v'), worksheet_mock.mock_calls)
        self.assertIn(call.sheet1.update_acell('B4', 'w'), worksheet_mock.mock_calls)

    def test_generate_fills_in_complex_stages(self):
        sheet = GoogleSheetFake()
        worksheet_mock = MagicMock()
        sheet._spreadsheets.open = MagicMock(return_value=worksheet_mock)
        sheet.generate(name='irrelevant',
                       stages=[Stage(name='n1',
                                     coordinates='c1',
                                     description='sd1',
                                     tasks=[Task(description='d1', variables='abc'), Task(description='d2', variables='d')]),
                               Stage(name='n2',
                                     coordinates='c2',
                                     description='sd2',
                                     tasks=[Task(description='d3', variables='e'), Task(description='d4', variables='fghi')])])
        self.assertIn(call.sheet1.update_acell('A1', 'n1'), worksheet_mock.mock_calls)
        self.assertIn(call.sheet1.update_acell('B1', 'c1'), worksheet_mock.mock_calls)
        self.assertIn(call.sheet1.update_acell('A2', 'sd1'), worksheet_mock.mock_calls)
        self.assertIn(call.sheet1.update_acell('A3', 'd1'), worksheet_mock.mock_calls)
        self.assertIn(call.sheet1.update_acell('B3', 'a'), worksheet_mock.mock_calls)
        self.assertIn(call.sheet1.update_acell('B4', 'b'), worksheet_mock.mock_calls)
        self.assertIn(call.sheet1.update_acell('B5', 'c'), worksheet_mock.mock_calls)
        self.assertIn(call.sheet1.update_acell('A6', 'd2'), worksheet_mock.mock_calls)
        self.assertIn(call.sheet1.update_acell('B6', 'd'), worksheet_mock.mock_calls)

        self.assertIn(call.sheet1.update_acell('A7', 'n2'), worksheet_mock.mock_calls)
        self.assertIn(call.sheet1.update_acell('B7', 'c2'), worksheet_mock.mock_calls)
        self.assertIn(call.sheet1.update_acell('A8', 'sd2'), worksheet_mock.mock_calls)
        self.assertIn(call.sheet1.update_acell('A9', 'd3'), worksheet_mock.mock_calls)
        self.assertIn(call.sheet1.update_acell('B9', 'e'), worksheet_mock.mock_calls)
        self.assertIn(call.sheet1.update_acell('A10', 'd4'), worksheet_mock.mock_calls)
        self.assertIn(call.sheet1.update_acell('B10', 'f'), worksheet_mock.mock_calls)
        self.assertIn(call.sheet1.update_acell('B11', 'g'), worksheet_mock.mock_calls)
        self.assertIn(call.sheet1.update_acell('B12', 'h'), worksheet_mock.mock_calls)
        self.assertIn(call.sheet1.update_acell('B13', 'i'), worksheet_mock.mock_calls)

    # TODO(KNR): test the entire authentication

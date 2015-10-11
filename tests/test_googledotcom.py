#!/usr/bin/env python
# -*- coding: utf-8 -*-

import gspread
from unittest.mock import call, MagicMock
import unittest

from caspr.googledotcom import GoogleSheet
from caspr.stage import Stage


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
        sheet.generate(name='GCFOO', stages=[])
        self.assertFalse(sheet._service.files.called)

    def test_generate_fills_in_a_stage_without_tasks(self):
        sheet = GoogleSheetFake()
        worksheet_mock = MagicMock()
        sheet._spreadsheets.open = MagicMock(return_value=worksheet_mock)
        sheet.generate(name='GCFOO', stages=[Stage(name='name', coordinates='coordinates', tasks=[])])
        self.assertEqual(worksheet_mock.mock_calls, [call.__bool__(), call.sheet1.update_acell('A1', 'name'),
                                                     call.sheet1.update_acell('B1', 'coordinates')])
        self.assertIn(call.sheet1.update_acell('A1', 'name'), worksheet_mock.mock_calls)
        self.assertIn(call.sheet1.update_acell('B1', 'coordinates'), worksheet_mock.mock_calls)

    def test_generate_fills_in_two_stages_without_tasks(self):
        sheet = GoogleSheetFake()
        worksheet_mock = MagicMock()
        sheet._spreadsheets.open = MagicMock(return_value=worksheet_mock)
        sheet.generate(name='GCFOO',
                       stages=[Stage(name='n1',
                                     coordinates='c1',
                                     tasks=[]), Stage(name='n2',
                                                      coordinates='c2',
                                                      tasks=[])])
        self.assertIn(call.sheet1.update_acell('A1', 'n1'), worksheet_mock.mock_calls)
        self.assertIn(call.sheet1.update_acell('B1', 'c1'), worksheet_mock.mock_calls)
        self.assertIn(call.sheet1.update_acell('A2', 'n2'), worksheet_mock.mock_calls)
        self.assertIn(call.sheet1.update_acell('B2', 'c2'), worksheet_mock.mock_calls)

    def test_generate_fills_in_a_stage_with_single_task(self):
        sheet = GoogleSheetFake()
        worksheet_mock = MagicMock()
        sheet._spreadsheets.open = MagicMock(return_value=worksheet_mock)
        sheet.generate(name='GCFOO',
                       stages=[Stage(name='name',
                                     coordinates='coordinates',
                                     tasks=[{'description': 'description',
                                             'variables': 'v'}])])
        self.assertIn(call.sheet1.update_acell('A1', 'name'), worksheet_mock.mock_calls)
        self.assertIn(call.sheet1.update_acell('B1', 'coordinates'), worksheet_mock.mock_calls)
        self.assertIn(call.sheet1.update_acell('A2', 'description'), worksheet_mock.mock_calls)
        self.assertIn(call.sheet1.update_acell('B2', 'v'), worksheet_mock.mock_calls)

    def test_generate_fills_in_a_stage_with_two_tasks(self):
        sheet = GoogleSheetFake()
        worksheet_mock = MagicMock()
        sheet._spreadsheets.open = MagicMock(return_value=worksheet_mock)
        sheet.generate(name='GCFOO',
                       stages=[Stage(name='name',
                                     coordinates='coordinates',
                                     tasks=[{'description': 'd1',
                                             'variables': 'v'}, {'description': 'd2',
                                                                 'variables': 'w'}])])
        self.assertIn(call.sheet1.update_acell('A1', 'name'), worksheet_mock.mock_calls)
        self.assertIn(call.sheet1.update_acell('B1', 'coordinates'), worksheet_mock.mock_calls)
        self.assertIn(call.sheet1.update_acell('A2', 'd1'), worksheet_mock.mock_calls)
        self.assertIn(call.sheet1.update_acell('B2', 'v'), worksheet_mock.mock_calls)
        self.assertIn(call.sheet1.update_acell('A3', 'd2'), worksheet_mock.mock_calls)
        self.assertIn(call.sheet1.update_acell('B3', 'w'), worksheet_mock.mock_calls)

    def test_generate_fills_in_two_stages_with_two_tasks(self):
        sheet = GoogleSheetFake()
        worksheet_mock = MagicMock()
        sheet._spreadsheets.open = MagicMock(return_value=worksheet_mock)
        sheet.generate(name='GCFOO',
                       stages=[Stage(name='n1',
                                     coordinates='c1',
                                     tasks=[{'description': 'd1',
                                             'variables': 'v'}, {'description': 'd2',
                                                                 'variables': 'w'}]),
                               Stage(name='n2',
                                     coordinates='c2',
                                     tasks=[{'description': 'd3',
                                             'variables': 'x'}, {'description': 'd4',
                                                                 'variables': 'y'}])])
        self.assertIn(call.sheet1.update_acell('A1', 'n1'), worksheet_mock.mock_calls)
        self.assertIn(call.sheet1.update_acell('B1', 'c1'), worksheet_mock.mock_calls)
        self.assertIn(call.sheet1.update_acell('A2', 'd1'), worksheet_mock.mock_calls)
        self.assertIn(call.sheet1.update_acell('B2', 'v'), worksheet_mock.mock_calls)
        self.assertIn(call.sheet1.update_acell('A3', 'd2'), worksheet_mock.mock_calls)
        self.assertIn(call.sheet1.update_acell('B3', 'w'), worksheet_mock.mock_calls)
        self.assertIn(call.sheet1.update_acell('A4', 'n2'), worksheet_mock.mock_calls)
        self.assertIn(call.sheet1.update_acell('B4', 'c2'), worksheet_mock.mock_calls)
        self.assertIn(call.sheet1.update_acell('A5', 'd3'), worksheet_mock.mock_calls)
        self.assertIn(call.sheet1.update_acell('B5', 'x'), worksheet_mock.mock_calls)
        self.assertIn(call.sheet1.update_acell('A6', 'd4'), worksheet_mock.mock_calls)
        self.assertIn(call.sheet1.update_acell('B6', 'y'), worksheet_mock.mock_calls)

    def test_generate_fills_in_a_stage_with_one_multi_variable_task(self):
        sheet = GoogleSheetFake()
        worksheet_mock = MagicMock()
        sheet._spreadsheets.open = MagicMock(return_value=worksheet_mock)
        sheet.generate(name='GCFOO',
                       stages=[Stage(name='name',
                                     coordinates='coordinates',
                                     tasks=[{'description': 'description',
                                             'variables': 'vw'}])])
        self.assertIn(call.sheet1.update_acell('A1', 'name'), worksheet_mock.mock_calls)
        self.assertIn(call.sheet1.update_acell('B1', 'coordinates'), worksheet_mock.mock_calls)
        self.assertIn(call.sheet1.update_acell('A2', 'description'), worksheet_mock.mock_calls)
        self.assertIn(call.sheet1.update_acell('B2', 'v'), worksheet_mock.mock_calls)
        self.assertIn(call.sheet1.update_acell('B3', 'w'), worksheet_mock.mock_calls)

    def test_generate_fills_in_complex_stages(self):
        sheet = GoogleSheetFake()
        worksheet_mock = MagicMock()
        sheet._spreadsheets.open = MagicMock(return_value=worksheet_mock)
        sheet.generate(name='GCFOO',
                       stages=[Stage(name='n1',
                                     coordinates='c1',
                                     tasks=[{'description': 'd1',
                                             'variables': 'abc'},
                                            {'description': 'd2',
                                             'variables': 'd'}]),
                               Stage(name='n2',
                                     coordinates='c2',
                                     tasks=[{'description': 'd3',
                                             'variables': 'e'},
                                            {'description': 'd4',
                                             'variables': 'fghi'}])])
        self.assertIn(call.sheet1.update_acell('A1', 'n1'), worksheet_mock.mock_calls)
        self.assertIn(call.sheet1.update_acell('B1', 'c1'), worksheet_mock.mock_calls)
        self.assertIn(call.sheet1.update_acell('A2', 'd1'), worksheet_mock.mock_calls)
        self.assertIn(call.sheet1.update_acell('B2', 'a'), worksheet_mock.mock_calls)
        self.assertIn(call.sheet1.update_acell('B3', 'b'), worksheet_mock.mock_calls)
        self.assertIn(call.sheet1.update_acell('B4', 'c'), worksheet_mock.mock_calls)
        self.assertIn(call.sheet1.update_acell('A5', 'd2'), worksheet_mock.mock_calls)
        self.assertIn(call.sheet1.update_acell('B5', 'd'), worksheet_mock.mock_calls)

        self.assertIn(call.sheet1.update_acell('A6', 'n2'), worksheet_mock.mock_calls)
        self.assertIn(call.sheet1.update_acell('B6', 'c2'), worksheet_mock.mock_calls)
        self.assertIn(call.sheet1.update_acell('A7', 'd3'), worksheet_mock.mock_calls)
        self.assertIn(call.sheet1.update_acell('B7', 'e'), worksheet_mock.mock_calls)
        self.assertIn(call.sheet1.update_acell('A8', 'd4'), worksheet_mock.mock_calls)
        self.assertIn(call.sheet1.update_acell('B8', 'f'), worksheet_mock.mock_calls)
        self.assertIn(call.sheet1.update_acell('B9', 'g'), worksheet_mock.mock_calls)
        self.assertIn(call.sheet1.update_acell('B10', 'h'), worksheet_mock.mock_calls)
        self.assertIn(call.sheet1.update_acell('B11', 'i'), worksheet_mock.mock_calls)

    # TODO(KNR): test the entire authentication

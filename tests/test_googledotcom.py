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
        sheet.generate(code='GCFOO', stages=[])
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
        sheet.generate(code='GCFOO', stages=[])
        self.assertFalse(sheet._service.files.called)

    def test_generate_fills_in_a_stage(self):
        sheet = GoogleSheetFake()
        worksheet_mock = MagicMock()
        sheet._spreadsheets.open = MagicMock(return_value=worksheet_mock)
        sheet.generate(code='GCFOO', stages=[Stage(name='irrelevant', coordinates='irrelevant')])
        self.assertEqual(worksheet_mock.mock_calls, [call.__bool__(), call.sheet1.update_acell('A1', 'irrelevant'),
                                                     call.sheet1.update_acell('B1', 'irrelevant')])

    # TODO(KNR): test the entire authentication

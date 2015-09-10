#!/usr/bin/env python
# -*- coding: utf-8 -*-

from unittest import mock
from unittest.mock import call, MagicMock
import unittest

from caspr.caches import Caches
from caspr.parser import PageParser
from caspr.stages import Stages


class TestCaches(unittest.TestCase):
    @mock.patch('caspr.geocachingdotcom.GeocachingSite')
    @mock.patch('caspr.parser.PageParser')
    @mock.patch('caspr.stages.Stages')
    def test_prepares_a_cache(self, stages_mock, parser_mock, site_mock):
        site_mock.fetch = MagicMock(return_value='<html></html>')
        parser_mock.parse = MagicMock(return_value=stages_mock)

        caches = Caches(site=site_mock, parser=parser_mock)
        caches.prepare(['ABCDEF'])

        self.assertTrue(site_mock.fetch.called)
        self.assertEqual(site_mock.mock_calls, [call.fetch(code='ABCDEF')])

        self.assertTrue(parser_mock.parse.called)
        self.assertEqual(parser_mock.mock_calls, [call.parse(page=site_mock.fetch.return_value)])

        self.assertTrue(stages_mock.generate_sheet.called)

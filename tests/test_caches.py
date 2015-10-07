#!/usr/bin/env python
# -*- coding: utf-8 -*-

from unittest.mock import call, MagicMock, patch
import unittest

from caspr.caches import Caches


class TestCaches(unittest.TestCase):
    @patch('caspr.geocachingdotcom.GeocachingSite')
    @patch('caspr.geocachingdotcom.PageParser')  # TODO(KNR): replace by factory
    @patch('caspr.googledotcom.GoogleSheet')
    def test_prepares_a_cache(self, generator_mock, parser_mock, site_mock):
        code = 'ABCDEF'
        site_mock.fetch = MagicMock(return_value='<html></html>')
        parser_mock.parse = MagicMock(return_value=parser_mock)

        caches = Caches(site=site_mock, parser=parser_mock, generator=generator_mock)
        caches.prepare([code])

        self.assertTrue(site_mock.fetch.called)
        self.assertEqual(site_mock.mock_calls, [call.fetch(code=code)])

        self.assertTrue(parser_mock.parse.called)
        self.assertEqual(parser_mock.mock_calls, [call.parse(page=site_mock.fetch.return_value)])

        self.assertTrue(generator_mock.generate.called)
        self.assertEqual(generator_mock.mock_calls, [call.generate(code=code, stages=parser_mock.parse.return_value)])

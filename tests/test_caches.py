#!/usr/bin/env python
# -*- coding: utf-8 -*-

from unittest.mock import call, MagicMock, patch
import unittest

from caspr.caches import Caches


class TestCaches(unittest.TestCase):
    @patch('caspr.geocachingdotcom.GeocachingSite')
    @patch('caspr.geocachingdotcom.PageParser')  # TODO(KNR): replace by factory
    @patch('caspr.googledotcom.WorksheetFactory')
    @patch('caspr.caches.publish')
    def test_prepares_a_cache(self, publish_mock, factory_mock, parser_mock, site_mock):
        code = 'ABCDEF'
        name = 'foo'
        site_mock.fetch = MagicMock(return_value='<html></html>')
        stages_mock = MagicMock()
        parser_mock.parse = MagicMock(return_value={'name': name, 'stages': stages_mock})

        caches = Caches(site=site_mock, parser=parser_mock, factory=factory_mock)
        caches.prepare([code])

        self.assertTrue(site_mock.fetch.called)
        self.assertEqual(site_mock.mock_calls, [call.fetch(code=code)])

        self.assertTrue(parser_mock.parse.called)
        self.assertIn(call.parse(page=site_mock.fetch.return_value), parser_mock.mock_calls)

        self.assertTrue(publish_mock.called)
        self.assertEqual(publish_mock.mock_calls, [call.publish_mock(name=name, stages=stages_mock, factory=factory_mock)])

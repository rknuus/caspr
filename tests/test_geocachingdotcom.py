#!/usr/bin/env python
# -*- coding: utf-8 -*-

from caspr.geocachingdotcom import GeocachingSite
from urllib.parse import quote_plus
import unittest
import responses


def _urlencode_parameter(name, value):
    return '{0}={1}'.format(quote_plus(name), quote_plus(value))


class TestCaspr(unittest.TestCase):
    def _post_contains():
        pass

    @responses.activate
    def test_prepare_session_with_correct_password(self):
        with open('tests/sample_data/login_page.html') as file:
            login_page_content = file.read()
        responses.add(responses.GET, 'https://www.geocaching.com/login/default.aspx', body=login_page_content)
        responses.add(responses.POST, 'https://www.geocaching.com/login/default.aspx')
        GeocachingSite('Jane Doe', 'password')
        # from nose.tools import set_trace; set_trace()
        self.assertEqual(len(responses.calls), 2)
        self.assertEqual(responses.calls[0].request.url, 'https://www.geocaching.com/login/default.aspx')
        self.assertEqual(responses.calls[1].request.url, 'https://www.geocaching.com/login/default.aspx')
        self.assertIn(_urlencode_parameter('ctl00$ContentBody$tbUsername', 'Jane Doe'), responses.calls[1].request.body)
        self.assertIn(_urlencode_parameter('ctl00$ContentBody$tbPassword', 'password'), responses.calls[1].request.body)

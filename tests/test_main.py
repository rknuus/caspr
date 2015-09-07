#!/usr/bin/env python
# -*- coding: utf-8 -*-


from caspr.main import _parse_args, main
from contextlib import contextmanager
from io import StringIO
from unittest.mock import MagicMock
import mock
import sys
import unittest


@contextmanager
def mock_stderr(stderr_mock):
    original_stderr = sys.stderr
    try:
        sys.stderr = stderr_mock
        yield
    finally:
        sys.stderr = original_stderr


class TestCaspr(unittest.TestCase):
    def test_parse_args_insists_on_cache_codes(self):
        stderr_mock = StringIO()
        with mock_stderr(stderr_mock):
            with self.assertRaises(SystemExit) as argparse_exception:
                _parse_args([])

        self.assertEqual(argparse_exception.exception.code, 2)
        self.assertIn("the following arguments are required: -u/--user, -p/--password, cache_codes", stderr_mock.getvalue())

    @mock.patch('caspr.main.GeocachingSite')
    def test_main_using_geocaching_site(self, site_mock):
        # site_mock.fetch = MagicMock(return_value='<html></html>')
        stdout_mock = StringIO()
        stderr_mock = StringIO()
        main("-u foo -p bar ABCDEF".split(), stdout=stdout_mock, stderr=stderr_mock)
        self.assertTrue(site_mock.called)
        self.assertEqual(site_mock.call_args, [('foo', 'bar')])
        # self.assertTrue(site_mock.fetch.called)
        # self.assertEqual(site_mock.fetch.call_args, [('ABCDEF')])
        self.assertEqual(str(site_mock.mock_calls[1]), "call().fetch('ABCDEF')")  # TODO(KNR): ugh... Why fetch.called is not properly set?

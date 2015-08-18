#!/usr/bin/env python
# -*- coding: utf-8 -*-


from caspr import caspr
from contextlib import contextmanager
from io import StringIO
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
                caspr._parse_args([])

        self.assertEqual(argparse_exception.exception.code, 2)
        self.assertIn("the following arguments are required: -u/--user, -p/--password, cache_codes", stderr_mock.getvalue())

    @mock.patch('caspr.caspr.GeocachingSite')
    def test_main_initializes_geocaching_site(self, site_mock):
        caspr.main("-u foo -p bar ABCDEF".split())
        self.assertTrue(site_mock.called)
        self.assertEqual(site_mock.call_args, [('foo', 'bar')])

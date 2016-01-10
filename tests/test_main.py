#!/usr/bin/env python
# -*- coding: utf-8 -*-


from caspr.main import _parse_args
from contextlib import contextmanager
from io import StringIO
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
                _parse_args([], {'user': '', 'password': '', 'keyfile': ''})

        self.assertEqual(argparse_exception.exception.code, 2)
        self.assertIn("the following arguments are required: -u/--user, -p/--password, -k/--keyfile, cache_codes", stderr_mock.getvalue())

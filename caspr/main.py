#!/usr/bin/env python
# -*- coding: utf-8 -*-

import argparse
import logging

from caspr.caches import Caches
from caspr.geocachingdotcom import GeocachingSite, PageParser, TableParser
from caspr.googledotcom import GoogleSheet


__author__ = "Raphael Knaus"
__copyright__ = "Raphael Knaus"
__license__ = "gpl3"
__version__ = "0.0.1"


# TODO(KNR): use logging
_logger = logging.getLogger(__name__)


def _parse_args(args):
    ''' Well... Parses the arguments.

    Supports 1..N positional parameters as a list of cache codes. '''
    parser = argparse.ArgumentParser(description="A multi-stage geocaching sheet preparation tool.",
                                     epilog="Note that you will be asked for your Google credentials later on.")
    parser.add_argument(
        '-v',
        '--version',
        action='version',
        version='%(prog)s {ver}'.format(ver=__version__))
    parser.add_argument(
        '-u',
        '--user',
        action='store',
        required=True,
        help="your geocaching account")
    parser.add_argument(
        '-p',
        '--password',
        action='store',
        required=True,
        help="your geocaching password")
    parser.add_argument('cache_codes', action='append', nargs="+",
                        help="1..N www.geocaching.com cache_codes like GC397CZ")
    return parser.parse_args(args)


def main(args, stdout, stderr):
    ''' Parses the arguments and prepares each cache. '''
    arguments = _parse_args(args)
    try:
        site = GeocachingSite(user=arguments.user, password=arguments.password)
        caches = Caches(site=site, parser=PageParser(table_parser=TableParser()), generator=GoogleSheet())
        # TODO(KNR): can I prevent argparse from returning a list of lists?
        for codes in arguments.cache_codes:
            caches.prepare(codes=codes)
    except Exception as e:
        stderr.write(''.join(['Error: ', str(e), '\n']))

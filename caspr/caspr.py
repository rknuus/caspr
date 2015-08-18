#!/usr/bin/env python
# -*- coding: utf-8 -*-


from caspr.geocachingdotcom import GeocachingSite
import argparse
import logging
import sys


__author__ = "Raphael Knaus"
__copyright__ = "Raphael Knaus"
__license__ = "gpl3"
__version__ = "0.0.1"


_logger = logging.getLogger(__name__)


def _parse_args(args):
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


def main(args):
    arguments = _parse_args(args)
    site = GeocachingSite(arguments.user, arguments.password)


def run():
    logging.basicConfig(level=logging.INFO, stream=sys.stdout)
    main(sys.argv[1:])


if __name__ == "__main__":
    run()

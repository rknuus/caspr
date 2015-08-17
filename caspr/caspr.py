#!/usr/bin/env python
# -*- coding: utf-8 -*-


from geocaching_page import fetch
from googlesheetgenerator import generate
from tableparser import TableParser
import argparse
import logging
import sys


__author__ = "Raphael Knaus"
__copyright__ = "Raphael Knaus"
__license__ = "gpl3"
__version__ = "0.0.1"


_logger = logging.getLogger(__name__)


def parse_args(args):
    parser = argparse.ArgumentParser(description="A multi-stage geocaching sheet preparation tool.")
    parser.add_argument(
        '-v',
        '--version',
        action='version',
        version='caspr {ver}'.format(ver=__version__))
    parser.add_argument('cache_codes', action='append', nargs="+",
                        help="1..N www.geocaching.com cache_codes like GC397CZ")
    return parser.parse_args(args)


def main(args):
    args = parse_args(args)
    for codes in args.cache_codes:
        for code in codes:
            page = fetch(code)
            stage_parser = TableParser(page)
            generate(stage_parser)


def run():
    logging.basicConfig(level=logging.INFO, stream=sys.stdout)
    main(sys.argv[1:])


if __name__ == "__main__":
    run()

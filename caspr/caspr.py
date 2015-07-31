#!/usr/bin/env python
# -*- coding: utf-8 -*-

import argparse
import sys
import logging

from caspr import __version__


__author__ = "Raphael Knaus"
__copyright__ = "Raphael Knaus"
__license__ = "none"

_logger = logging.getLogger(__name__)


def parse_args(args):
    """
    Parse command line parameters

    :param args: command line parameters as list of strings
    :return: command line parameters as :obj:`argparse.Namespace`
    """
    parser = argparse.ArgumentParser(
        description="Just a Hello World demonstration")
    parser.add_argument(
        '-v',
        '--version',
        action='version',
        version='caspr {ver}'.format(ver=__version__))
    return parser.parse_args(args)


def main(args):
    args = parse_args(args)
    print("Hello World!")
    _logger.info("Script ends here")


def run():
    logging.basicConfig(level=logging.INFO, stream=sys.stdout)
    main(sys.argv[1:])


if __name__ == "__main__":
    run()

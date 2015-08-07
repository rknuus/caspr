#!/usr/bin/env python
# -*- coding: utf-8 -*-


# from caspr import __version__  # TODO(KNR): use to print version when asked with --version
from caspr.googlesheetgenerator import GoogleSheetGenerator
import sys
import logging


__author__ = "Raphael Knaus"
__copyright__ = "Raphael Knaus"
__license__ = "none"

_logger = logging.getLogger(__name__)


def main(args):
    generator = GoogleSheetGenerator()
    generator.generate()


def run():
    logging.basicConfig(level=logging.INFO, stream=sys.stdout)
    main(sys.argv[1:])


if __name__ == "__main__":
    run()

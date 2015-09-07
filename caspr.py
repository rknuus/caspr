#!/usr/bin/env python
# -*- coding: utf-8 -*-

from caspr.main import main
import logging
import sys


def run():
    logging.basicConfig(level=logging.INFO, stream=sys.stdout)
    main(sys.argv[1:], sys.stdout, sys.stderr)


if __name__ == "__main__":
    run()

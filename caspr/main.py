#!/usr/bin/env python
# -*- coding: utf-8 -*-

from os import path
import argparse
import json
import logging
import os
import traceback

from caspr.caches import Caches
from caspr.geocachingdotcom import DescriptionParser, GeocachingSite, PageParser, TableParser
from caspr.googledotcom import GoogleSheet

__author__ = "Raphael Knaus"
__copyright__ = "Raphael Knaus"
__license__ = "gpl3"
__version__ = "0.0.1"

_SETTINGS = path.expanduser('~/.caspr/settings.json')

# TODO(KNR): use logging
_logger = logging.getLogger(__name__)


def _load_defaults():
    if not path.exists(_SETTINGS):
        return {'user': '', 'password': '', 'keyfile': ''}
    return json.load(open(_SETTINGS))


def _save_defaults(arguments):
    if not path.exists(path.dirname(_SETTINGS)):
        os.makedirs(path.dirname(_SETTINGS))
    json.dump({'user': arguments.user,
               'password': arguments.password,
               'keyfile': arguments.keyfile}, open(_SETTINGS, 'w'))


def _parse_args(args, defaults):
    ''' Well... Parses the arguments.

    Supports 1..N positional parameters as a list of cache codes. '''
    parser = argparse.ArgumentParser(description='A multi-stage geocaching sheet preparation tool.',
                                     epilog='Note that you will be asked for your Google credentials later on.')
    parser.add_argument('-v', '--version', action='version', version='%(prog)s {ver}'.format(ver=__version__))
    parser.add_argument('-u', '--user',
                        action='store',
                        default=defaults['user'],
                        required=not bool(defaults['user']),
                        help='your geocaching account')
    parser.add_argument('-p', '--password',
                        action='store',
                        default=defaults['password'],
                        required=not bool(defaults['password']),
                        help='your geocaching password')
    parser.add_argument('-k', '--keyfile',
                        action='store',
                        default=defaults['keyfile'],
                        required=not bool(defaults['keyfile']),
                        help='Google API key file (see README.rst)')
    parser.add_argument('cache_codes',
                        action='append',
                        nargs="+",
                        help="1..N www.geocaching.com cache codes like GC397CZ")
    return parser.parse_args(args)


def main(args, stdout, stderr):
    ''' Parses the arguments and prepares each cache. '''
    arguments = _parse_args(args, _load_defaults())
    try:
        _save_defaults(arguments)
        site = GeocachingSite(user=arguments.user, password=arguments.password)
        caches = Caches(site=site,
                        parser=PageParser(table_parser=TableParser(),
                                          description_parser=DescriptionParser()),
                        generator=GoogleSheet(keyfile=arguments.keyfile))
        # TODO(KNR): can I prevent argparse from returning a list of lists?
        for codes in arguments.cache_codes:
            caches.prepare(codes=codes)
    except Exception:
        traceback.print_exc()

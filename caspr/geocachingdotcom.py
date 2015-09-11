#!/usr/bin/env python
# -*- coding: utf-8 -*-

from io import StringIO
from lxml import etree, html
import requests

from caspr.stages import Stages
from caspr.casprexception import CasprException


class GeocachingSite:
    ''' Deals with the www.geocaching.com site. '''

    _LOGIN_FAILED_MESSAGE = ("Uh oh. Either your username or password is incorrect. Please try again. If you've "
                             "forgotten your information")

    def __init__(self, user, password):
        self._prepare_session(user, password)

    def _prepare_session(self, user, password):
        ''' Initializes an authentication session, so that following fetch() calls get the full page. '''
        login_page = requests.get('https://www.geocaching.com/login/default.aspx')
        login_root = html.fromstring(login_page.text)
        viewstate = login_root.xpath("//input[@name='__VIEWSTATE']")
        viewstategenerator = login_root.xpath("//input[@name='__VIEWSTATEGENERATOR']")
        payload = {
            '__EVENTTARGET': '',
            '__EVENTARGUMENT': '',
            viewstate[0].name: viewstate[0].value,
            viewstategenerator[0].name: viewstategenerator[0].value,
            'ctl00$ContentBody$tbUsername': user,
            'ctl00$ContentBody$tbPassword': password,
            'ctl00$ContentBody$cbRememberMe': '0',
            'ctl00$ContentBody$btnSignIn': 'Anmelden'  # TODO(KNR): localize...
        }
        session = requests.Session()
        login_result = session.post('https://www.geocaching.com/login/default.aspx', data=payload)
        if GeocachingSite._LOGIN_FAILED_MESSAGE in login_result.text:
            raise CasprException('Logging in to www.geocaching.com as {0} failed.'.format(user))
        self._session = session

    def fetch(self, code):
        ''' Returns the page text of the geocache with the given code. '''
        page = self._session.get('http://www.geocaching.com/geocache/{0}'.format(code))
        return page.text


class _TableParser:
    ''' Parses the table of a geocache page. '''

    def parse(self, input):
        '''
        input can be either a filename or an URL of the page to be parsed.
        '''
        self._root = etree.parse(input, etree.HTMLParser())

    def coordinates(self):
        # TODO(KNR): check if we have to wrap the return value with iter()
        return self._root.xpath("//table[@id='ctl00_ContentBody_Waypoints']/tbody/tr/td[position()=7]/text()")


class PageParser:
    '''
    Parses a geocache page.

    Currently just supports parsing of the cache table.

    Later on will be able to parse the text section, and even to combine the text and table results.
    '''

    def __init__(self, table_parser):
        self._table_parser = table_parser

    def parse(self, page):
        self._table_parser.parse(StringIO(page))
        return Stages()

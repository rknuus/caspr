#!/usr/bin/env python
# -*- coding: utf-8 -*-

from lxml import html
import requests
import tempfile

from caspr.casprexception import CasprException
from caspr.coordinatefilter import CoordinateFilter
from caspr.stage import Stage


class GeocachingSite:
    ''' Deals with the www.geocaching.com site. '''

    _LOGIN_FAILED_MESSAGE = ("Uh oh. Either your username or password is incorrect. Please try again. If you've "
                             "forgotten your information")

    def __init__(self, user, password):
        self._prepare_session(user, password)

    def _prepare_session(self, user, password):
        ''' Initializes an authentication session, so that following fetch() calls get the full page. '''
        login_page = requests.get('https://www.geocaching.com/login/default.aspx')
        login_root = html.fromstring(html=login_page.text)
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
        # TODO(KNR): why the heck does it not work when passing page.text to the lxml.html parser?! Probably some encoding issue
        with tempfile.NamedTemporaryFile(delete=False) as file:
            file.write(bytes(page.text, 'UTF-8'))
            return file.name


class TableParser:
    ''' Parses the table of a geocache page. '''

    def parse(self, input):
        '''
        Returns a generator to iterate over all coordinates (for now).

        input can be either a filename or an URL of the page to be parsed.
        '''
        # TODO(KNR): does defusedxml also work?
        # TODO(KNR): does etree provide iterparse()?
        root = html.parse(filename_or_url=input)
        cache_name_nodes = root.xpath("//title[position()=1]/text()")
        cache_name = cache_name_nodes[0].strip() if len(cache_name_nodes) > 0 else ''
        stage_name_nodes = root.xpath("//table[@id='ctl00_ContentBody_Waypoints']/tbody/tr/td[position()=6]")
        self._names = [''.join(x for x in n.itertext()) for n in stage_name_nodes]
        self._coordinates = root.xpath("//table[@id='ctl00_ContentBody_Waypoints']/tbody/tr/td[position()=7]/text()")
        return cache_name, self._generator()

    def _generator(self):
        for name, coordinates in zip(self._names, self._coordinates):
            yield {'name': name.strip(), 'coordinates': CoordinateFilter.filter(coordinates)}


class PageParser:
    '''
    Parses a geocache page.

    Currently just supports parsing of the cache table.

    Later on will be able to parse the text section, and even to combine the text and table results.
    '''

    def __init__(self, table_parser):
        ''' Initializes the parser with a TableParser. '''
        self._table_parser = table_parser
        self._data = iter([])

    def parse(self, page):
        '''
        Returns a generator to iterate over all stages.

        page can be either a filename or an URL of the page to be parsed.
        '''
        self._name, self._data = self._table_parser.parse(input=page)
        return self._name, self._generator()

    def _generator(self):
        for entry in self._data:
            yield Stage(name=entry['name'], coordinates=entry['coordinates'], tasks={})

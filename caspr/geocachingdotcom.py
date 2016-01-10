#!/usr/bin/env python
# -*- coding: utf-8 -*-

from lxml import html
import re
import requests
import tempfile

from caspr.casprexception import CasprException
from caspr.staticcoordinate import StaticCoordinate
from caspr.stage import Stage, Task


def get_single_line_texts(nodes):
    ''' Returns the texts of the given nodes including their children's texts as single lines. '''

    return list(filter(None, [' '.join(c.strip() for c in n.itertext()).strip() for n in nodes]))


def flatten(iterables):
    return (item for sublist in iterables for item in sublist)


def get_multi_line_texts(nodes):
    ''' Returns the texts of the given nodes including their children's texts as multiple lines. '''

    breaks = (n.xpath('.//br') for n in nodes)
    breaks = flatten(breaks)
    for br in breaks:
        br.tail = '\n' + br.tail if br.tail else '\n'
    texts = (n.text_content() for n in nodes)
    texts = (t.strip() for t in texts)
    texts = (re.sub(r'[ \t]*[\n\r]+[ \t]*', '\n', t) for t in texts)
    texts = (text for text in texts if text.strip())

    return list(filter(None, texts))


class GeocachingSite:
    ''' Deals with the www.geocaching.com site. '''

    _LOGIN_FAILED_MESSAGE = ("Uh oh. Either your username or password is incorrect. Please try again. If you've "
                             "forgotten your information")

    def __init__(self, user, password):
        ''' Initializes a session with the given credentials used by all following fetch() calls. '''

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


class DescriptionParser:
    ''' Parses a stage description for tasks. '''

    def __init__(self):
        ''' Initializes a new object as empty. '''

        self._assignment_re = re.compile('([A-Z]+ =)|\n')
        self._items = []

    def parse(self, description):
        ''' Parses the given description and returns an iterable list of tasks. '''

        # TODO(KNR): alternatively store description as member variable and generate items in _generator()
        self._items = filter(None, self._assignment_re.split(description))
        return self._generator()

    def _generator(self):
        ''' A generator returning tasks created from the parsed description. '''

        variables = ''
        for item in self._items:
            if self._assignment_re.match(item):
                variables = item.replace('=', '').strip()
            elif variables:
                yield Task(description=item.strip(), variables=variables)
                variables = ''


class TableParser:
    ''' Parses the table of a geocache page. '''

    def parse(self, root):
        '''
        Returns an iterable list of stage data.

        input can be either a filename or an URL of the page to be parsed.
        '''

        stage_name_nodes = root.xpath("//table[@id='ctl00_ContentBody_Waypoints']/tbody/tr/td[position()=6]")
        self._names = get_single_line_texts(stage_name_nodes)
        self._coordinates = root.xpath("//table[@id='ctl00_ContentBody_Waypoints']/tbody/tr/td[position()=7]/text()")
        description_nodes = root.xpath("//table[@id='ctl00_ContentBody_Waypoints']/tbody/tr/td[position()=3]")
        self._descriptions = get_multi_line_texts(description_nodes)
        return self._generator()

    def _generator(self):
        ''' A generator returning a dictionary created from the parsed page data. '''

        for name, coordinates, description in zip(self._names, self._coordinates, self._descriptions):
            yield {
                'name': name.strip(),
                'coordinates': StaticCoordinate.match(coordinates),
                'description': description.strip()
            }


class PageParser:
    '''
    Parses a geocache page.

    Currently just supports parsing of the cache table.

    Later on will be able to parse the text section, and even to combine the text and table results.
    '''

    def __init__(self, table_parser, description_parser):
        ''' Initializes a new object as empty and links it to the given sub-parsers. '''

        self._table_parser = table_parser
        self._description_parser = description_parser
        self._stages = iter([])

    def parse(self, page):
        '''
        Returns a generator to iterate over all stages.

        page can be either a filename or an URL of the page to be parsed.
        '''

        # TODO(KNR): does defusedxml also work?
        root = html.parse(filename_or_url=page).getroot()  # Apparently lxml.html does not provide iterparse().
        description_nodes = root.xpath("//span[@id='ctl00_ContentBody_LongDescription']//p")
        self._description = '\n'.join(get_multi_line_texts(description_nodes))
        pos_nodes = root.xpath("//span[@id='uxLatLon']")
        self._position = pos_nodes[0].text_content().strip()
        cache_name_nodes = root.xpath("//title[position()=1]/text()")
        self._name = cache_name_nodes[0].strip() or ''

        self._stages = self._table_parser.parse(root=root)
        return {'name': self._name, 'stages': self._generator()}

    def _generator(self):
        ''' A generator returning stages created from the parsed page data. '''

        # Simply return the entire cache description as initial stage. For many multis this cache description contains
        # all stages, in which case the name of the type Stage is misleading...
        yield Stage(name=self._name,
                    coordinates=self._position,
                    description=self._description,
                    tasks=list(self._description_parser.parse(self._description)))
        for entry in self._stages:
            yield Stage(name=entry['name'],
                        coordinates=entry['coordinates'],
                        description=entry['description'],
                        tasks=list(self._description_parser.parse(entry['description'])))

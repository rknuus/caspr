#!/usr/bin/env python
# -*- coding: utf-8 -*-


from lxml import etree


class TableParser:
    def __init__(self, input):
        '''
        input can be either a filename or an URL of the page to be parsed.
        '''
        self._root = etree.parse(input, etree.HTMLParser())

    def coordinates(self):
        return self._root.xpath("//table[@id='ctl00_ContentBody_Waypoints']/tbody/tr/td[position()=7]/text()")

#!/usr/bin/env python
# -*- coding: utf-8 -*-


from lxml import etree


class TableParser:
    def __init__(self, input):
        '''
        input can be either a filename or an URL of the page to be parsed.
        '''
        self._root = etree.parse(input, etree.HTMLParser())

    def cache_name(self):
        # TODO(KNR): untested
        return self._root.xpath("//title[position()=1]/text()")[0].strip()  # TODO(KNR): trim somewhere else?

    def coordinates(self):
        # TODO(KNR): rename to stage_coordinates
        # TODO(KNR): check if we have to wrap the return value with iter()
        return self._root.xpath("//table[@id='ctl00_ContentBody_Waypoints']/tbody/tr/td[position()=7]/text()")

    def names(self):
        # TODO(KNR): rename to stage_names
        # TODO(KNR): improve
        nodes = self._root.xpath("//table[@id='ctl00_ContentBody_Waypoints']/tbody/tr/td[position()=6]")
        return ["".join(x for x in n.itertext()) for n in nodes]

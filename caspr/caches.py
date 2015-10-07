#!/usr/bin/env python
# -*- coding: utf-8 -*-


class Caches:
    ''' The top-level logic to convert cache pages into sheets. '''

    def __init__(self, site, parser, generator):
        self._site = site
        self._parser = parser
        self._generator = generator

    def prepare(self, codes):
        ''' Fetches the page for each geocaching code, parses it, and generates a sheet. '''
        for code in codes:
            page = self._site.fetch(code=code)
            stages = self._parser.parse(page=page)
            self._generator.generate(stages=stages)
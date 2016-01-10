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

        pages = (self._site.fetch(code=code) for code in codes)
        caches = (self._parser.parse(page=page) for page in pages)

        # TODO(KNR): how to apply generate() call without explicitly iterating over names and stages?
        for cache in caches:
            # TODO(KNR): before generation of the actual sheet generate a cell list
            self._generator.generate(name=cache['name'], stages=cache['stages'])

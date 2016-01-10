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
        # TODO(KNR): let _parser.parse() return a dict instead of a tuple, so we need to call parse() only once
        #            this solves the need for zip() below
        # TODO(KNR): add commit comment that http://www.dabeaz.com/generators-uk/GeneratorsUK.pdf recommends dicts
        #            instead of tuples
        name_and_stages_stream = (self._parser.parse(page=page) for page in pages)

        # TODO(KNR): how to apply generate() call without explicitly iterating over names and stages?
        for name, stages in name_and_stages_stream:
            # TODO(KNR): before generation of the actual sheet generate a cell list
            self._generator.generate(name=name, stages=stages)

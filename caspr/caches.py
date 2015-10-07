#!/usr/bin/env python
# -*- coding: utf-8 -*-


import os
import os.path as path


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
            self._delete_page_if_file(page=page)
            self._generator.generate(code=code, stages=stages)

    def _delete_page_if_file(self, page):
        if path.exists(path.basename(page)):
            os.remove(page)

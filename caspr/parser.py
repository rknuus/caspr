#!/usr/bin/env python
# -*- coding: utf-8 -*-

from caspr.stages import Stages


class PageParser:
    '''
    Parses a geocache page.

    Currently just supports parsing of the cache table.

    Later on will be able to parse the text section, and even to combine the text and table results.
    '''

    def parse(self, page):
        return Stages()

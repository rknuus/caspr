#!/usr/bin/env python
# -*- coding: utf-8 -*-


def generate_concatenation(sources):
    '''
    Concatenate multiple sources.

    http://www.dabeaz.com/generators-uk/GeneratorsUK.pdf
    '''
    for source in sources:
        for item in source:
            yield item


def trace(source):
    ''' Prints and re-yields each item of the given source. '''
    for item in source:
        print(item)
        yield item

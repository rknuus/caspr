#!/usr/bin/env python
# -*- coding: utf-8 -*-


from collections import namedtuple


class Stages:
    def __init__(self, parser):
        self._parser = parser

    def __iter__(self):
        # return self
        for coordinates in self._parser.coordinates():
            stage = namedtuple("stage", ["fixed_coordinates"])
            stage.fixed_coordinates = coordinates
            yield stage

    # def next(self):
    #     # from nose.tools import set_trace; set_trace()
    #     # print(len(self._parser.coordinates()))
    #     raise StopIteration()

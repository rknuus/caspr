#!/usr/bin/env python
# -*- coding: utf-8 -*-


class Stages:
    def __init__(self, parser):
        self._parser = parser

    def __iter__(self):
        return self

    def next(self):
        raise StopIteration()

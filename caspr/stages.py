#!/usr/bin/env python
# -*- coding: utf-8 -*-


from collections import namedtuple


Stage = namedtuple("stage", ["fixed_coordinates"])


def stages(parser):
    for coordinates in parser.coordinates():
        yield Stage(fixed_coordinates=coordinates)
    return

#!/usr/bin/env python
# -*- coding: utf-8 -*-


from collections import namedtuple


Stage = namedtuple("stage", ["name", "fixed_coordinates"])


def stages(parser):
    for name, coordinates in zip(parser.names(), parser.coordinates()):
        yield Stage(name=name, fixed_coordinates=coordinates)
    return

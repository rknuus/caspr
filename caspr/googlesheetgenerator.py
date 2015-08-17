#!/usr/bin/env python
# -*- coding: utf-8 -*-


from stages import stages


def generate(parser):
    for stage in stages(parser):
        print("processing stage ", stage.name, " with fixed coordinates ", stage.fixed_coordinates)

#!/usr/bin/env python
# -*- coding: utf-8 -*-


from caspr.stages import stages


def generate(parser):
    for stage in stages(parser):
        print("processing stage with fixed coordinates ", stage.fixed_coordinates)

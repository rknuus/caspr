#!/usr/bin/env python
# -*- coding: utf-8 -*-

from collections import namedtuple


Task = namedtuple('task', ['description', 'variables'])

Stage = namedtuple('stage', ['name', 'coordinates', 'description', 'tasks'])

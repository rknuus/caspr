#!/usr/bin/env python
# -*- coding: utf-8 -*-


from caspr.stages import Stages
from unittest.mock import MagicMock
import unittest


class TestStages(unittest.TestCase):
    def test_no_stages_defined(self):
        stages = Stages(MagicMock())
        with self.assertRaises(StopIteration):
            stages.next()

#!/usr/bin/env python
# -*- coding: utf-8 -*-


class GoogleSheet:
    '''
    Deals with Google Drive and the Google Docs Sheet.
    '''

    def generate(self, stages):
        ''' Generates a sheet from stages. '''

        for stage in stages:
            stage.coordinates()

#!/usr/bin/env python
# -*- coding: utf-8 -*-


from apiclient import discovery
from oauth2client import client
from oauth2client import tools
import gspread
import httplib2
import math
import oauth2client
import oauth2client.file
import os
import re


# NOTE: when changing the scope delete ~/.caspr/drive.json
SCOPES = "https://docs.google.com/feeds/ https://docs.googleusercontent.com/ https://spreadsheets.google.com/feeds/"
CLIENT_SECRET_FILE = 'client_secret_61425214161-mo3vloo7gsroqkfmfb3agc5j5qhibkqv.apps.googleusercontent.com.json'
APPLICATION_NAME = 'caspr'


class FormulaParser:
    ''' Extracts formulas from texts. '''

    def parse(self, text, variable_addresses):
        ''' Returns a Google Docs Sheet formula of the given formula text using given variable addresses. '''

        if not text:
            return ''

        # Normalize casual mathematical operations.
        text = text.replace(':', '/')
        # TODO(KNR): if we allow lower case variables skip this step if the variables contain 'x'
        text = text.replace('x', '*')

        # Normalize braces.
        text = text.replace('{', '(')
        text = text.replace('}', ')')
        text = text.replace('[', '(')
        text = text.replace(']', ')')

        # Resolve multi-digit variables like AB to (10*A+B).
        text = FormulaParser._replace_multi_digit_variables(text=text, variable_addresses=variable_addresses)

        # Special treatment for 'C', as we need it to reference other cells.
        if 'C' in variable_addresses:
            text = text.replace('C', 'C{0}'.format(variable_addresses['C']))

        # References for all other variables.
        for variable, index in variable_addresses.items():
            if variable != 'C':  # TODO(KNR): figure out a list comprehension
                # TODO(KNR): not sure if I may modify text or whether I should copy it first
                text = text.replace(variable, 'C{0}'.format(index))
        return '={0}'.format(text)

    @staticmethod
    def _replace_multi_digit_variables(text, variable_addresses):
        ''' Resolve multi-digit variables like AB to (10*A+B). '''

        multi_digits = re.compile('([{alternatives}][{alternatives}]+)'.format(alternatives='|'.join(list(variable_addresses.keys()))))
        for match in re.findall(multi_digits, text):
            resolved = '('
            max_power = len(match) - 1
            for index, variable in enumerate(match):
                if index > 0:
                    resolved += '+'
                resolved += '{0}*{1}'.format(10**(max_power-index), variable)
            resolved += ')'
            text = text.replace(match, resolved)
        return text


class GoogleSheet:
    '''
    Deals with Google Drive and the Google Docs Sheet.
    '''

    def __init__(self):
        ''' Authenticates with Google. '''

        self._credentials = GoogleSheet._get_credentials()
        self._http = self._credentials.authorize(httplib2.Http())
        self._service = discovery.build('drive', 'v2', http=self._http)
        self._spreadsheets = gspread.authorize(self._credentials)

    def generate(self, name, stages):
        '''
        Generates a sheet from stages.

        Creates a new sheet if none found with the name of the cache.
        '''

        worksheet = self._get_sheet(name=name)
        if not worksheet:
            worksheet = self._create_new_sheet(name=name)
        # TODO(KNR): else: clear existing worksheet
        sheet = worksheet.sheet1
        index = 0
        variable_addresses = {}
        for stage_number, stage in enumerate(stages):
            index += 1
            sheet.update_acell('A{0}'.format(index), stage.name)
            sheet.update_acell('B{0}'.format(index), stage.coordinates)
            index += 1
            sheet.update_acell('A{0}'.format(index), stage.description)
            for task in stage.tasks:
                for variable in task.variables:
                    if variable not in variable_addresses:
                        index += 1
                        sheet.update_acell('A{0}'.format(index), task.description)
                        variable_addresses[variable] = index
                        sheet.update_acell('B{0}'.format(index), variable)
                    else:  # merge the task description into the existing task description
                        variable_index = variable_addresses[variable]
                        address = 'A{0}'.format(variable_index)
                        value = '{0}\n{1}'.format(sheet.acell(address).value, task.description)
                        sheet.update_acell(address, value)

    def _get_sheet(self, name):
        ''' Either returns the sheet for the given name or None if not found. '''

        try:
            return self._spreadsheets.open(name)
        except gspread.SpreadsheetNotFound:
            return None

    def _create_new_sheet(self, name):
        ''' Creates a new sheet and returns it. '''

        body = {
            'mimeType': 'application/vnd.google-apps.spreadsheet',
            'title': name
        }
        self._service.files().insert(body=body).execute(http=self._http)
        return self._get_sheet(name=name)

    @staticmethod
    def _get_credentials():
        '''
        Gets valid user credentials from storage.

        If nothing has been stored, or if the stored credentials are invalid,
        the OAuth2 flow is completed to obtain the new credentials.

        Returns:
            Credentials, the obtained credential.
        '''

        home_dir = os.path.expanduser('~')  # TODO(KNR): is this portable to Windows?
        credential_dir = os.path.join(home_dir, '.caspr')  # TODO(KNR): is this portable to Windows?
        if not os.path.exists(credential_dir):
            os.makedirs(credential_dir)
        credential_path = os.path.join(credential_dir, 'drive.json')

        store = oauth2client.file.Storage(credential_path)
        credentials = store.get()
        if not credentials or credentials.invalid:
            flow = client.flow_from_clientsecrets(CLIENT_SECRET_FILE, SCOPES, login_hint='morakn.caching@gmail.com')  # TODO(KNR): replace login_hint by a config value
            flow.user_agent = APPLICATION_NAME
            credentials = tools.run(flow, store)
        return credentials

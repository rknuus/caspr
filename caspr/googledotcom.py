#!/usr/bin/env python
# -*- coding: utf-8 -*-

from apiclient import discovery
from oauth2client import client
from oauth2client import tools
import gspread
import httplib2
import oauth2client
import oauth2client.file
import os
import re

from caspr.casprexception import CasprException
from caspr.staticcoordinate import StaticCoordinate


# NOTE: when changing the scope delete ~/.caspr/drive.json
SCOPES = "https://docs.google.com/feeds/ https://docs.googleusercontent.com/ https://spreadsheets.google.com/feeds/"
# TODO(KNR): figure out whether each user needs to register an own client secret and if so how to use it
CLIENT_SECRET_FILE = 'client_secret_61425214161-mo3vloo7gsroqkfmfb3agc5j5qhibkqv.apps.googleusercontent.com.json'
APPLICATION_NAME = 'caspr'


class FormulaConverter:
    '''
    Extracts formulas from texts.

    Currently only supports WGS84 with floating point minutes in EN or DE.
    '''

    # TODO(KNR): not sure whether regular expressions are a clever choice...
    _WS = '[ \t]'
    _OPENING_BRACES = '[([{]'
    _CLOSING_BRACES = '[)\]}]'
    _BRACES = '{opening}|{closing}'.format(opening=_OPENING_BRACES, closing=_CLOSING_BRACES)
    _MATH_OPS = '[+\-/*]'  # Note: escape '-', otherwise it would be a range!
    _CASUAL_MATH_OPS = '[:x]'  # TODO(KNR): not sure if there are some lunatics using even more operators
    # Beware: as the variables are only known at runtime need to format them when using _FORMULA
    _FORMULA = ('((?:\d|{braces}|{math_ops}|{casual_math_ops}|{variables})'
                '(?:\d|{ws}|{braces}|{math_ops}|{casual_math_ops}|{variables})+)')
    _ORIENTATION = '[NSOEW]'  # TODO(KNR): internationalize
    _DEGREE = '[°]'
    _DECIMAL_SEPARATOR = '[.,]'
    # Beware: as the variables are only known at runtime need to format them when using _DYNAMIC_COORDINATES
    # N 47° [ B - C ].[ B x F - E x F - 3 x C ]
    # TODO(KNR): should replace last '*' by '{0,2}', but this results in a key error...
    _DYNAMIC_COORDINATES = ('({orientation}{ws}*{formula}{ws}*{degree}{ws}*{formula}{ws}*(?:{formula}{ws}*)?{separator}'
                            '{ws}*{formula}{ws}*(?:{formula}{ws}*)*)')

    def __init__(self, variable_addresses):
        ''' Initializes a formula converter with the variable addresses to be found in the formulas. '''

        if not variable_addresses:  # otherwise _FORMULA cannot be properly compiled
            raise CasprException('variable addresses dictionary must not be empty')

        self._variable_addresses = variable_addresses
        self._formula = FormulaConverter._FORMULA.format(
            ws=FormulaConverter._WS,
            braces=FormulaConverter._BRACES,
            math_ops=FormulaConverter._MATH_OPS,
            casual_math_ops=FormulaConverter._CASUAL_MATH_OPS,
            variables='[{0}]'.format(''.join(self._variable_addresses.keys())))
        self._dynamic_coordinates = FormulaConverter._DYNAMIC_COORDINATES.format(
            ws=FormulaConverter._WS,
            orientation=FormulaConverter._ORIENTATION,
            formula=self._formula,
            degree=FormulaConverter._DEGREE,
            separator=FormulaConverter._DECIMAL_SEPARATOR)

    def parse(self, description):
        '''
        Parses the given description and returns an iterable list of dynamic coordinates with resolved variables.
        '''

        return self._generator(description=description)

    def _generator(self, description):
        ''' A generator returning dynamic coordinates with resolved variables created from the parsed description. '''

        formula_re = re.compile(self._formula)
        for match in re.finditer(self._dynamic_coordinates, string=description):
            normalized_coordinates = self._normalize(match.group())
            if StaticCoordinate.match_partially(normalized_coordinates):
                continue  # Don't treat static coordinates as formulae.
            # Get rid of orientation, which might be misinterpreted as variable otherwise.
            assert normalized_coordinates[0] in FormulaConverter._ORIENTATION
            dynamic_coordinates = '="{0}"'.format(normalized_coordinates[0])
            # print('matching <', normalized_coordinates[1:], '> with <', formula_re.pattern, '>')
            for group in formula_re.split(normalized_coordinates[1:]):
                if formula_re.match(group):
                    dynamic_coordinates += '&'
                    dynamic_coordinates += self._resolve_formula(text=group)
                elif group:
                    dynamic_coordinates += '&'
                    dynamic_coordinates += '"{0}"'.format(group)
            yield dynamic_coordinates

    def _normalize(self, text):
        ''' Cleans the given text from all characters screwing up Google Docs Sheet formulas. '''

        if not text:
            return ''

        # Normalize casual mathematical operations.
        text = text.replace(':', '/')
        # TODO(KNR): if we allow lower case variables skip this step if the variables contain 'x'
        text = text.replace('x', '*')

        # Normalize braces.
        # TODO(KNR): merge to regex
        text = text.replace('{', '(')
        text = text.replace('}', ')')
        text = text.replace('[', '(')
        text = text.replace(']', ')')

        return text

    def _resolve_formula(self, text):
        ''' Returns a Google Docs Sheet formula of the given formula text using given variable addresses. '''

        if not text:
            return ''

        # Resolve multi-digit variables like AB to (10*A+B).
        text = self._replace_multi_digit_variables(text=text)

        # Special treatment for 'C', as we need it to reference other cells.
        # TODO(KNR): can be avoided when using addressing scheme R1C1
        if 'C' in self._variable_addresses:
            text = text.replace('C', 'C{0}'.format(self._variable_addresses['C']))

        # References for all other variables.
        for variable, index in self._variable_addresses.items():
            if variable != 'C':  # TODO(KNR): figure out a list comprehension
                # TODO(KNR): not sure if I may modify text or whether I should copy it first
                text = text.replace(variable, 'C{0}'.format(index))
        return '{0}'.format(text)

    def _replace_multi_digit_variables(self, text):
        ''' Resolve multi-digit variables like AB to (10*A+B). '''

        multi_digits = re.compile('([{alternatives}][{alternatives}]+)'.format(
            alternatives=''.join(self._variable_addresses.keys())))
        for match in re.findall(pattern=multi_digits, string=text):
            resolved = '('
            max_power = len(match) - 1
            for index, variable in enumerate(match):
                if index > 0:
                    resolved += '+'
                resolved += '{0}*{1}'.format(10 ** (max_power - index), variable)
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
        old_sheet = worksheet.sheet1
        # TODO(KNR): Don't know how to rename and Google API rejects adding a sheet with the same name
        #            (even ignoring case).
        sheet_name = ("stages" if worksheet.sheet1.title == "calculations" else "calculations")
        sheet = worksheet.add_worksheet(title=sheet_name, rows=1000, cols=26)
        worksheet.del_worksheet(old_sheet)
        index = 0
        variable_addresses = {}
        for stage_number, stage in enumerate(stages):
            index += 1
            sheet.update_acell('A{0}'.format(index), stage.name)
            sheet.update_acell('B{0}'.format(index), stage.coordinates)
            index += 1
            sheet.update_acell('A{0}'.format(index), stage.description)
            formula_row = index
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
            if variable_addresses:
                # Assuming the formula depends only on known variables (otherwise the geocache is broken).
                converter = FormulaConverter(variable_addresses)
                column = 2  # start in column B
                for formula in converter.parse(stage.description):
                    sheet.update_cell(row=formula_row, col=column, val=formula)
                    column += 1

    def _get_sheet(self, name):
        ''' Either returns the sheet for the given name or None if not found. '''

        try:
            return self._spreadsheets.open(name)
        except gspread.SpreadsheetNotFound:
            return None

    def _create_new_sheet(self, name):
        ''' Creates a new sheet and returns it. '''

        body = {'mimeType': 'application/vnd.google-apps.spreadsheet', 'title': name}
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
            flow = client.flow_from_clientsecrets(CLIENT_SECRET_FILE, SCOPES,
                                                  login_hint='morakn.caching@gmail.com')  # TODO(KNR): replace login_hint by a config value
            flow.user_agent = APPLICATION_NAME
            credentials = tools.run(flow, store)
        return credentials

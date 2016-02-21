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
from caspr.generatortools import generate_concatenation
from caspr.staticcoordinate import StaticCoordinate

# NOTE: when changing the scope delete ~/.caspr/drive.json
SCOPES = "https://docs.google.com/feeds/ https://docs.googleusercontent.com/ https://spreadsheets.google.com/feeds/"
APPLICATION_NAME = 'caspr'


class FormulaConverter:
    '''
    Extracts formulas from texts.

    Currently only supports WGS84 with floating point minutes in EN or DE.
    '''

    _WS = '[ \t]'
    _OPENING_BRACES = '[([{]'
    _CLOSING_BRACES = '[)\]}]'
    _BRACES = '{opening}|{closing}'.format(opening=_OPENING_BRACES, closing=_CLOSING_BRACES)
    _MATH_OPS = '[+\-/*]'  # Note: escape '-', otherwise it would be a character range!
    _CASUAL_MATH_OPS = '[:x]'
    # Beware: as the variables are only known at runtime need to format them before using _FORMULA
    _FORMULA = ('((?:\d|{braces}|{math_ops}|{casual_math_ops}|{variables})'
                '(?:{ws}|\d|{braces}|{math_ops}|{casual_math_ops}|{variables})+)')
    _ORIENTATION = '[NSOE]'  # TODO(KNR): a bit sloppy to accept all 4 orientations independet of longitude/lattitude
    _DEGREE = '[°]'
    _DECIMAL_SEPARATOR = '[.,]'
    _MASK = '({orientation})({ws}*{formula}{ws}*{degree})'
    _FIX_MASK = '[|]({orientation})[|](?!{ws}*{formula}{ws}*{degree})'
    # Beware: as the variables are only known at runtime need to format them before using _DYNAMIC_DIMENSION
    # Note: would like to replace last '*' by '{0,2}', but this results in a key error...
    _DYNAMIC_DIMENSION = (
        '[|]{orientation}[|]{ws}*{formula}{ws}*{degree}{ws}*{formula}{ws}*(?:{formula}{ws}*)?{separator}'
        '{ws}*{formula}(?:{ws}*{formula})*')
    _DYNAMIC_COORDINATE = (
        '[|]{orientation}[|]{ws}*{formula}{ws}*{degree}{ws}*{formula}{ws}*(?:{formula}{ws}*)?{separator}'
        '{ws}*{formula}{ws}*(?:{formula}{ws}*)*[|]{orientation}[|]{ws}*{formula}{ws}*{degree}{ws}*'
        '{formula}{ws}*(?:{formula}{ws}*)?{separator}{ws}*{formula}{ws}*(?:{formula}{ws}*)*')
    _DYNAMIC_POSITION = '({dimension})({dimension})?'.format(dimension=_DYNAMIC_DIMENSION)

    def __init__(self, variable_addresses):
        ''' Initializes a formula converter with the variable addresses to be found in the formulas. '''

        if not variable_addresses:  # otherwise _FORMULA cannot be properly compiled
            raise CasprException('variable addresses dictionary must not be empty')

        self._variable_addresses = variable_addresses
        formula = FormulaConverter._FORMULA.format(
            ws=FormulaConverter._WS,
            braces=FormulaConverter._BRACES,
            math_ops=FormulaConverter._MATH_OPS,
            casual_math_ops=FormulaConverter._CASUAL_MATH_OPS,
            variables='[{0}]'.format(''.join(self._variable_addresses.keys())))
        self._formula_re = re.compile(formula)
        self._dynamic_dimension = FormulaConverter._DYNAMIC_DIMENSION.format(
            ws=FormulaConverter._WS,
            orientation=FormulaConverter._ORIENTATION,
            formula=formula,
            degree=FormulaConverter._DEGREE,
            separator=FormulaConverter._DECIMAL_SEPARATOR)
        self._dynamic_dimension_re = re.compile(self._dynamic_dimension)
        self._mask_re = re.compile(FormulaConverter._MASK.format(ws=FormulaConverter._WS,
                                                                 orientation=FormulaConverter._ORIENTATION,
                                                                 formula=formula,
                                                                 degree=FormulaConverter._DEGREE))
        self._fix_mask_re = re.compile(FormulaConverter._FIX_MASK.format(ws=FormulaConverter._WS,
                                                                         orientation=FormulaConverter._ORIENTATION,
                                                                         formula=formula,
                                                                         degree=FormulaConverter._DEGREE))

    def parse(self, description):
        '''
        Parses the given description and returns an iterable list of dynamic coordinates with resolved descriptions.
        '''

        return self._generator(description=description)

    def _generator(self, description):
        ''' A generator returning dynamic coordinates with resolved descriptions created from the parsed description. '''

        assert 'x' not in self._variable_addresses, "'x' as variable name is currently not supported"

        description = StaticCoordinate.filter(description)
        description = self._mask_orientation(description)

        for match in re.finditer(self._dynamic_dimension_re, string=description):
            normalized_coordinates = self._normalize(match.group())

            # Get rid of orientation, which might be misinterpreted as variable otherwise.
            assert normalized_coordinates[1] in FormulaConverter._ORIENTATION
            dynamic_coordinates = '="{0}"'.format(normalized_coordinates[1])

            # TODO(KNR): replace commented out print by proper logging
            # print('matching <', normalized_coordinates[3:], '> with <', self._formula_re.pattern, '>')
            for group in self._formula_re.split(normalized_coordinates[3:]):
                if self._formula_re.match(group):
                    dynamic_coordinates += '&'
                    dynamic_coordinates += self._resolve_formula(text=group)
                elif group:
                    dynamic_coordinates += '&'
                    dynamic_coordinates += '"{0}"'.format(group)
            yield dynamic_coordinates

    def _mask_orientation(self, description):
        '''
        Hack to mask the orientation, e.g. replacing N by |N|.

        Required to:
        - properly terminate combined lattitude & longitude.
        - avoid accidental replacement of orientation if there are descriptions with names like orientations (e.g. N or E).
        '''

        # TODO(KNR): there has to be a simpler way, this is really cheesy
        # Repeat masking to cover concatenated lattitude and longitude.
        # Because the lattitude might contain a variable named like an orientation the mask is possibly inserted at a
        # wrong place. That's why we need to remove all wrong masks again.
        return re.sub(self._fix_mask_re, r'\1', re.sub(self._mask_re, r'|\1|\2', re.sub(self._mask_re, r'|\1|\2',
                                                                                        description)))

    def _normalize(self, text):
        ''' Cleans the given text from all characters screwing up Google Docs Sheet formulas. '''

        if not text:
            return ''

        # Normalize casual mathematical operations.
        text = text.replace(':', '/')
        # TODO(KNR): if we allow lower case descriptions skip this step if the descriptions contain 'x'
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

        # Resolve multi-digit descriptions like AB to (10*A+B).
        text = self._replace_multi_digit_descriptions(text=text)

        # Special treatment for 'C', as we need it to reference other cells.
        # TODO(KNR): can be avoided when using addressing scheme R1C1
        if 'C' in self._variable_addresses:
            text = text.replace('C', 'C{0}'.format(self._variable_addresses['C']))

        # References for all other descriptions.
        for variable, index in self._variable_addresses.items():
            if variable != 'C':  # TODO(KNR): can be avoided when using addressing scheme R1C1
                text = text.replace(variable, 'C{0}'.format(index))
        return '{0}'.format(text)

    def _replace_multi_digit_descriptions(self, text):
        ''' Resolve multi-digit descriptions like AB to (10*A+B). '''

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


class WorksheetFactory:
    '''
    Sets up a connection to Google Drive and provides a worksheet factory.
    '''

    def __init__(self, keyfile):
        ''' Authenticates with Google. '''

        self._credentials = WorksheetFactory._get_credentials(keyfile)
        self._http = self._credentials.authorize(httplib2.Http())
        self._service = discovery.build('drive', 'v2', http=self._http)
        self._spreadsheets = gspread.authorize(self._credentials)

    def create(self, name):
        ''' Either returns the sheet for the given name or creates one if not found. '''
        worksheet = self._get_sheet(name=name)
        if not worksheet:
            worksheet = self._create_new_sheet(name=name)
        old_sheet = worksheet.sheet1
        # TODO(KNR): Don't know how to rename and Google API rejects adding a sheet with the same name
        #            (even ignoring case).
        sheet_name = ('calculations02' if worksheet.sheet1.title == 'calculations01' else 'calculations01')
        sheet = worksheet.add_worksheet(title=sheet_name, rows=1000, cols=26)
        worksheet.del_worksheet(old_sheet)
        return sheet

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
    def _get_credentials(keyfile):
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
            flags = tools.argparser.parse_args(args=[])
            flow = client.flow_from_clientsecrets(keyfile, SCOPES)
            flow.user_agent = APPLICATION_NAME
            credentials = tools.run_flow(flow, store, flags)
        return credentials


class _Counter(object):
    ''' To count rows we need a stateful (i.e. non-primitive type) object. '''

    # TODO(KNR): is there some existing mechanism we can use instead?
    def __init__(self):
        ''' Initializes the counter to 1, because sheet cell addresses are 1-based. '''
        self._count = 1

    def increment(self):
        ''' Increment the count by 1 '''
        self._count += 1

    def get(self):
        ''' Returns the current count '''
        return self._count


def _publish_as_sheet(name, rows, factory):
    '''
    Generate a Google Docs Sheet from a cell list.

    Takes a list of rows, where each row is a list of cells and the position is encoded as row and column index,
    and publishes the cell content to a Google Docs Sheet created by the factory.
    '''

    sheet = factory.create(name=name)
    for row, columns in enumerate(rows):
        for column, value in enumerate(columns):
            if value:
                sheet.update_cell(row=row + 1, col=column + 1, val=value)


def _merge_tasks(stage, descriptions):
    ''' Merges all descriptions of tasks mentioned in multiple stages and yields each stage. '''

    # TODO(KNR): move to cache creation phase?
    for task in stage.tasks:
        for variable in task.variables:
            if variable not in descriptions:
                descriptions[variable] = [task.description]
            else:  # merge the task description into the existing task description
                descriptions[variable].append(task.description)
    return stage


def _generate_rows_per_stage(stages, descriptions, variable_addresses, row_counter):
    ''' Generator providing the rows to be published to the Google Docs Sheet. '''

    # TODO(KNR): replace the dictionary based cache type by the same idiom
    for stage in stages:
        yield [stage.name, stage.coordinates]
        yield [stage.description]
        for task in stage.tasks:
            for variable in task.variables:
                if variable not in variable_addresses:
                    variable_addresses[variable] = row_counter.get()
                    yield ['\n'.join(descriptions[variable]), variable]
        if variable_addresses:
            # TODO(KNR): split formula conversion and variable address resolution, so we can resolve addresses when
            # the variable places are fix
            converter = FormulaConverter(variable_addresses)
            yield converter.parse(stage.description)


def _generate_row_counters(rows, row_counter):
    for row in rows:
        row_counter.increment()
        yield row


def publish(name, stages, factory):
    ''' Generates a Google Docs Sheet with the passed name from the given stages. '''

    # cannot use generator expression for _merge_tasks because we need to iterate over all tasks before preparing rows
    descriptions = {}
    stages_with_unified_tasks = [_merge_tasks(stage=stage, descriptions=descriptions) for stage in stages]
    variable_addresses = {}
    counter = _Counter()
    rows = _generate_rows_per_stage(stages=stages_with_unified_tasks,
                                    descriptions=descriptions,
                                    variable_addresses=variable_addresses,
                                    row_counter=counter)
    rows = _generate_row_counters(rows=rows, row_counter=counter)
    _publish_as_sheet(name=name, rows=rows, factory=factory)

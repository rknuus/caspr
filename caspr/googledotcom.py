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


# try:
#     import argparse
#     flags = argparse.ArgumentParser(parents=[tools.argparser]).parse_args()
# except ImportError:
#     flags = None


# SCOPES = 'https://www.googleapis.com/auth/drive.metadata.readonly'
# SCOPES = 'userinfo.email,userinfo.profile,https://www.googleapis.com/auth/drive.file'
# NOTE: when changing the scope delete ~/.caspr/drive.json
SCOPES = "https://docs.google.com/feeds/ https://docs.googleusercontent.com/ https://spreadsheets.google.com/feeds/"
CLIENT_SECRET_FILE = 'client_secret_61425214161-mo3vloo7gsroqkfmfb3agc5j5qhibkqv.apps.googleusercontent.com.json'
APPLICATION_NAME = 'caspr'


class GoogleSheet:
    '''
    Deals with Google Drive and the Google Docs Sheet.
    '''

    def __init__(self):
        self._credentials = GoogleSheet._get_credentials()
        self._http = self._credentials.authorize(httplib2.Http())
        self._service = discovery.build('drive', 'v2', http=self._http)
        self._spreadsheets = gspread.authorize(self._credentials)

    def generate(self, name, stages):
        ''' Generates a sheet from stages. '''

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
                    else:
                        variable_index = variable_addresses[variable]
                        address = 'A{0}'.format(variable_index)
                        value = '{0}\n{1}'.format(sheet.acell(address).value, task.description)
                        sheet.update_acell(address, value)

    def _get_sheet(self, name):
        try:
            return self._spreadsheets.open(name)
        except gspread.SpreadsheetNotFound:
            return None

    def _create_new_sheet(self, name):
        body = {
            'mimeType': 'application/vnd.google-apps.spreadsheet',
            'title': name
        }
        self._service.files().insert(body=body).execute(http=self._http)
        return self._get_sheet(name=name)

    @staticmethod
    def _get_credentials():
        """Gets valid user credentials from storage.

        If nothing has been stored, or if the stored credentials are invalid,
        the OAuth2 flow is completed to obtain the new credentials.

        Returns:
            Credentials, the obtained credential.
        """
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
            # if flags:
            #     credentials = tools.run_flow(flow, store, flags)
            # else:  # Needed only for compatability with Python 2.6  # TODO(KNR): remove, we got Python 3
            #     credentials = tools.run(flow, store)
            credentials = tools.run(flow, store)
        return credentials

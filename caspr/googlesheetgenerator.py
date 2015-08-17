#!/usr/bin/env python
# -*- coding: utf-8 -*-

from apiclient import discovery
from oauth2client import client
from oauth2client import tools
from stages import stages
import gspread
import httplib2
import oauth2client
import oauth2client.file
import os


SCOPES = "https://docs.google.com/feeds/ https://docs.googleusercontent.com/ https://spreadsheets.google.com/feeds/"
CLIENT_SECRET_FILE = 'client_secret_61425214161-mo3vloo7gsroqkfmfb3agc5j5qhibkqv.apps.googleusercontent.com.json'
APPLICATION_NAME = 'caspr'


def _get_credentials():
    """Gets valid user credentials from storage.

    If nothing has been stored, or if the stored credentials are invalid,
    the OAuth2 flow is completed to obtain the new credentials.

    Returns:
        Credentials, the obtained credential.
    """
    home_dir = os.path.expanduser('~')
    credential_dir = os.path.join(home_dir, '.caspr')
    if not os.path.exists(credential_dir):
        os.makedirs(credential_dir)
    credential_path = os.path.join(credential_dir, 'drive.json')

    store = oauth2client.file.Storage(credential_path)
    credentials = store.get()
    if not credentials or credentials.invalid:
        flow = client.flow_from_clientsecrets(CLIENT_SECRET_FILE, SCOPES, login_hint='morakn.caching@gmail.com')
        flow.user_agent = APPLICATION_NAME
        try:
            import argparse
            flags = argparse.ArgumentParser(parents=[tools.argparser]).parse_args()
        except ImportError:
            flags = None
        if flags:
            credentials = tools.run_flow(flow, store, flags)
        else:  # Needed only for compatability with Python 2.6
            credentials = tools.run(flow, store)
        print('Storing credentials to ' + credential_path)
    return credentials


def generate(parser):
    credentials = _get_credentials()

    http = credentials.authorize(httplib2.Http())
    service = discovery.build('drive', 'v2', http=http)
    body = {
        'mimeType': 'application/vnd.google-apps.spreadsheet',
        'title': parser.cache_name(),
    }
    service.files().insert(body=body).execute(http=http)  # TODO(KNR): could capture return value in variable file and possibly edit the sheet through this variable

    gc = gspread.authorize(credentials)
    wks = gc.open(parser.cache_name())
    sh = wks.sheet1

    for i, stage in enumerate(stages(parser)):
        print("processing stage #", str(i+1), " called ", stage.name, " with fixed coordinates ", stage.fixed_coordinates)
        sh.update_cell(i+1, 1, stage.name)
        sh.update_cell(i+1, 2, stage.fixed_coordinates)

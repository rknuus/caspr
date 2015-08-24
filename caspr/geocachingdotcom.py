#!/usr/bin/env python
# -*- coding: utf-8 -*-


from lxml import html
import requests


class GeocachingSite:
    def __init__(self, user, password):
        self._prepare_session(user, password)

    def _prepare_session(self, user, password):
        login_page = requests.get('https://www.geocaching.com/login/default.aspx')
        login_root = html.fromstring(login_page.text)
        viewstate = login_root.xpath("//input[@name='__VIEWSTATE']")
        viewstategenerator = login_root.xpath("//input[@name='__VIEWSTATEGENERATOR']")
        payload = {
            '__EVENTTARGET': '',
            '__EVENTARGUMENT': '',
            viewstate[0].name: viewstate[0].value,
            viewstategenerator[0].name: viewstategenerator[0].value,
            'ctl00$ContentBody$tbUsername': user,
            'ctl00$ContentBody$tbPassword': password,
            'ctl00$ContentBody$cbRememberMe': '0',
            'ctl00$ContentBody$btnSignIn': 'Anmelden'  # TODO(KNR): localize...
        }
        session = requests.Session()
        session.post('https://www.geocaching.com/login/default.aspx', data=payload)
        self._session = session

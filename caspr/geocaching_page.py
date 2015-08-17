#!/usr/bin/env python
# -*- coding: utf-8 -*-


from lxml import html
import requests
import tempfile


def fetch(code):
    login_page = requests.get('https://www.geocaching.com/login/default.aspx')
    login_root = html.fromstring(login_page.text)
    viewstate = login_root.xpath("//input[@name='__VIEWSTATE']")
    viewstategenerator = login_root.xpath("//input[@name='__VIEWSTATEGENERATOR']")
    # fields = login_root.xpath("//input")

    # Fill in your details here to be posted to the login form.
    payload = {
        '__EVENTTARGET': '',
        '__EVENTARGUMENT': '',
        viewstate[0].name: viewstate[0].value,
        viewstategenerator[0].name: viewstategenerator[0].value,
        'ctl00$ContentBody$tbUsername': 'morakn',
        'ctl00$ContentBody$tbPassword': 'M6009913K',
        'ctl00$ContentBody$cbRememberMe': '0',
        'ctl00$ContentBody$btnSignIn': 'Anmelden'
    }

    # Use 'with' to ensure the session context is closed after use.
    with requests.Session() as s:
        p = s.post('https://www.geocaching.com/login/default.aspx', data=payload)  # also try https://www.geocaching.com/login/default.aspx?RESETCOMPLETE=y
        # print the html returned or something more intelligent to see if it's a successful login page.
        print(p.text)

        # An authorised request.
        page = s.get("http://www.geocaching.com/geocache/{0}".format(code))
        with tempfile.NamedTemporaryFile(delete=False) as file:
            # TODO(KNR): why the heck does it not work when passing page.text to the lxml.html parser?! Probably some encoding issue
            file.write(bytes(page.text, 'UTF-8'))
            return file.name

    return None

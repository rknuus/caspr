=====
caspr
=====


The tool relieves you from all the tedious calculations of a multi-stage
geocache. It converts a https://www.geocaching.com geocache description into a
Google Docs sheet where you can enter the answers to the questions. The sheet
then performs most intermediate and final coordinate calculations for you.

Beware that CAche Sheet PReparation is work in progress!


Description
===========

CAche Sheet PReparation supports the preparation of Google Docs sheets for
multi-stage geocaches. The sheet can be opened offline (!) on a mobile device
if you activate the offline mode of the document and open it in Google's Chrome
browser.

The sheet provides fields to enter the answers to the questions of each stage,
and automatically calculates intermediate and the final geocache positions
depending on the values you enter. Hopefully this reduces calculation errors to
a minimum, so that you can enjoy a hassle-free geocaching tour.


Setup
=====

#. download https://github.com/rknuus/caspr/archive/master.zip
#. unzip it into a directory of your choice, let's call it <dir>
#. install `Python 3 <https://www.python.org/downloads/>`
   note: Python 2 is **not** supported
#. open a terminal, change into the directory <dir>
#. enter ``python setup.py`` to install all required libraries
#. using a google account create a Google API Key for the API "Drive API" as
   described in https://wordpress.org/support/topic/how-to-get-a-google-api-key
   (sorry for the hassle, that's due to Google's API usage terms)
#. download the client secret file and store it to <dir>/client_secret.json


Usage
=====

To run caspr open a terminal, change into <dir> (where you installed caspr) and
enter:
``python caspr.py -u <geocaching.com account> -p <geocaching password> <GC codes>``

The first time (and possibly from time to time) you are asked for a google
authentication. Log in with the same account you used to create the Google API
Key.


Limitations
===========

Only geocaches of https://www.geocaching.com and only Google Docs sheets are
supported.

As the multi-stage descriptions are structured in many different ways, the tool
is not able to correctly process all possible geocache descriptions. In this
case the tool tries to support you as much as possible.

So far caspr supports:

- log-in to geocaching.com in German
- extractions of variables and formulae from geocache description like GC30N6K
- extractions of variables and formulae from  tables like GC2A62B
- matching of formulae in WGS84 with floating point minutes like N 47° 03.204 and E A° B.CDE
- single characters as variables (e.g. A, B, X, Y, etc.) except 'x' which is interpreted as multiplication
- English longitude and lattitude orientations (N, S, E, W)
- simple mathematical operations +,-,: or /,* or x in formulae
- braces and brackets like {}, [], and (), but only in the lower ASCII range
- merging of duplicate variable definitions
- casual chaining of variables, e.g. AB is interpreted as 10*A+1*B


Note
====

This project has been set up using PyScaffold 2.2.1. For details and usage
information on PyScaffold see http://pyscaffold.readthedocs.org/.

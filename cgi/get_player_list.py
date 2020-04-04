#!/home/mweltin/PycharmProjects/baseballHacksInPython/venv/bin/python3
python_home = '/home/mweltin/PycharmProjects/baseballHacksInPython/venv'
import sys
import site
# Calculate path to site-packages directory.
python_version = '.'.join(map(str, sys.version_info[:2]))
site_packages = python_home + '/lib/python%s/site-packages' % python_version
# Add the site-packages directory.
site.addsitedir(site_packages)
site.addsitedir('/home/mweltin/PycharmProjects/baseballHacksInPython')
sys.base_prefix = sys.prefix
sys.base_exec_prefix = sys.exec_prefix
print("Content-type:application/json\r\n\r\n")

import psycopg2
import constants
import json

# -*- coding: UTF-8 -*-# enable debugging
player_query = "SELECT * FROM player"
connect_str = "user='" + constants.DB_USER + "' host='" + constants.DB_HOST + "' dbname='" + constants.DB + "' password="
conn = psycopg2.connect(connect_str)
conn.set_isolation_level(psycopg2.extensions.ISOLATION_LEVEL_AUTOCOMMIT)
cursor = conn.cursor()
cursor.execute(player_query)

r = [dict((cursor.description[i][0], value) for i, value in enumerate(row)) for row in cursor.fetchall()]

print(json.dumps(r, default=str))
exit()

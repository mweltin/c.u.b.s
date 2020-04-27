import json
import urllib
from os import environ
from urllib.parse import urlparse

import psycopg2

import constants


def start_response(status, headers):
    response_status = []
    response_headers = []
    status = status.split(' ', 1)
    response_status.append((int(status[0]), status[1]))
    response_headers.append(dict(headers))


def application(environ, start_response) -> list:
    status = '200 OK'
    headers = [('Content-type', 'application/json')]
    start_response(status, headers)

    q = urllib.parse.parse_qs(environ['QUERY_STRING'])

    home_team = q.get('team_id')[0]
    # -*- coding: UTF-8 -*-# enable debugging
    roster_query = '''
     select player.* from player   
       join 
        (SELECT distinct(batter) as player_id from event where batting_team = 1 and home_team = %s
        UNION 
        SELECT distinct(pitcher) as player_id from event where batting_team = 0 and home_team = %s) as t1
        
        on t1.player_id = player.id;
        '''
    connect_str = "user='" + constants.DB_USER + "' host='" + constants.DB_HOST + "' dbname='" + constants.DB + "' password="
    conn = psycopg2.connect(connect_str)
    conn.set_isolation_level(psycopg2.extensions.ISOLATION_LEVEL_AUTOCOMMIT)
    cursor = conn.cursor()
    cursor.execute(roster_query, [home_team, home_team])

    r = [dict((cursor.description[i][0], value) for i, value in enumerate(row)) for row in cursor.fetchall()]
    a = bytes(json.dumps(r, default=str), encoding='utf-8')
    return [a]


if __name__ == "__main__":
    application(environ, start_response)

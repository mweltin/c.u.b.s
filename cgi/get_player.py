from os import environ
import psycopg2
import constants
import json
import cgi


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

    # Get data from fields
    q = cgi.parse_qs(environ['QUERY_STRING'])

    player_id = q.get('player_id')[0]

    # -*- coding: UTF-8 -*-# enable debugging
    player_query = "SELECT * FROM player WHERE player_id = %s"
    connect_str = "user='" + constants.DB_USER + "' host='" + constants.DB_HOST + "' dbname='" + constants.DB + "'"
    try:
        conn = psycopg2.connect(connect_str)
    except Exception as error:
        print(error)

    conn.set_isolation_level(psycopg2.extensions.ISOLATION_LEVEL_AUTOCOMMIT)
    cursor = conn.cursor()
    cursor.execute(player_query, [player_id])

    r = [dict((cursor.description[i][0], value) for i, value in enumerate(row)) for row in cursor.fetchall()]

    a = bytes(json.dumps(r, default=str), encoding='utf-8')
    return [a]


if __name__ == "__main__":
    application(environ, start_response)

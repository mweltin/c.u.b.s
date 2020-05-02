from os import environ
import psycopg2
import constants
import json


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

    # -*- coding: UTF-8 -*-# enable debugging
    player_query = '''
        select t2.*, (t2.balls + t2.strikes + t2.no_affect + t2.in_play) as total  
        FROM
            ( SELECT 
                event.batter, 
                extract(year from game_date) as year, 
                sum(t1.ball) balls, 
                sum(t1.strike) strikes, 
                sum(t1.in_play) in_play, 
                sum(t1.no_affect) no_affect
            FROM 
                event 
            JOIN parse_pitch_sequence(pitch_sequence) t1 ON TRUE
            WHERE batter = 'rizza001'
            GROUP BY year, event.batter ) t2
    '''
    connect_str = "user='" + constants.DB_USER + "' host='" + constants.DB_HOST + "' dbname='" + constants.DB + "' password="
    conn = psycopg2.connect(connect_str)
    conn.set_isolation_level(psycopg2.extensions.ISOLATION_LEVEL_AUTOCOMMIT)
    cursor = conn.cursor()
    cursor.execute(player_query)

    r = [dict((cursor.description[i][0], value) for i, value in enumerate(row)) for row in cursor.fetchall()]
    a = bytes(json.dumps(r, default=str), encoding='utf-8')
    return [a]


if __name__ == "__main__":
    application(environ, start_response)
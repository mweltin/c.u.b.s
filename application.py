import urllib

import psycopg2

OK_STATUS = '200 OK'
JSON_HEADERS = [('Content-type', 'application/json')]


def make_start_response(status, headers):
    response_status = []
    response_headers = []
    status = status.split(' ', 1)
    response_status.append((int(status[0]), status[1]))
    response_headers.append(dict(headers))


class Application:
    """
    Class representing a HTTP application
    """

    def __init__(self, db_user='postgres', db_pass='', db_host='localhost',
                 db_port=5432, db_name='postgres'):
        """
        Initializes the app by creating a PostgreSQL connection and setting `self.cursor`
        and `self.conn`
        """
        conn_str = f"postgresql://{db_user}:{db_pass}@{db_host}:{db_port}/{db_name}"
        self.conn = psycopg2.connect(conn_str)
        self.conn.set_isolation_level(psycopg2.extensions.ISOLATION_LEVEL_AUTOCOMMIT)
        self.cursor = self.conn.cursor()

        self.q = None  # Will hold query string parameters

    def response(self):
        """
        This is the method which determines what will be included in the response.
        This method will need to be defined by sub-classes
        """
        return []

    def run(self, environ, start_response):
        """
        Runs the WSGI application by calling `self.response` and then closes our open
        database connection.
        """
        start_response(OK_STATUS, JSON_HEADERS)
        self.q = urllib.parse.parse_qs(environ['QUERY_STRING'])

        try:
            resp = self.response()
        finally:
            self.conn.close()

        return resp

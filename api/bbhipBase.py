import psycopg2


class CubsBase:
    """
    Class representing a HTTP application
    """

    def __init__(
        self,
        db_user="postgres",
        db_pass="",
        db_host="localhost",
        db_port=5432,
        db_name="postgres",
    ):
        """
        Initializes the app by creating a PostgreSQL connection and setting `self.cursor`
        and `self.conn`
        """
        conn_str = f"postgresql://{db_user}:{db_pass}@{db_host}:{db_port}/{db_name}"
        self.conn = psycopg2.connect(conn_str)
        self.conn.set_isolation_level(psycopg2.extensions.ISOLATION_LEVEL_AUTOCOMMIT)
        self.cursor = self.conn.cursor()

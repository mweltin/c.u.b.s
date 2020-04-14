import unittest
import psycopg2
import psycopg2.extras


class TestParsePitchSequence(unittest.TestCase):
    conn = None
    curr = None

    @classmethod
    def setUpClass(self):
        connect_str = "user='bbhip' host='localhost' dbname='bbhip'"
        self.conn = psycopg2.connect(connect_str)
        self.conn.autocommit = True
        self.curr = self.conn.cursor(cursor_factory=psycopg2.extras.DictCursor)

    @classmethod
    def tearDownClass(self):
        self.conn.close()

    def test_ball_count(self):
        test_str = 'VPHIB'
        query_str = """SELECT * FROM parse_pitch_sequence(%s)"""
        self.curr.execute(query_str, [test_str])
        result = self.curr.fetchone()
        self.assertEqual(result['ball'], 5, "ball count is not incorrect")

    def test_strike_count(self):
        test_str = 'TSQKC'
        query_str = """SELECT * FROM parse_pitch_sequence(%s)"""
        self.curr.execute(query_str, [test_str])
        result = self.curr.fetchone()
        self.assertEqual(result['strike'], 5, "strike count is not incorrect")

    def test_no_affect_count(self):
        test_str = 'SSROLF'
        query_str = """SELECT * FROM parse_pitch_sequence(%s)"""
        self.curr.execute(query_str, [test_str])
        result = self.curr.fetchone()
        self.assertEqual(result['no_affect'], 4, "no affect count is not incorrect")

    def test_foul_strike_count(self):
        test_str = 'ROLF'
        query_str = """SELECT * FROM parse_pitch_sequence(%s)"""
        self.curr.execute(query_str, [test_str])
        result = self.curr.fetchone()
        self.assertEqual(result['strike'], 2, "First two fouls not counted as strike")
        self.assertEqual(result['no_affect'], 2, "initial foul not counted as strike")

    def test_in_play_count(self):
        test_str = 'XY'
        query_str = """SELECT * FROM parse_pitch_sequence(%s)"""
        self.curr.execute(query_str, [test_str])
        result = self.curr.fetchone()
        self.assertEqual(result['in_play'], 2, "in play count is not incorrect")


if __name__ == '__main__':
    unittest.main()

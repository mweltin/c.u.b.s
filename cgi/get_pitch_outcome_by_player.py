import json
from os import environ

import constants
import application


class PitchOutComeByPlayerApp(application.Application):
    def response(self):
        """
        This holds the logic for gather the data necessary for the response
        """
        player = self.q.get('player_id')[0]

        pitch_outcome_query = '''
            SELECT
              t2.player_id,
              t2.year,
              COALESCE(t2.balls, 0) AS balls, 
              COALESCE(t2.strikes, 0) AS strikes, 
              COALESCE(t2.in_play, 0) AS in_play, 
              COALESCE(t2.no_affect, 0) AS no_affect, 
              (t2.balls + t2.strikes + t2.no_affect + t2.in_play) as total  
            FROM
                ( SELECT 
                    event.batter AS player_id, 
                    extract(year from game_date) AS year, 
                    sum(t1.ball) balls, 
                    sum(t1.strike) strikes, 
                    sum(t1.in_play) in_play, 
                    sum(t1.no_affect) no_affect
                FROM 
                    event 
                JOIN parse_pitch_sequence(pitch_sequence) t1 ON TRUE
                WHERE batter = %s
                GROUP BY year, event.batter ) t2'''
        self.cursor.execute(pitch_outcome_query, [player])

        results = []
        for row in self.cursor.fetchall():
            results.append(
                {self.cursor.description[i][0]: value for i, value in enumerate(row)}
            )
        a = bytes(json.dumps(results, default=str), encoding='utf-8')

        return [a]


if __name__ == "__main__":
    app = PitchOutComeByPlayerApp(
        db_user=constants.DB_USER, db_host=constants.DB_HOST,
        db_name=constants.DB
    )
    app.run(environ, application.make_start_response)

import bbhipBase


class PlayerData(bbhipBase.CubsBase):
    def __init__(
        self,
        player,
        db_user="postgres",
        db_pass="",
        db_host="localhost",
        db_port=5432,
        db_name="postgres",
    ):
        super().__init__(
            db_user=db_user,
            db_pass=db_pass,
            db_host=db_host,
            db_port=db_port,
            db_name=db_name,
        )
        self.player = player
    
    def player_bio(self):
        query = "SELECT * FROM player WHERE id = %s"
        return self.get_data(query)

    def batting_average(self):
        query = 'select * from batting_average(%s)'
        return self.get_data(query)

    def slugging(self):
        query = "select * from slugging(%s)"
        return self.get_data(query)

    def on_base_percentage(self):
        query = "select * from on_base_percentage(%s)"
        return self.get_data(query)

    def era(self):
        query = "select * from era(%s)"
        return self.get_data(query)

    def pitch_outcome(self):
        query = """
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
                        GROUP BY year, event.batter ) t2"""
        return self.get_data(query)

    def get_data(self, query):
        self.cursor.execute(query, [self.player])
        results = []
        for row in self.cursor.fetchall():
            results.append(
                {self.cursor.description[i][0]: value for i, value in enumerate(row)}
            )
        return results

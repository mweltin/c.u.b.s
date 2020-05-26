import bbhipBase
import json


class PlayersByTeam(bbhipBase.CubsBase):
    def response(self, home_team):
        """
        This holds the logic for gather the data necessary for the response
        """
        roster_query = '''
         select player.* from player   
           join 
            (SELECT distinct(batter) as player_id from event where batting_team = 1 and home_team = %s
            UNION 
            SELECT distinct(pitcher) as player_id from event where batting_team = 0 and home_team = %s) as t1

            on t1.player_id = player.id;
            '''
        self.cursor.execute(roster_query, [home_team, home_team])

        results = []
        for row in self.cursor.fetchall():
            results.append(
                {self.cursor.description[i][0]: value for i, value in enumerate(row)}
            )

        return results

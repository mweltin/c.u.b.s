import bbhipBase


class GetPlayer(bbhipBase.CubsBase):
    def response(self, player):
        """
        This holds the logic for gather the data necessary for the response
        """
        player_query = "SELECT * FROM player WHERE id = %s"
        self.cursor.execute(player_query, [player])

        results = []
        for row in self.cursor.fetchall():
            results.append(
                {self.cursor.description[i][0]: value for i, value in enumerate(row)}
            )

        return results

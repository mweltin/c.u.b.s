import bbhipBase


class GetTeams(bbhipBase.CubsBase):
    def response(self):
        """
        This holds the logic for gather the data necessary for the response
        """
        get_teams_query = "SELECT * FROM team"
        self.cursor.execute(get_teams_query, [])

        results = []
        for row in self.cursor.fetchall():
            results.append(
                {self.cursor.description[i][0]: value for i, value in enumerate(row)}
            )

        return results

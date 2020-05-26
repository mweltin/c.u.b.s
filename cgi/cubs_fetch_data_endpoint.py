from flask import Flask, jsonify
import constants
import get_pitch_outcome_by_player
import get_players_by_team
import get_teams
import get_player

app = Flask(__name__)


@app.route('/')
def index():
    return 'flask working'


@app.route('/pitch_outcome/<player_id>')
def pitch_outcome(player_id):
    po = get_pitch_outcome_by_player.PitchOutComeByPlayer(db_user=constants.DB_USER, db_pass='',
                                                          db_host=constants.DB_HOST,
                                                          db_port=5432, db_name=constants.DB)
    resp = po.response(player_id)
    return jsonify(resp)


@app.route('/player/<player_id>')
def player(player_id):
    po = get_player.GetPlayer(db_user=constants.DB_USER, db_pass='',
                              db_host=constants.DB_HOST,
                              db_port=5432, db_name=constants.DB)
    resp = po.response(player_id)
    return jsonify(resp)


@app.route('/roster/<team_id>')
def roster(team_id):
    po = get_players_by_team.PlayersByTeam(db_user=constants.DB_USER, db_pass='',
                                           db_host=constants.DB_HOST,
                                           db_port=5432, db_name=constants.DB)
    resp = po.response(team_id)
    return jsonify(resp)


@app.route('/teams')
def team_list():
    po = get_teams.GetTeams(db_user=constants.DB_USER, db_pass='',
                            db_host=constants.DB_HOST,
                            db_port=5432, db_name=constants.DB)
    resp = po.response()
    return jsonify(resp)


if __name__ == '__main__':
    app.run()

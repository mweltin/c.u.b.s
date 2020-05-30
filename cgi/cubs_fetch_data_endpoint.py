from flask import Flask, jsonify
import simplejson as json
import constants
import get_players_by_team
import get_teams
import get_player

app = Flask(__name__)


@app.route("/")
def index():
    return "flask working"


@app.route("/roster/<team_id>")
def roster(team_id):
    po = get_players_by_team.PlayersByTeam(
        db_user=constants.DB_USER,
        db_pass="",
        db_host=constants.DB_HOST,
        db_port=5432,
        db_name=constants.DB,
    )
    resp = po.response(team_id)
    return jsonify(resp)


@app.route("/teams")
def team_list():
    po = get_teams.GetTeams(
        db_user=constants.DB_USER,
        db_pass="",
        db_host=constants.DB_HOST,
        db_port=5432,
        db_name=constants.DB,
    )
    resp = po.response()
    return jsonify(resp)


@app.route("/player/<player_id>")
def player(player_id):
    po = get_player.PlayerData(
        player_id,
        db_user=constants.DB_USER,
        db_pass="",
        db_host=constants.DB_HOST,
        db_port=5432,
        db_name=constants.DB,
    )
    resp = po.get_player_bio()
    return jsonify(resp)


@app.route("/pitch_outcome/<player_id>")
def pitch_outcome(player_id):
    po = get_player.PlayerData(
        player_id,
        db_user=constants.DB_USER,
        db_pass="",
        db_host=constants.DB_HOST,
        db_port=5432,
        db_name=constants.DB,
    )
    resp = po.pitch_outcome()
    return jsonify(resp)


@app.route("/batting_average/<player_id>")
def batting_average(player_id):
    po = get_player.PlayerData(
        player_id,
        db_user=constants.DB_USER,
        db_pass="",
        db_host=constants.DB_HOST,
        db_port=5432,
        db_name=constants.DB,
    )
    resp = po.batting_average()
    return json.dumps(resp)


@app.route("/slugging/<player_id>")
def slugging(player_id):
    po = get_player.PlayerData(
        player_id,
        db_user=constants.DB_USER,
        db_pass="",
        db_host=constants.DB_HOST,
        db_port=5432,
        db_name=constants.DB,
    )
    resp = po.slugging()
    return jsonify(resp)


@app.route("/ops/<player_id>")
def on_base_plus_slugging(player_id):
    po = get_player.PlayerData(
        player_id,
        db_user=constants.DB_USER,
        db_pass="",
        db_host=constants.DB_HOST,
        db_port=5432,
        db_name=constants.DB,
    )
    resp = po.on_base_plus_slugging()
    return jsonify(resp)


if __name__ == "__main__":
    app.run()

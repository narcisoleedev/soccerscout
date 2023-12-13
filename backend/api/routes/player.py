from flask import jsonify
from api.app import app
from services.controllers.player import PlayerController


@app.route("/player", methods=["GET"])
def player_route():
    players = PlayerController.get_all()
    return jsonify(players=players), 200


@app.route("/player/<string:name>", methods=["GET"])
def player_name_route(name: str):
    players = PlayerController.get_by_name(name)
    return jsonify(players=players), 200

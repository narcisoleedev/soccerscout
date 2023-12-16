from flask import jsonify, request
from api.app import app
from services.controllers.analyze import AnalyzeController


@app.route("/analyze/group", methods=["POST"])
def player_route():
    payload = request.get_json()
    assert isinstance(payload, dict)
    try:
        league = payload.get("league")
        country = payload.get("country")
        position = payload.get("position")
        age_min = payload.get("age_min", 0)
        age_max = payload.get("age_min", 1000)
    except KeyError:
        return jsonify(msg="Erro no objeto de envio"), 400
    result = AnalyzeController.analyze(league, country, position, age_min, age_max)
    return jsonify(result=result), 200

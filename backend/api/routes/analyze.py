from flask import jsonify, request
from api.app import app
from services.controllers.analyze import AnalyzeController


@app.route("/analyze/group", methods=["POST"])
def group_route():
    payload = request.get_json()
    assert isinstance(payload, dict)
    try:
        league = payload.get("league")
        country = payload.get("country")
        position = payload.get("position")
        age_min = payload.get("age_min")
        age_max = payload.get("age_max")
    except KeyError:
        return jsonify(msg="Erro no objeto de envio"), 400
    result = AnalyzeController.analyze(league, country, position, age_min, age_max)
    if len(result) > 300:
        result = result[:300]
    return jsonify(result=result), 200

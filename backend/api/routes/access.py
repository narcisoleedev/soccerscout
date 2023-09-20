from flask import request, jsonify
from flask_jwt_extended import create_access_token
from flask_jwt_extended import create_refresh_token
from flask_jwt_extended import jwt_required, get_jwt_identity
from api.app import app, basic_auth
from services.controllers.user import UserController


@app.route("/access/create", methods=["POST"])
@basic_auth.required
def create_route():
    payload = request.get_json()
    assert isinstance(payload, dict)
    try:
        email = payload["email"]
        password = payload["password"]
        name = payload["name"]
    except KeyError:
        return jsonify({"msg": "Sending Object Error"}), 400
    UserController(email).create(password=password, name=name)
    return jsonify(msg="Created"), 201


@app.route("/access/login", methods=["POST"])
def login_route():
    payload = request.get_json()
    assert isinstance(payload, dict)
    try:
        email = payload["email"]
        password = payload["password"]
    except KeyError:
        return jsonify({"msg": "Sending Object Error"}), 400

    is_login = UserController(email=email).login(password)
    if is_login:
        identity = {"email": email}
        access_token = create_access_token(
            identity=identity, additional_headers=identity, fresh=True
        )
        refresh_token = create_refresh_token(identity=identity)
        response = {"accessToken": access_token, "refreshToken": refresh_token}
        return jsonify(response), 200
    return jsonify(msg="Unauthorized"), 401


@app.route("/access/refresh", methods=["POST"])
@jwt_required(refresh=True)
def refresh_access():
    identity = get_jwt_identity()
    access_token = create_access_token(
        identity=identity,
        additional_headers=identity,
        fresh=True,
    )
    refresh_token = create_refresh_token(identity=identity)
    return jsonify(accessToken=access_token, refreshToken=refresh_token), 200

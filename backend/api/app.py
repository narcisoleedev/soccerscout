from datetime import timedelta
from flask import Flask, render_template
from flask_caching import Cache
from flask_cors import CORS
from flask_basicauth import BasicAuth
from flask_jwt_extended import JWTManager
from consts import JWT_SECRET, ADMIN_USER, ADMIN_SECRET

app = Flask(__name__)
app.config["JWT_SECRET_KEY"] = JWT_SECRET
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=1)
app.config["JWT_REFRESH_TOKEN_EXPIRES"] = timedelta(hours=24)
app.config["BASIC_AUTH_USERNAME"] = ADMIN_USER
app.config["BASIC_AUTH_PASSWORD"] = ADMIN_SECRET


jwt = JWTManager(app)
cache = Cache(config={"CACHE_TYPE": "SimpleCache"})
cache.init_app(app)
CORS(app)
basic_auth = BasicAuth(app=app)


@app.route("/", methods=["GET"])
def root():
    return render_template("index.html")

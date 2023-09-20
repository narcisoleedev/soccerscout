from api.app import app
from services.database.connector import DatabaseManager


if __name__ == "__main__":
    DatabaseManager.migrate()
    app.run(host="0.0.0.0", port=8000, debug=True)

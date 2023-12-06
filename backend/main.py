from api.app import app
from services.database.connector import DatabaseManager


DatabaseManager.migrate()
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8749, debug=True)

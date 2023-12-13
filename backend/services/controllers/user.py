from hashlib import sha256
from sqlalchemy import select
from sqlalchemy.orm import aliased
from services.database.models.user import UserDao
from services.database.connector import DatabaseManager


class UserController:
    user = aliased(UserDao)

    def __init__(self, email: str) -> None:
        self.email = email

    def _get_hash(self, string: str):
        return sha256(string.encode()).hexdigest()

    def login(self, password: str):
        secret_hash = self._get_hash(password)
        query = select(self.user).where(
            (self.user.email == self.email) & (self.user.secret_hash == secret_hash)
        )
        response = DatabaseManager.session_execute_query(query, one_row=True)
        if response:
            return response[0]
        return None

    def create(self, password: str, name: str):
        user_dao = UserDao(
            email=self.email, name=name, secret_hash=self._get_hash(password)
        )
        DatabaseManager.session_insert_data([user_dao])

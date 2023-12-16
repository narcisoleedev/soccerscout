from sqlalchemy import select
from sqlalchemy.orm import aliased
from services.database.connector import DatabaseManager
from services.database.models.player import PlayerDao


class PlayerController:
    player_dao = aliased(PlayerDao)

    @classmethod
    def _format_player_dao(cls, player_dao: PlayerDao):
        player = player_dao.__dict__
        del player["_sa_instance_state"]
        return player

    @classmethod
    def get_all(cls) -> list[dict]:
        query = select(cls.player_dao)
        result = DatabaseManager.session_execute_query(query)
        result = [item[0] for item in result]
        return [cls._format_player_dao(player_dao) for player_dao in result]

    @classmethod
    def get_by_name(cls, name) -> list[PlayerDao]:
        query = select(cls.player_dao).where(cls.player_dao.name == name)
        result = DatabaseManager.session_execute_query(query)
        result = [item[0] for item in result]
        return [cls._format_player_dao(player_dao) for player_dao in result]

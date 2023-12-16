from datetime import datetime
from sqlalchemy import select, and_
from sqlalchemy.orm import aliased
from services.controllers.player import PlayerController
from services.database.models.club import ClubDao
from services.database.models.player import PlayerDao
from services.database.models.league import LeagueDao
from services.database.connector import DatabaseManager


class AnalyzeController:
    club_dao = aliased(ClubDao)
    league_dao = aliased(LeagueDao)
    player_dao = aliased(PlayerDao)

    @classmethod
    def _is_valid_player(
        cls, player: dict, position: str, age_min: int, age_max: int, country: str
    ):
        date_nasc = datetime.strptime(player.get("date_nasc", "01/01/2000"), "%d/%m/%Y")
        today = datetime.now()
        age = (
            today.year
            - date_nasc.year
            - ((today.month, today.day) < (date_nasc.month, date_nasc.day))
        )

        return (
            player.get("position", "") == position
            and age >= age_min
            and age <= age_max
            and player.get("nationality") == country
        )

    @classmethod
    def _get_valid_club(cls, league: str):
        query = select(cls.club_dao.id).where(cls.club_dao.id_league == league)
        result = DatabaseManager.session_execute_query(query)
        result = [item[0] for item in result]
        players = [cls._format_player_dao(player_dao) for player_dao in result]
        return

    @classmethod
    def analyze(
        cls, league: str, country: str, position: str, age_min: int, age_max: int
    ):
        players = PlayerController.get_all()
        return [
            player
            for player in players
            if cls._is_valid_player(player, position, age_min, age_max, country)
        ]

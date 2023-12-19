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
        cls,
        player: dict,
        position: str,
        age_min: int,
        age_max: int,
        country: str,
        league: list[str],
    ):
        date_nasc = datetime.strptime(player.get("date_nasc", "01/01/2000"), "%d/%m/%Y")
        today = datetime.now()
        age = (
            today.year
            - date_nasc.year
            - ((today.month, today.day) < (date_nasc.month, date_nasc.day))
        )

        is_position = player.get("position", "") in position if position else True
        is_country = player.get("nationality", "") in country if country else True
        
        if league:
            all_clubs = []
            for le in league:
                valid_clubs = cls._get_valid_club(le)
                all_clubs.extend(valid_clubs)
            is_club = player.get("id_club", 0) in all_clubs
        else:
            is_club = True
        age_min = int(age_min) or 0
        age_max = int(age_max) or 1000
        actions_avg = player.get("actions_avg", 0) > 0.001
        actions_value_avg = player.get("actions_value_avg", 0) > 0.001

        return (
            is_position
            and is_country
            and is_club
            and age >= age_min
            and age <= age_max
            and actions_avg
            and actions_value_avg
        )

    @classmethod
    def _get_valid_club(cls, league: str):
        query = select(cls.club_dao.id).where(cls.club_dao.id_league == league)
        result = DatabaseManager.session_execute_query(query)
        return [item[0] for item in result]

    @classmethod
    def analyze(
        cls, league: list[str], country: list[str], position: list[str], age_min: int, age_max: int
    ):
        players = PlayerController.get_all()
        return [
            player
            for player in players
            if cls._is_valid_player(player, position, age_min, age_max, country, league)
        ]

from sqlalchemy.orm import declarative_base
from sqlalchemy import Column, String, BigInteger, DateTime, Float

Table = declarative_base()


class PlayerDao(Table):
    __tablename__ = "player"
    id = Column(BigInteger, primary_key=True)
    name = Column(String(50))
    position = Column(String(20))
    date_nasc = Column(DateTime())
    nationality = Column(String(50))
    market_value = Column(BigInteger)
    assist_avg = Column(Float)
    goals_avg = Column(Float)
    actions_avg = Column(Float)
    actions_value_avg = Column(Float)
    id_club = Column(BigInteger)

    @staticmethod
    def migrate(engine):
        Table.metadata.create_all(engine)

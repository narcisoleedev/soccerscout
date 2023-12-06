from sqlalchemy.orm import declarative_base
from sqlalchemy import Column, String, BigInteger

Table = declarative_base()


class LeagueDao(Table):
    __tablename__ = "league"
    id = Column(BigInteger, primary_key=True)
    name = Column(String(50))
    country = Column(String(50))
    
    @staticmethod
    def migrate(engine):
        Table.metadata.create_all(engine)

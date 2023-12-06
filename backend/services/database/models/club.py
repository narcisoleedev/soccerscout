from sqlalchemy.orm import declarative_base
from sqlalchemy import Column, String, BigInteger

Table = declarative_base()


class ClubDao(Table):
    __tablename__ = "club"
    id = Column(BigInteger, primary_key=True)
    name = Column(String(50))
    id_league = Column(BigInteger)
    
    @staticmethod
    def migrate(engine):
        Table.metadata.create_all(engine)

from sqlalchemy.orm import declarative_base
from sqlalchemy import Column, Text, String, BigInteger

Table = declarative_base()


class UserDao(Table):
    __tablename__ = "user"
    id = Column(BigInteger, primary_key=True, autoincrement=True)
    email = Column(String(120))
    name = Column(String(120))
    secret_hash = Column(Text)

    @staticmethod
    def migrate(engine):
        Table.metadata.create_all(engine)

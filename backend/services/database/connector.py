from sqlalchemy.engine import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy import Executable
from consts import DATABASE_URI
from services.database.models.user import UserDao

engine = create_engine(
    url=DATABASE_URI, enable_from_linting=False, echo=False, pool_pre_ping=True
)


class DatabaseManager:
    engine = engine

    @classmethod
    def session_insert_data(cls, entities: list):
        Session = sessionmaker(bind=cls.engine)
        with Session() as session:
            session.add_all(entities)
            session.commit()
            session.expunge_all()
            session.close()

    @classmethod
    def session_execute_query(cls, query: Executable, one_row=False):
        Session = sessionmaker(bind=cls.engine)
        with Session() as session:
            if one_row:
                result = session.execute(query).fetchone()
            else:
                result = session.execute(query).fetchall()
            session.close()
            return result

    @classmethod
    def session_execute_statement(cls, statement: Executable):
        Session = sessionmaker(bind=cls.engine)
        with Session() as session:
            session.execute(statement)
            session.commit()
            session.close()

    @classmethod
    def migrate(
        cls,
    ):
        UserDao.migrate(cls.engine)
 
import pandas as pd
from services.database.connector import DATABASE_URI

club = pd.read_csv("./csvs/club.csv", sep="|")
jogadores = pd.read_csv("./csvs/teste.csv", sep="|")
ligas = pd.read_csv("./csvs/ligas.csv", sep="|")

club.to_sql("club", con=DATABASE_URI)
jogadores.to_sql("player", con=DATABASE_URI)
ligas.to_sql("league", con=DATABASE_URI)

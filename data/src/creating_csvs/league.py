import os
import pandas as pd
data = {
    'id': range(1, 15),
    'name': ["FA Women's Super League", 'Premier League', 'Champions League', "UEFA Women's Euro", 'UEFA Euro', 'Ligue 1', 'Bundesliga', 'La Liga', 'NWSL', 'Serie A', 'Indian Super league', 'FIFA World Cup', "Women's World Cup", "Liga Profesional"],
    'country': ['England', 'England', 'Europe', 'Europe', 'Europe', 'France', 'Germany', 'Spain', 'United States of America', 'Italy', 'India', 'International', 'International', 'Argentina']
}

df = pd.DataFrame(data)

df.to_csv('ligas.csv', sep="|", index=False)
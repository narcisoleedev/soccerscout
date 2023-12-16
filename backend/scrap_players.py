import pandas as pd
from time import sleep
from plugins.scraping.webengine import WebEngine
from services.controllers.player import PlayerController

BASE_URL = "https://www.transfermarkt.com/"
SEARCH_STR = "schnellsuche/ergebnis/schnellsuche?query={}"
players = PlayerController.get_all()

good_place = []
good_columns = ["name", "age", "country", "value"]
bad_place = []
bad_columns = ["name", "error"]
connection_errors = []

for player in players:
    name = str(player.get("name", "")).lower()
    search = f"{BASE_URL}{SEARCH_STR.format(name)}"
    try:
        html = WebEngine(engine="driver").get_html(url=search)
        soup = WebEngine.parse_html(html)
        result = soup.select("tbody tr td ")
    except Exception as error:
        connection_errors.append((player.get("name", ""), error))
        print((player.get("name", ""), error))
        sleep(10)
    try:
        print(
            (
                player.get("name", ""),
                result[6].contents[0],
                result[7].contents[0]["title"],
                result[8].contents[0],
            )
        )
        good_place.append(
            (
                player.get("name", ""),
                result[6].contents[0],
                result[7].contents[0]["title"],
                result[8].contents[0],
            )
        )
    except Exception as error:
        bad_place.append((player.get("name", ""), error))
        continue


dataframe_good = pd.DataFrame(data=good_place, columns=good_columns)
dataframe_bad = pd.DataFrame(data=bad_place, columns=bad_columns)
dataframe_retry = pd.DataFrame(data=connection_errors, columns=bad_columns)
print(dataframe_good)
print(dataframe_bad)
print(dataframe_retry)
dataframe_good.to_csv("good.csv", index=False, sep="|")
dataframe_bad.to_csv("bad.csv", index=False, sep="|")
dataframe_retry.to_csv("retry.csv", index=False, sep="|")

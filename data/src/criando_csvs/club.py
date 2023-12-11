import os
import pandas as pd

# 1|FA Women's Super League|England
# 2|Premier League|England
# 3|Champions League|Europe
# 4|UEFA Women's Euro|Europe
# 5|UEFA Euro|Europe
# 6|Ligue 1|France
# 7|1. Bundesliga|Germany
# 8|La Liga|Spain
# 9|NWSL|United States of America
# 10|Serie A|Italy
# 11|Indian Super league|India
# 12|FIFA World Cup|International
# 13|Women's World Cup|International

dicionario = {
    "FA Women's Super League": 1,
    "Premier League": 2,
    "Champions League": 3,
    "UEFA Women's Euro": 4,
    "UEFA Euro": 5,
    "Ligue 1": 6,
    "1. Bundesliga": 7,
    "La Liga": 8,
    "NWSL": 9,
    "Serie A": 10,
    "Indian Super league": 11,
    "FIFA World Cup": 12,
    "Women's World Cup": 13
}

dicionario_time = dict()

def search_id_and_name(df):

    time1_id = df.loc[1]["team.id"]
    time1_name = df.loc[1]["team.name"]
    indice = 2
    
    while(df.loc[indice]["team.id"] == time1_id):
        indice+=1
    time2_id = df.loc[indice]["team.id"]
    time2_name = df.loc[indice]["team.name"]
    
    return time1_id,time1_name,time2_id,time2_name

def add_club(path):
    global dicionario
    caminho_split = path.split('/')
    liga = caminho_split[-2]
    df = pd.read_csv(path,sep="|")
    time1_id, time1_name, time2_id, time2_name = search_id_and_name(df)
    
    if time1_id not in dicionario_time:
        dicionario_time[time1_id] = [time1_id,time1_name,liga]
    if time2_id not in dicionario_time:
        dicionario_time[time2_id] = [time2_id,time2_name,liga]

feitos = 0
def listProcData(path):
    global feitos
    for item in os.listdir(path):
        if os.path.isdir(path+'/'+item):
            subPath = path+'/'+item
            listProcData(subPath)
        else:
            feitos+=1
            print(feitos)
            subPath = path+'/'+item                        
            add_club(subPath)

listProcData("../../org-data/")

data = dict_temp = {
                "id": int,
                "name": [],
                "id_league": int
    }

df = pd.DataFrame(data)

for chave in dicionario_time:
    
    dict_temp = {
                "id":dicionario_time[chave][0],
                "name":dicionario_time[chave][1],
                "id_league":dicionario[dicionario_time[chave][2]]
    }

    df = df._append(dict_temp,ignore_index=True)

df.to_csv("club.csv", sep="|", index=False)

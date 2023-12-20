import os
import pandas as pd


dicionario_jogadores = dict()

def add_club(path):

    global dicionario_jogadores
    
    df = pd.read_csv(path,sep="|")
    
    for _, linha in df.iterrows():
        try:
            if linha["player.id"] not in dicionario_jogadores:
                data_temp = {
                    "id": int(linha["player.id"]),
                    "name": linha["player.name"],
                    "position": linha["position.name"],
                    "id_club": linha["team.id"],
                    "date_nasc": "None",
                    "nationality": "None",
                    "market_value": "None",
                    "assist_avg":"None",
                    "goals_avg":"None",
                    "actions_avg":"None",
                    "actions_value_avg":"None",   
                    "rating_avg":"None"   
                    }
                
                dicionario_jogadores[linha["player.id"]] = data_temp
        except:
            pass
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

data = {

        "id": int,
        "name": [],
        "position": [],
        "id_club":int,
        "date_nasc": [],
        "nationality": [],
        "market_value": [],
        "assist_avg":[],
        "goals_avg":[],
        "actions_avg":[],
        "actions_value_avg":[],
        "rating_avg":[]
    }

df = pd.DataFrame(data)

for chave in dicionario_jogadores:
    
    df = df._append(dicionario_jogadores[chave],ignore_index=True)

df.to_csv("jogadores.csv", sep="|", index=False)
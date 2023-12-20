import pandas as pd
import os

def get_assist(df,indice):
    try:
        return (get_goals(df.loc[indice+1]) and (df.loc[indice+1]["Team"] == df.loc[indice]["Team"])) 
    except:
        return False

def get_goals(linha):
    return (linha["Type_id"] in [11,12] and linha["Result_id"] == 1)

def popula_dict(path) -> None:
    
    global dict_jogadores
    df = pd.read_csv(path, sep="|")
    lista_jogadores = []
    
    for indice,linha in df.iterrows():
        jogador = linha["Player"]
        if jogador not in lista_jogadores:
            lista_jogadores.append(jogador)
        #num_actions
        dict_jogadores[jogador]["sum_actions"] += 1
        #vaep
        dict_jogadores[jogador]["sum_vaep"] += linha["vaep"]
        #Goals
        if(get_goals(linha) == True):
            dict_jogadores[jogador]["goals"] += 1
        #Assist
        if (get_assist(df,indice) == True):
            dict_jogadores[jogador]["assist"] += 1
    
    #Num_partidas
    for jogador_temp in lista_jogadores:
        dict_jogadores[jogador_temp]["num_partidas"] += 1

feitos = 0
def teste(path):
    #List all itens in the proc-data dir
    
    for item in os.listdir(path):
        #If the item on listdir is not a csv file it will recursively go to the next dir.

        if os.path.isdir(path+'/'+item):
            subPath = path+'/'+item
            teste(subPath)
        #If it is it will insert the features and the labels
        else:
            global feitos 
            feitos += 1                            
            popula_dict(path+'/'+item)
            print(feitos)            

def init_jogadores(path:str)->dict:
    df = pd.read_csv(path,sep="|")
    dicionario = dict()
    for _,linha in df.iterrows():
        #print(linha)
        dicionario[linha["id"]] = {
                                   "id": linha["id"],
                                   "name": linha["name"],
                                   "position": linha["position"],
                                   "id_club": linha["id_club"],
                                   "date_nasc": "01/01/2000",
                                   "nationality": "None",
                                   "market_value": "None",
                                   "assist":0,
                                   "goals":0,
                                   "num_partidas":0,
                                   "sum_actions":0,
                                   "sum_vaep":0
                                    }
    return dicionario

def fix_dict():
    new_dict = dict()
    global dict_jogadores
    for chave in dict_jogadores:
        try:
            new_dict[chave] = {
                        "id":dict_jogadores[chave]["id"],
                        "name":dict_jogadores[chave]["name"],
                        "position":dict_jogadores[chave]["position"],
                        "id_club":dict_jogadores[chave]["id_club"],
                        "date_nasc":dict_jogadores[chave]["date_nasc"],
                        "nationality":dict_jogadores[chave]["nationality"],
                        "market_value":dict_jogadores[chave]["market_value"],
                        "assist_avg":dict_jogadores[chave]["assist"]/dict_jogadores[chave]["num_partidas"],
                        "goals_avg":dict_jogadores[chave]["goals"]/dict_jogadores[chave]["num_partidas"],
                        "actions_avg":dict_jogadores[chave]["sum_actions"]/dict_jogadores[chave]["num_partidas"],
                        "actions_value_avg":dict_jogadores[chave]["sum_vaep"]/dict_jogadores[chave]["sum_actions"],
                        "rating_avg":dict_jogadores[chave]["sum_vaep"]/dict_jogadores[chave]["num_partidas"]
                        }

        except ZeroDivisionError:
            new_dict[chave] = {
                        "id":dict_jogadores[chave]["id"],
                        "name":dict_jogadores[chave]["name"],
                        "position":dict_jogadores[chave]["position"],
                        "id_club":dict_jogadores[chave]["id_club"],
                        "date_nasc":dict_jogadores[chave]["date_nasc"],
                        "nationality":dict_jogadores[chave]["nationality"],
                        "market_value":dict_jogadores[chave]["market_value"],
                        "assist_avg":0,
                        "goals_avg":0,
                        "actions_avg":0,
                        "actions_value_avg":0,
                        "rating_avg":0
            }

            
    return new_dict

dict_jogadores = init_jogadores("jogadores.csv")

teste("../../last-data/")

#print(dict_jogadores)

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

dicionario_jogadores = fix_dict()

for chave in dicionario_jogadores:
    
    df = df._append(dicionario_jogadores[chave],ignore_index=True)

df.to_csv("jogadores_2.csv", sep="|", index=False)
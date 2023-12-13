import os
import numpy as np
import pandas as pd

path = os.path.abspath('../')+'/prob-data'
def home_team(df):
    return df.loc[1, 'Team']

def next(x :pd.DataFrame):
    prev_x = x.shift(1)
    prev_x[:1] = x.values[0]
    return prev_x

def vaepAndFormat(path):
    df = pd.read_csv(path, sep='|')
    home = home_team(df)
    labels = ['Scores', 'Concedes']
    for l in labels:
        df[f'delta{l}'] = df[f'probabilities{l}'].diff()
        df[f'delta{l}'] =  df[f'delta{l}'].fillna(0)
    
    df['vaep_home'] = df['deltaScores']-df['deltaConcedes']
    df['vaep_away'] = -df['deltaScores']+df['deltaConcedes']        
    
    df['vaep'] = np.where(df['Team'] == home, df['deltaScores'] - df['deltaConcedes'], -df['deltaScores'] + df['deltaConcedes'])
    
    #df['vaep'] = np.where(((df['Result_id'] == 1) & ((df["Type_id"] == 11)|(df["Type_id"] == 21))) | (df['Result_id'] == 3), 0, df['vaep'].shift(-1))
    
    condition = (((df['Result_id'] == 1) & (df['Type_id'] == 11))) | (df['Result_id'] == 3) | (df['Type_id'] == 12)
    print(condition)
    linhas_condicao_verdadeira = df[condition].index

    # Iterar sobre essas linhas e alterar o valor na linha seguinte
    for indice in linhas_condicao_verdadeira:
        if indice + 1 < len(df):  # Verificar se há uma linha seguinte
            if df.at[indice+1,"Team"] == home:
                df.at[indice + 1, 'vaep'] = df.at[indice+1,'deltaScores']
            else:
                df.at[indice + 1, 'vaep'] = df.at[indice+1,'deltaConcedes']
            
    # Crie uma nova coluna 'vaep' com os valores deslocados
    #df["vaep"] = np.where(condition == True, df.shift(-1) = 0, df["vaep"])

    columns = [
       
       'Player', 'Team',"Type_id","Result_id" ,'probabilitiesScores',
       'probabilitiesConcedes', 'deltaScores', 'deltaConcedes',
       "vaep"
       
       ]
    
    df = df[columns]
    
    return df

feitos = 0

def listProcData(path):
    #List all itens in the proc-data dir
    global feitos
    path_temp = path
    path_temp = path_temp.replace("prob-data", "last-data")
            
    if not os.path.exists(path_temp) and os.path.isdir(path):
        os.mkdir(path_temp)   

    for item in os.listdir(path):
        #If the item on listdir is not a csv file it will recursively go to the next dir.
        if os.path.isdir(path+'/'+item):
            subPath = path+'/'+item
            listProcData(subPath)
        #If it is it will insert the features and the labels
        else:            
            
            if os.path.exists(path_temp+"/"+item):
                
                feitos += 1
                print(feitos)

            else:
                
                df = vaepAndFormat(path+'/'+item)
                df.to_csv(path_temp+'/'+item, sep='|', index=False)
                feitos += 1
                print(feitos)

if os.path.exists("../last-data") == False:
    os.mkdir("../last-data")
    
listProcData(path)
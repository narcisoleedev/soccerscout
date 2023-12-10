import os
import numpy as np
import pandas as pd

path = os.path.abspath('../')+'/feature-data'

def vaepAndFormat(path):
    df = pd.read_csv(path, sep='|')
    labels = ['Scores', 'Concedes']
    for l in labels:
        df[f'delta{l}'] = df[f'probabilities{l}'].diff()
        df[f'delta{l}'] =  df[f'delta{l}'].fillna(0)
    df['vaep'] = df['deltaScores']-df['deltaConcedes']
    print(df[df['vaep']>0.2])
    columns = ['id', 'Period', 'Time',
       'Player', 'Team', 'Type_id', 'BodyPart_id', 'Result_id',
       'time_delta_1', 'time_delta_2', 'probabilitiesScores',
       'probabilitiesConcedes', 'deltaScores', 'deltaConcedes',
       'vaep']
    df = df[columns]
    df.to_csv(path, sep='|', index = False)

def listProcData(path):
    #List all itens in the proc-data dir
    for item in os.listdir(path):
        #If the item on listdir is not a csv file it will recursively go to the next dir.
        if os.path.isdir(path+'/'+item):
            subPath = path+'/'+item
            listProcData(subPath)
        #If it is it will insert the features and the labels
        else:            
            vaepAndFormat(path+'/'+item)

listProcData(path)
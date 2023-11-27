import os
import numpy as np
import pandas as pd
from catboost import CatBoostClassifier, Pool

#Path
path = os.path.abspath('../')+'/proc-data'

#Labels
labels = ['Scores', 'Concedes']

def loadModel():
    model = CatBoostClassifier()
    models = {}
    for l in labels:
        models[l] = model.load_model(f'./models/model-{l}.cbm', format='cbm')
    return models

def calculateProbabilities(filePath, models):
    df = pd.read_csv(filePath, sep='|')
    df.fillna(False)
    string_features = []
    for c in df.columns:
        if(df[c].dtypes=='bool'):
            """df[c] = df[c]*100
            df[c] = df[c].astype(int)"""
            #print('ze da manga')
            df[c] = df[c].astype(int)
        elif(df[c].dtypes=='object'):
            #string_features.append(df.columns.get_loc(c))
            string_features.append(df.columns.get_loc(c))
            #print((c))
    #print(df.dtypes)
    #print(string_features)
    pools = {}
    #df['sP'] = ""
    #df['cP'] = ""
    predicts = {}
    probabilities = {}
    for l in labels:
        data = df.drop(columns=labels)
        pool = Pool(data=data, label=df[l], cat_features=string_features)
        pools[l] = pool
        predicts[l]=models[l].predict(pools[l])
        probabilities[l]=models[l].predict_proba(pools[l])
    print((probabilities['Scores']).shape)
    for l in labels:
        df[f'predicts{l}'] = predicts[l]
        df[f'probabilities{l}'] = (probabilities[l])[:, 1]
    column_names = [
    'id', 'Period', 'Time', 'Start_x', 'Start_y', 'End_x', 'End_y', 'Player', 'Team', 'Type_name',
    'BodyPart_name', 'Result_name', 'Type_id', 'BodyPart_id', 'Result_id', 'time_delta_1', 'time_delta_2',
    'dx_a01', 'dy_a01', 'mov_a01', 'dx_a02', 'dy_a02', 'mov_a02', 'team_1', 'team_2', 'goalscore_team',
    'goalscore_opponent', 'goalscore_diff', 'result_fail', 'result_success', 'result_offside', 'result_owngoal',
    'result_yellow_card', 'result_red_card', 'bodypart_foot', 'bodypart_head', 'bodypart_other', 'bodypart_head/other',
    'bodypart_foot_left', 'bodypart_foot_right',
    'Scores', 'Concedes', 'predictsScores', 'probabilitiesScores', 'predictsConcedes', 'probabilitiesConcedes'
]
    df = df[column_names]
    df.to_csv(filePath, sep='|')
    with open('erros.txt', "w") as file:
        for index, row in df.iterrows():
            pintoduro = row['probabilitiesScores'] + '' + row['predictScores']
            file.write(f'{pintoduro}\n')

def listProcData(path)->None:
    #List all itens in the proc-data dir
    models = loadModel()
    for item in os.listdir(path):
        #If the item on listdir is not a csv file it will recursively go to the next dir.
        if os.path.isdir(path+'/'+item):
            subPath = path+'/'+item
            listProcData(subPath)
        #If it is it will insert the features
        else:
            calculateProbabilities(path+'/'+item, models)

listProcData(path)
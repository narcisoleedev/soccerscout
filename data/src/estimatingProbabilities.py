import os
import numpy as np
import pandas as pd
from catboost import CatBoostClassifier, Pool

#Path
path = os.path.abspath('../')+'/feature-data'

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
    'BodyPart_name', 'Result_name','Scores', 'Concedes', 'predictsScores', 'probabilitiesScores', 'predictsConcedes', 'probabilitiesConcedes'
]
    df = df[column_names]
    return df   

def listProcData(path)->None:
    #List all itens in the proc-data dir
    models = loadModel()

    new_name_dir = path.replace("feature-data", "prob-data")
    
    if not os.path.exists(new_name_dir) and os.path.isdir(path):
        os.mkdir(new_name_dir)   

    for item in os.listdir(path):
        #If the item on listdir is not a csv file it will recursively go to the next dir.
        if os.path.isdir(path+'/'+item):
            subPath = path+'/'+item
            listProcData(subPath)

        #If it is it will insert the features
        else:

            path_temp = path
            path_temp = path_temp.replace("feature-data", "prob-data")
            
            if os.path.exists(path_temp+"/"+item):
                print("Já existe")
            
            else:
                df = calculateProbabilities(path+'/'+item, models)
                df.to_csv(path_temp+'/'+item, sep='|')

listProcData(path)
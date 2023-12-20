import os
import numpy as np
import pandas as pd
from catboost import CatBoostClassifier, Pool

#Path
path = os.path.abspath('../')+'/proc-data'

#Labels
labels = ['Scores', 'Concedes']

def loadModel():
    model1 = CatBoostClassifier()
    model2 = CatBoostClassifier()

    model1.load_model('./models/model-Scores.cbm', format='cbm')
    model2.load_model('./models/model-Concedes.cbm', format='cbm')

    models = {}

    # for l in labels:
    #     models[l] = model.load_model(f'./models/model-{l}.cbm', format='cbm')

    models["Scores"] = model1
    models["Concedes"] = model2

    return models

def calculateProbabilities(filePath, models):
    
    df = pd.read_csv(filePath, sep='|')
    df.loc[(df['Type_id']==11) & (df['Result_id']==1), 'Result_id'] = 0
    df.fillna(False)
    string_features = []
    for c in df.columns:
        if(df[c].dtypes=='bool'):
            df[c] = df[c].astype(int)
        elif(df[c].dtypes=='object'):            
            string_features.append(df.columns.get_loc(c))
            #print((c))
    pools = {}
    predicts = {}
    probabilities = {}
    for l in labels:
        data = df.drop(columns=labels)
        pool = Pool(data=data, label=df[l], cat_features=string_features)
        pools[l] = pool
        predicts[l]=models[l].predict(pools[l])
        probabilities[l]=models[l].predict_proba(pools[l])
    
    for l in labels:
        df[f'predicts{l}'] = predicts[l]
        df[f'probabilities{l}'] = (probabilities[l])[:, 1]
    column_names = ['Type_id','BodyPart_id', 'Result_id', 'Period', 'Time', 'Start_x', 'Start_y', 'End_x', 'End_y', 'Player', 'Team','Scores', 'Concedes', 'predictsScores', 'probabilitiesScores', 'predictsConcedes', 'probabilitiesConcedes']
    df = df[column_names]
    return df   

def listProcData(path)->None:
    #List all itens in the proc-data dir
    models = loadModel()

    new_name_dir = path.replace("proc-data", "prob-data")

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
            path_temp = path_temp.replace("proc-data", "prob-data")
            
            if os.path.exists(path_temp+"/"+item):
                print("Já existe")
            
            else:
                df = calculateProbabilities(path+'/'+item, models)
                df.to_csv(path_temp+'/'+item, sep='|')

listProcData(path)
import os
import numpy as np
import pandas as pd
from catboost import CatBoostClassifier, Pool

#Path
path = os.path.abspath('../')+'/proc-data'

def listProcData(path)->None:
    #List all itens in the proc-data dir
    for item in os.listdir(path):
        #If the item on listdir is not a csv file it will recursively go to the next dir.
        if os.path.isdir(path+'/'+item):
            subPath = path+'/'+item
            listProcData(subPath)
        #If it is it will insert the features
        else:
            df = pd.read_csv(path+'/'+item, sep='|')
            with open('erros.txt', 'w') as f:
                for i, r in df.iterrows():
                    pinto = r['probabilitiesScores'] 
                    buceta = r['predictsScores'] 
                    cu = r['Scores']
                    f.write(f'{pinto} {buceta} {cu} \n')

listProcData(path)
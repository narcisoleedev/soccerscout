import os
import pandas as pd
from add_features import features
from add_labels import labels

#Path to proc-data
path = os.path.abspath('../')+'/proc-data'

def listProcData(path):
    #List all itens in the proc-data dir
    for item in os.listdir(path):
        #If the item on listdir is not a csv file it will recursively go to the next dir.
        print(item)
        if os.path.isdir(path+'/'+item):
            subPath = path+'/'+item
            listProcData(subPath)
        #If it is it will insert the features and the labels
        else:
            df = pd.read_csv(path+'/'+item, sep='|')
            features(df)
            labels(df)
            df.to_csv(path+'/'+item, sep='|', index=False)

listProcData(path)
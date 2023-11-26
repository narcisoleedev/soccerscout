import os
import pandas as pd
import add_features 
import add_labels

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
            df = add_features.features(path+'/'+item)
            df_labels = add_labels.labels(path+'/'+item)
            df = pd.concat([df, df_labels[['Scores', 'Concedes']]], axis=1)
            #df = pd.get_dummies(df, columns=df.columns)
            df.to_csv(path+'/'+item, sep='|', index=False)

listProcData(path)
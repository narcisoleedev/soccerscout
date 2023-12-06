#Author: narcisoleedev

import os
import random 
import numpy as np
import pandas as pd
from catboost import CatBoostClassifier, Pool
from sklearn.model_selection import train_test_split
from sklearn.metrics import confusion_matrix
import matplotlib.pyplot as plt
import seaborn as sb

#Path
path = os.path.abspath('../')+'/proc-data'

#List of files
files = []

#There are a loooooot of files, so we're gonna take just 20% of them
def trainModel():
    training_files = random.sample(files, int(0.2 * len(files)))
    training_data = pd.DataFrame({})
    for file in training_files:
        df = pd.read_csv(file, sep='|')
        training_data = pd.concat([training_data, df], ignore_index=True)

    #I am going to split the features and labels in the training_data:
    training_features = training_data.drop(columns=['Scores', 'Concedes'])
    for c in training_features.columns:
        if(training_features[c].dtypes==bool):
            training_features[c] = training_features[c].astype(int)
    training_labels = training_data[['Scores', 'Concedes']]

    #Spliter#
    string_features = []
    for c in training_features.columns:
        #print(training_features[c].dtypes)
        if(training_features[c].dtypes=='object'):
            string_features.append(training_features.columns.get_loc(c))
    print(string_features)
    X_train, X_test, Y_train, Y_test = train_test_split(training_features, training_labels, test_size=0.25, random_state=40)
    model = CatBoostClassifier(iterations=100, depth=10, learning_rate=0.05)
    models = {}
    train_pools = {}
    for c in training_labels.columns:
        train_pool = Pool(data=(X_train), label=np.array(Y_train[c]).ravel(), cat_features=string_features)
        train_pools[c] = train_pool
        models[c] = model.fit(train_pool)
    
    #Evaluation
    for c in training_labels.columns:
        accuracy = models[c].score(X_test, (Y_test[c].astype(str)))
        print(Y_test[c])
        print(f"Model Accuracy for 20% of all matches: {accuracy}")
        #Consufion matrix
        Y_pred = {}
        prob = {}
        Y_pred[c] = models[c].predict(X_test)
        matrix = confusion_matrix(Y_test[c].astype(str), Y_pred[c].astype(str))
        models[c].save_model(f'./models/model-{c}.cbm', format="cbm")
        #else:
        #    os.mkdir('./models/')
        #    models[c].save_model(f'./models/model-{c}.csv', format="cbm", pool=train_pools[c])
   


def listProcData(path)->None:
    #List all itens in the proc-data dir
    for item in os.listdir(path):
        #If the item on listdir is not a csv file it will recursively go to the next dir.
        if os.path.isdir(path+'/'+item):
            subPath = path+'/'+item
            listProcData(subPath)
        #If it is it will insert the features
        else:
            files.append(path+'/'+item)

listProcData(path)
trainModel()

import os
import random 
import pandas as pd
from catboost import CatBoostClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import confusion_matrix
import matplotlib.pyplot as plt
import seaborn as sb

#Path
path = os.path.abspath('../')+'proc_data'

#List of files
files = []

#There are a loooooot of files, so we're gonna take just 20% of them
def trainModel():
    training_files = random.sample(files, int(0.2)*len(files))
    for file in training_files:
        df = pd.read_csv(file)
        training_data = pd.concat([training_data, df], ignore_index=True)

    #I am going to split the features and labels in the training_data:
    training_features = training_data.drop('label', axis=1)
    training_labels = training_data['label']

    #Spliter
    X_train, X_test, Y_train, Y_test = train_test_split(training_features, training_labels, test_size=0.25, random_state=40)
    model = CatBoostClassifier(iterations=100, depth=10, learning_rate=0.05, loss_function='LogLoss')
    model.fit(X_test, Y_test)
    
    #Evaluation
    accuracy = model.score(X_test, Y_test)
    print(f"Model Accuracy for 20% of all matches: {accuracy}")

    #Consufion matrix
    Y_pred = model.predict(X_test)
    matrix = confusion_matrix(Y_test, Y_pred)
    plt.figure(figsize=(8,8))
    plt.title('Confusion Matrix')
    sb.heatmap(matrix)

def listProcData(path)->None:
    #List all itens in the proc-data dir
    for item in os.listdir(path):
        #If the item on listdir is not a csv file it will recursively go to the next dir.
        print(item)
        if os.path.isdir(path+'/'+item):
            subPath = path+'/'+item
            listProcData(subPath)
        #If it is it will insert the features
        else:
            files.push(path+'/'+item)

listProcData(path)
#Author: narcisoleedev
import os
import pandas as pd
import add_features 
import add_labels

#Path to proc-data


path = os.path.abspath('../')+'/proc-data'

feitos = 0

def listProcData(path):
    #List all itens in the proc-data dir
    new_name_dir = path.replace("proc-data", "feature-data")
    global feitos
    if not os.path.exists(new_name_dir) and os.path.isdir(path):
        os.mkdir(new_name_dir)   

    for item in os.listdir(path):
        #If the item on listdir is not a csv file it will recursively go to the next dir.
        #print(item)
        if os.path.isdir(path+'/'+item):
            subPath = path+'/'+item
            listProcData(subPath)

        #If it is it will insert the features and the labels
        else:            
            path_temp = path
            path_temp = path_temp.replace("proc-data", "feature-data")
            if os.path.exists(path_temp+"/"+item):
                
                feitos += 1
                print(feitos)
            
            else:
        
                df = pd.read_csv(path+'/'+item, sep='|')
                df = add_features.features(path+'/'+item)
                df_labels = add_labels.labels(path+'/'+item)
                df = pd.concat([df, df_labels[['Scores', 'Concedes']]], axis=1)
                #df = pd.get_dummies(df, columns=df.columns)

                df.to_csv(path_temp+'/'+item, sep='|', index=False)
                feitos += 1
                print(feitos)

listProcData(path)
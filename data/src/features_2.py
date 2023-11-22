import os
import numpy as np
import pandas as pd
import math 
import ast

#Path to proc-data
path = os.path.abspath('../')+'/proc-data'

def complexFeatures(df):
    if df['EndLoc'] is not np.nan:
        startLoc = ast.literal_eval(df['StartLoc'])
        endLoc = ast.literal_eval(df['EndLoc'])
        goalPos = {
            'home': [0.0, 34.0],
            'away': [105.0, 34.0],
        }      
       #We're gonna add a little trick to calculate atan of the angle. Since there are only one decimal in the float columns, 
       #we're gonna add 0.01 to the divisors so there won't be a division by 0 error :)
        df['startLocAngHome'] = math.atan(abs(goalPos['home'][0]-float(startLoc[0]))/abs(goalPos['home'][1]-float(startLoc[1]))+0.01)
        df['startLocAngAway'] = math.atan(abs(goalPos['away'][0]-float(startLoc[0]))/abs(goalPos['away'][1]-float(startLoc[1]))+0.01)
        df['startLocDistHome'] = math.sqrt(math.pow((goalPos['home'])[0]-float(startLoc[0]), 2)+math.pow((goalPos['home'])[1]-float(startLoc[1]), 2))
        df['startLocDistAway'] = math.sqrt(math.pow((goalPos['away'])[0]-float(startLoc[0]), 2)+math.pow((goalPos['away'])[1]-float(startLoc[1]), 2))
        df['endLocAngHome'] = math.atan(abs(goalPos['home'][0]-float(endLoc[0]))/abs(goalPos['home'][1]-float(endLoc[1]))+0.01)
        df['endLocAngAway'] = math.atan(abs(goalPos['away'][0]-float(endLoc[0]))/abs(goalPos['away'][1]-float(endLoc[1]))+0.01)
        df['endLocDistHome'] = math.sqrt(math.pow((goalPos['home'])[0]-float(endLoc[0]), 2)+math.pow((goalPos['home'])[1]-float(endLoc[1]), 2))
        df['endLocDistAway'] = math.sqrt(math.pow((goalPos['away'])[0]-float(endLoc[0]), 2)+math.pow((goalPos['away'])[1]-float(endLoc[1]), 2))
        df['distCoveredX'] = abs(float(startLoc[0])-float(endLoc[0]))
        df['distCoveredY'] = abs(float(startLoc[1])-float(endLoc[1]))
        return df
def listProcData(path):
    #List all itens in the proc-data dir
    for item in os.listdir(path):
        #If the item on listdir is not a csv file it will recursively go to the next dir.
        print(item)
        if os.path.isdir(path+'/'+item):
            subPath = path+'/'+item
            listProcData(subPath)
        #If it is it will insert the features
        else:
            df = pd.read_csv(path+'/'+item, sep='|')
            for c in ['startLocAngAway', 'startLocAngHome', 'startLocDistHome', 'startLocDistAway', 'endLocAngHome', 'endLocAngAway', 'endLocDistHome', 'endLocDistAway', 'distCoveredX', 'distCoveredY']:
                df[c]=''
            df = df.apply(complexFeatures, axis=1)
            print(path+'/'+item)
            df.to_csv(path+'/'+item, sep='|', index=False)

listProcData(path)
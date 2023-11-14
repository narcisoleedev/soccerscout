import os
import pandas as pd
import math 

#Path to proc-data
path = os.path.abspath('../')+'proc-data/'

def complexFeatures(df:pd.DataFrame):
    startLoc = list(df['StartLoc'].astype(str))
    endLoc = list(df['EndLoc'].astype(str))
    goalPos = {
        'home': [0.0, 34.0],
        'away': [105.0, 34.0],
    }
    startLocAngHome = math.atan(abs(goalPos['home'])[0]-startLoc[0]/abs(goalPos['home'])[1]-startLoc[1])
    startLocAngAway = math.atan(abs(goalPos['away'])[0]-startLoc[0]/abs(goalPos['away'])[1]-startLoc[1])
    startLocDistHome = math.sqrt(math.pow((goalPos['home'])[0]-startLoc[0], 2)+math.pow((goalPos['home'])[1]-startLoc[1], 2))
    startLocDistAway = math.sqrt(math.pow((goalPos['away'])[0]-startLoc[0], 2)+math.pow((goalPos['away'])[1]-startLoc[1], 2))
    endLocAngHome = math.atan(abs(goalPos['home'])[0]-endLoc[0]/abs(goalPos['home'])[1]-endLoc[1])
    endLocAngAway = math.atan(abs(goalPos['away'])[0]-endLoc[0]/abs(goalPos['away'])[1]-endLoc[1])
    endLocDistHome = math.sqrt(math.pow((goalPos['home'])[0]-endLoc[0], 2)+math.pow((goalPos['home'])[1]-endLoc[1], 2))
    endLocDistAway = math.sqrt(math.pow((goalPos['away'])[0]-endLoc[0], 2)+math.pow((goalPos['away'])[1]-endLoc[1], 2))
    distCoveredX = abs(startLoc[0]-endLoc[0])
    distCoveredY = abs(startLoc[1]-endLoc[1])
    return list(startLocAngAway, startLocAngHome, startLocDistHome, startLocDistAway, endLocAngHome, endLocAngAway, endLocDistHome, endLocDistAway, distCoveredX, distCoveredY)
def listProcData(path):
    #List all itens in the proc-data dir
    for item in os.listdir(path):
        #If the item on listdir is not a csv file it will recursively go to the next dir.
        if os.path.isdir(item):
            path = path+'/'+item
            listProcData(path)
        #If it is it will insert the features
        else:
            df = pd.read_csv(path+'/'+item, sep='|', index=False)
            for f in complexFeatures(df):
                df.append(f)
            df.to_csv(path+'/'+item, sep='|', index=False)


import os
import json
import numpy as np
import pandas as pd

#Paths
path = os.path.abspath('../') + '/open-data/data/'
eventsPath = path + 'events/'
lineupsPath = path + 'lineups/'

#array of matches
matchIds = []

for id in os.listdir(eventsPath):
    matchIds.append(id.partition('.')[0])

matchIds = np.unique(matchIds)
print(matchIds)

def competitions_org():
    competitionsPath = path + 'competitions.json'
    competitionsFile = open(competitionsPath, 'r')
    competitionsDict = json.load(competitionsFile)
    #print(competitionsDict)
    competitions = pd.DataFrame(competitionsDict)
    keysComp = ['competition_id', 'season_id', 'competition_name', 'competition_gender','country_name', 'season_name']
    competitions = competitions[keysComp]
    print(competitions)

competitions_org()
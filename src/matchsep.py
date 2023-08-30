import os
import json
import numpy as np

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



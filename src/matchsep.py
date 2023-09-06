import os
import json
import numpy as np
import pandas as pd

#Paths
path = os.path.abspath('../') + '/open-data/data/'
eventsPath = path + 'events/'
lineupsPath = path + 'lineups/'
matchesPath = path + 'matches/'

pathOrg = os.path.abspath('../') + '/org-data/'

#array of matches
matchIds = []

for id in os.listdir(eventsPath):
    matchIds.append(id.partition('.')[0])

matchIds = np.unique(matchIds)
print(matchIds)

def competitions_json():
    competitionsPath = path + 'competitions.json'
    competitionsFile = open(competitionsPath, 'r')
    competitionsDict = json.load(competitionsFile)
    competitions = pd.DataFrame(competitionsDict)
    keysComp = ['competition_id', 'season_id', 'competition_name', 'competition_gender','country_name', 'season_name']
    competitions = competitions[keysComp]
    print(competitions)
    competitions_org(competitions)
    
def competitions_org(competitions):
    seasonNameUnique = np.unique(competitions['season_name'])
    for s in seasonNameUnique:
        seasonNoSlice = s.replace('/', '-')
        os.system('mkdir ' + pathOrg + seasonNoSlice)
        genderPerSeason = np.unique(competitions.loc[competitions['season_name']==s, 'competition_gender'])
        for g in genderPerSeason:
            os.system('mkdir ' + pathOrg + seasonNoSlice + '/"' + g + '"')
            genderFilter = competitions[competitions['competition_gender']==g]
            countryPerSeason = np.unique(genderFilter.loc[genderFilter['season_name']==s, 'country_name'])
            for ct in countryPerSeason:
                os.system('mkdir ' + pathOrg + seasonNoSlice + '/"' + g + '"' + '/"' + ct + '"')
                countryFilter = genderFilter[genderFilter['country_name']==ct]
                print(countryFilter)
                competitionsPerSeason = np.unique(countryFilter.loc[countryFilter['season_name']==s, 'competition_name'])
                for c in competitionsPerSeason:
                    os.system('mkdir ' + pathOrg + seasonNoSlice + '/"' + g + '"' + '/"' + ct + '"' + '/"' + c + '"')

def matches_org():
    matchesDict = []
    for f in os.listdir(matchesPath):
        matchesFile = open(matchesPath + f, 'r')
        matchesDict = json.load(matchesFile)
        print(matchesDict)
    matchesDict = json.load(matchesFile)
    

competitions_json()
matches_org()
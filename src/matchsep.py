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
print(len(matchIds))

def competitions_json():
    competitionsPath = path + 'competitions.json'
    competitionsFile = open(competitionsPath, 'r')
    competitionsDict = json.load(competitionsFile)
    competitions = pd.DataFrame(competitionsDict)
    keysComp = ['competition_id', 'season_id', 'competition_name', 'competition_gender','country_name', 'season_name']
    competitions = competitions[keysComp]
    #print(competitions)
    competitions_org(competitions)
    
def competitions_org(competitions):
    seasonNameUnique = np.unique(competitions['season_name'])
    for s in seasonNameUnique:
        seasonNoSlice = s.replace('/', '-')
        os.system('mkdir ' + pathOrg + seasonNoSlice)
        genderPerSeason = np.unique(competitions.loc[competitions['season_name']==s, 'competition_gender'])
        #Genero per season
        for g in genderPerSeason:
            os.system('mkdir ' + pathOrg + seasonNoSlice + '/"' + g + '"')
            genderFilter = competitions[competitions['competition_gender']==g]
            countryPerSeason = np.unique(genderFilter.loc[genderFilter['season_name']==s, 'country_name'])
            #Organizar os arquivos por pais
            for ct in countryPerSeason:
                os.system('mkdir ' + pathOrg + seasonNoSlice + '/"' + g + '"' + '/"' + ct + '"')
                countryFilter = genderFilter[genderFilter['country_name']==ct]
                #print(countryFilter)
                competitionsPerSeason = np.unique(countryFilter.loc[countryFilter['season_name']==s, 'competition_name'])
                #Organizar os arquivos por competicoes
                for c in competitionsPerSeason:
                    os.system('mkdir ' + pathOrg + seasonNoSlice + '/"' + g + '"' + '/"' + ct + '"' + '/"' + c + '"')

def matches_json():
    matchesDict = []
    i = 0
    for c in os.listdir(matchesPath):
        for f in os.listdir(matchesPath + '/' + c):
            matchesFile = open(matchesPath + c + '/' + f, 'r')
            matchesDict = pd.json_normalize(json.load(matchesFile))
            matchesDict = pd.DataFrame(matchesDict)
            try:
                path = pathOrg+str(matchesDict['season.season_name']).replace('/', '-')+'/'+(matchesDict['home_team.home_team_gender'])+'/"'+matchesDict['competition.country_name']+'"/"'+ matchesDict['competition.competition_name']+'"/'+matchesDict['home_team.home_team_name']+'-'+matchesDict['away_team.away_team_name']+'('+matchesDict['match_date']+')'+'.json'
                print(path)
                #matchesDict.to_csv(path, sep='|')
            except:
                i = i + 1
            #print((matchesDict['season.season_name']).astype(str)).replace('/', '-')
    print(i)
#competitions_json()
matches_json()
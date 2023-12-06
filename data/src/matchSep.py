#Author: narcisoleedev

import os
import json
import numpy as np
import pandas as pd

#Paths
path = os.path.abspath('../') + '/open-data-master/data/'
eventsPath = path + 'events/'
lineupsPath = path + 'lineups/'
matchesPath = path + 'matches/'

pathOrg = os.path.abspath('../') + '/org-data/'

#array of matches
matchIds = []

for id in os.listdir(eventsPath):
    matchIds.append(id.partition('.')[0])

matchIds = np.unique(matchIds)
   
def events_to_csv(x):
    id = x['match_id']
    eventsDF = pd.json_normalize(json.load(open(eventsPath + str(id) + '.json', 'r')))
    sn = str(x['season.season_name']).replace('/', '-')
    path = pathOrg+sn+'/'+x['home_team.home_team_gender']+'/"'+x['competition.country_name']+'"/"'+x['competition.competition_name']+'"/"'+x['home_team.home_team_name']+'-'+x['away_team.away_team_name']+'('+x['match_date']+')".csv'
    path = pathOrg+sn+'/'+x['home_team.home_team_gender']+'/'+x['competition.country_name']+'/'+x['competition.competition_name']+'/'+x['home_team.home_team_name']+'-'+x['away_team.away_team_name']+'('+x['match_date']+').csv'
    try:
        eventsDF.to_csv(path, sep='|')
    except:
        print('There is no match with this id!')

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
    for c in os.listdir(matchesPath):
        for f in os.listdir(matchesPath + '/' + c):
            matchesFile = open(matchesPath + c + '/' + f, 'r')
            matchesDict = pd.json_normalize(json.load(matchesFile))
            matchesDF = pd.DataFrame(matchesDict)
            matchesDF.apply(events_to_csv, axis=1)
            
            #eventsDF = pd.json_normalize(json.load(open(eventsPath + e, 'r')))
            #matchesDict.to_csv(path, sep='|')

competitions_json()
matches_json()
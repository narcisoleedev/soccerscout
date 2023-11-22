from modelParse.features import *

def features(path):

    df = pd.read_csv(path, sep="|")
    gamestates = parse_gamestates(df)
    #Gamestate features
    time = time_feature(gamestates)
    space = space_feature(gamestates)
    team = team_feature(gamestates)
    #State features
    df = pd.concat([df,time,space,team],axis=1)
    #Complex Features
    complexFeatures(df)
    df = pd.concat([df,goalscore(df)], axis=1)    
    #One Hot Features
    df = pd.concat([df,result_onehot(df),bodypart_onehot(df), actiontype_result_onehot(df),actiontype_onehot(df)], axis=1)
    return df

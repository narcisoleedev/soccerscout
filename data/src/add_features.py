#Author: narcisoleedev, EdgaarLiraga

from modelParse.features import *

def drop_columns(df):

    df = df.drop(["Type_name","BodyPart_name","Result_name"], axis=1)

    return df

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
    df = pd.concat([df, complexFeatures(df)], axis=1) 
    
    df = pd.concat([df, goalscore(df)], axis=1)    
    
    df = drop_columns(df)
    #One Hot Features    
    #df = pd.concat([df, result_onehot(df), bodypart_onehot(df), actiontype_result_onehot(df), actiontype_onehot(df)], axis=1)
    
    return df
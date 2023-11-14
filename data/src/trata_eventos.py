import os
import pandas as pd
import shutil

feitos = 0
def _parse_pass(row):
    
    string_base = "pass"  # default
    string_type = string_base + ".type" + ".name"
    string_height = string_base + ".height"+ ".name"
    string_cross = string_base + ".cross"
    
    if row[string_type] == 'Free Kick':
        if row[string_height] == 'High Pass' or row[string_cross]:
            action = 'freekick_crossed'
        else:
            action = 'freekick_short'
    elif row[string_type] == 'Corner':
        if row[string_height] == 'High Pass' or row[string_cross]:
            action = 'corner_crossed'
        else:
            action = 'corner_short'
    elif row[string_type] == 'Goal Kick':
        action = 'goalkick'
    elif row[string_type] == 'Throw-in':
        action = 'throw_in'
    elif row[string_cross] == True:
        action = 'cross'
    else:
        action = 'pass'

    string_outcome = "pass"+".outcome"+".name"
    if row[string_outcome] in ['Incomplete', 'Out']:
        result = 'fail'
    elif row[string_outcome] == 'Pass Offside':
        result = 'offside'
    elif row[string_outcome] in ['Injury Clearance', 'Unknown']:
        
        action = 'non_action'
        result = 'success'
    else:
        result = 'success'

    string_body_part = "pass" + ".body_part"+".name"
    if row[string_body_part] is None:
        body_part = 'foot'
    elif 'Head' in row[string_body_part]:
        body_part = 'head'
    elif row[string_body_part] == 'Left Foot':
        body_part = 'foot_left'
    elif row[string_body_part] == 'Right Foot':
        body_part = 'foot_right'
    elif 'Foot' in row[string_body_part] or row[string_body_part] == 'Drop Kick':
        body_part = 'foot'
    else:
        body_part = 'other'

    return action, result, body_part

def _parse_dribble(row):
    
    action = 'take_on'
    string = "dribble" + ".outcome"+".name"
    if row[string] == 'Incomplete':
        result = 'fail'
    else:
        result = 'success'

    body_part = 'foot'

    return action, result, body_part

def _parse_carry():
    
    action = 'dribble'
    result = 'success'
    body_part = 'foot'

    return action, result, body_part

def _parse_foul_committed(row):

    action = 'foul'
    
    string = "foul_committed.card.name"
    try:
        if 'Yellow' in row[string]:
            result = 'yellow_card'
        else:
            result = 'red_card'

    except:
            result = 'success'

    body_part = 'foot'

    return action, result, body_part
    
def _parse_duel(row):
    string = "duel"
    if row[string+".type.name"] == 'Tackle':
        action = 'tackle'
        duel_outcome = row[string+".outcome"+".name"]
        if duel_outcome in ['Lost In Play', 'Lost Out']:
            result = 'fail'
        elif duel_outcome in ['Success in Play', 'Won']:
            result = 'success'
        else:
            result = 'success'

        body_part = 'foot'

    else:
        action = 'non_action'
        result = 'success'
        body_part = 'foot'

    return action, result, body_part

def _parse_interception(row):
    action = 'interception'
    string = "interception.outcome.name"
    if row[string] in ['Lost In Play', 'Lost Out']:
        result = 'fail'
    elif row[string] == 'Won':
        result = 'success'
    else:
        result = 'success'
    
    body_part = 'foot'
    
    return action, result, body_part

def _parse_shot(row):
    string_base = "shot"

    string_type = string_base+".type"+".name"

    if row[string_type] == 'Free Kick':
        action = 'shot_freekick'
    elif row[string_type] == 'Penalty':
        action = 'shot_penalty'
    else:
        action = 'shot'

    string_outcome = string_base+'.outcome'+'.name'
    if row[string_outcome] == 'Goal':
        result = 'success'
    elif row[string_outcome] in ['Blocked', 'Off T', 'Post', 'Saved', 'Wayward']:
        result = 'fail'
    else:
        result = 'fail'

    string_body_part = string_base+".body_part"+".name"
    
    if row[string_body_part] is None:
        body_part = 'foot'
    elif 'Head' in row[string_body_part]:
        body_part = 'head'
    elif row[string_body_part] == 'Left Foot':
        body_part = 'foot_left'
    elif row[string_body_part] == 'Right Foot':
        body_part = 'foot_right'
    elif 'Foot' in row[string_body_part]:
        body_part = 'foot'
    else:
        body_part = 'other'

    return action, result, body_part
    
def _parse_owngoal():

    action = 'bad_touch'
    result = 'owngoal'
    body_part = 'foot'

    return action, result, body_part

def _parse_goalkeeper(row):

    string = 'goalkeeper' + '.type' + '.name'
    if row[string] == 'Shot Saved':
        action = 'keeper_save'
    elif row[string] in ('Collected', 'Keeper Sweeper'):
        action = 'keeper_claim'
    elif row[string] == 'Punch':
        action = 'keeper_punch'
    else:
        action = 'non_action'

    string_outcome = 'goalkeeper'+'.outcome'+'.name'
    if row[string_outcome] in [
        'Claim',
        'Clear',
        'Collected Twice',
        'In Play Safe',
        'Success',
        'Touched Out',
    ]:
        result = 'success'
    elif row[string_outcome] in ['In Play Danger', 'No Touch']:
        result = 'fail'
    else:
        result = 'success'

    string_body_part = 'goalkeeper'+'.body_part'+'.name'
    if string_body_part not in row:
        body_part = 'foot'
    elif row[string_body_part] is None:
        body_part = 'foot'
    elif 'Head' in row[string_body_part]:
        body_part = 'head'
    elif row[string_body_part] == 'Left Foot':
        body_part = 'foot_left'
    elif row[string_body_part] == 'Right Foot':
        body_part = 'foot_right'
    elif 'Foot' in row[string_body_part] or row[string_body_part] == 'Drop Kick':
        body_part = 'foot'
    else:
        body_part = 'other'

    return action, result, body_part

def _parse_clearance(row):
    action = 'clearance'
    result = 'success'
    string_body_part = "clearance"+".body_part"+".name"
    if string_body_part not in row:
        body_part = 'foot'
    elif row[string_body_part] is None:
        body_part = 'foot'
    elif 'Head' in row[string_body_part]:
        body_part = 'head'
    elif row[string_body_part] == 'Left Foot':
        body_part = 'foot_left'
    elif row[string_body_part] == 'Right Foot':
        body_part = 'foot_right'
    elif 'Foot' in row[string_body_part]:
        body_part = 'foot'
    else:
        body_part = 'other'
    
    return action, result, body_part

def _parse_miscontrol():
    
    action = 'bad_touch'
    result = 'fail'
    body_part = 'foot'
    
    return action, result, body_part

def _find_loc(linha):
    try:
        return linha[str(linha["type.name"]).lower() +".end_location"]
    except:
        return None

def _find_end_time(df,indice):
    try: 
        return  df.iloc[indice + 1]["timestamp"]
    
    except:
        return None

def _parse_events(caminho):
    lista = ["Pass","Dribble","Carry","Foul Committed","Duel","Interception","Shot","Own Goal Against","Goal Keeper","Clearance","Miscontrol"]
    
    df = pd.read_csv(caminho,  sep="|") 
    df = df.where(pd.notnull(df), None)
    
    data = {
    'StartTime': [],
    'EndTime': [],
    'StartLoc': [],
    'EndLoc': [],
    'Player': [],
    'Team': [],
    'ActionType': [],
    'BodyPart': [],
    'Result': []
    }

    df2 = pd.DataFrame(data)

    for indice, linha in df.iterrows():
        if linha["type.name"] in lista:
            
            if linha["type.name"] == "Pass":
                action, result, body_part = _parse_pass(linha)
            elif linha["type.name"] == "Dribble":
                action, result, body_part = _parse_dribble(linha)
            elif linha["type.name"] == "Interception":
                action, result, body_part = _parse_interception(linha)
            elif linha["type.name"] == "Shot":
                action, result, body_part = _parse_shot(linha)
            elif linha["type.name"] == "Goal Keeper":
                action, result, body_part = _parse_goalkeeper(linha)
            elif linha["type.name"] == "Clearance":
                action, result, body_part = _parse_clearance(linha)
            elif linha["type.name"] == "Foul Committed":                
                action, result, body_part = _parse_foul_committed(linha)
            elif linha["type.name"] == "Duel":
                action, result, body_part = _parse_duel(linha)
            elif linha["type.name"] == "Miscontrol":
                action, result, body_part = _parse_miscontrol()
            elif linha["type.name"] == "Carry":
                action, result, body_part = _parse_carry()
            elif linha["type.name"] == "Own Goal Against":
                action, result, body_part = _parse_owngoal()


            linha_temp = { 'StartTime': linha["timestamp"],
                           'EndTime': _find_end_time(df,indice),
                           'StartLoc': linha["location"],
                           'EndLoc': _find_loc(linha),
                           'Player': linha["player.id"],
                           'Team': linha["team.id"],
                           'ActionType': action,
                           'BodyPart': body_part,
                           'Result': result,

                           }

            df2 = df2._append(linha_temp, ignore_index=True)
    
    return df2

def teste(caminho:str):
    global feitos
    new_name_dir = caminho.replace("org-data", "proc-data")
        
    if not os.path.exists(new_name_dir) and os.path.isdir(caminho):
        os.mkdir(new_name_dir)   

    for item in os.listdir(caminho):

        if os.path.isdir(caminho+"/"+item):
            teste(caminho+"/"+item)
        else:
            name_arq = caminho.replace("org-data", "proc-data")
            if os.path.exists(name_arq+"/"+item):
                #print("já existe")
                feitos += 1
            
            else:
                try:
                    df = _parse_events(caminho+"/"+item)
                    #name_arq = caminho.replace("org-data", "proc-data")

                    df.to_csv(name_arq+"/"+item, sep="|", index=False)
                    feitos += 1
                    print(feitos)

                except KeyboardInterrupt:
                    exit()

                except Exception as error:
                    print(error)
                    
                    """print("erro",name_arq+"/"+item)
                    file = open("erros.txt", "r")
                    a = file.readlines()
                    file = open("erros.txt", "w")
                    a.append(name_arq+"/"+item+"\n")
                    file.writelines(a)
                    file.close()"""
                

def copy_erros():
    file = open("erros.txt", "r")
    file = file.readlines()
    for line in file:
        line = line.strip()
        line = line.replace("proc-data", "org-data")
        shutil.copy(line, os.path.abspath("erros"))

if __name__ == "__main__":
    
    teste(os.path.abspath('../org-data/'))
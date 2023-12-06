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
        return action, result, body_part

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
    elif row[string] in ['Collected', 'Keeper Sweeper']:
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
        return linha["location"]
    
def find_seconds(linha):
    
    var = 60 * linha["minute"] + linha["second"] - ((linha["period"] > 1) * 45 * 60) - ((linha["period"] > 2) * 45 * 60) - ((linha["period"] > 3) * 15 * 60) - ((linha["period"] > 4) * 15 * 60)
    
    return var

def _fix_loc(df):
    for indice,linha in df.iterrows(): 
        if linha["Type_name"] == "clearance":
            try:
                linha["End_x"] = df.iloc[indice+1]["Start_x"]
                linha["End_y"] = df.iloc[indice+1]["Start_y"]
            except:
                # print("erro no indice",indice)
                linha["End_x"] = df.iloc[indice]["Start_x"]
                linha["End_y"] = df.iloc[indice]["Start_y"]


def home_team_id(df):
    return df.loc[1, 'Team']

def _fix_direction(df):
    
    home_id = home_team_id(df)
    
    away_idx = df["Team"] != home_id

    for col in ['Start_x', 'End_x']:
        df.loc[away_idx, col] = 120 - df[away_idx][col].values
    for col in ['Start_y', 'End_y']:
        df.loc[away_idx, col] = 80 - df[away_idx][col].values
    
    return df

def _add_dribbles(actions):
    
    min_dribble_length: float = 3.0
    max_dribble_length: float = 60.0
    max_dribble_duration: float = 10.0

    lista_result = ['fail', 'success', 'offside', 'owngoal', 'yellow_card', 'red_card']
    lista_body_part = ['foot', 'head', 'other', 'head/other', 'foot_left', 'foot_right']
    lista_type = ['pass', 'cross', 'throw_in', 'freekick_crossed', 'freekick_short', 'corner_crossed', 'corner_short', 'take_on', 'foul', 'tackle',
                  'interception', 'shot', 'shot_penalty', 'shot_freekick', 'keeper_save', 'keeper_claim', 'keeper_punch', 'keeper_pick_up', 'clearance', 'bad_touch', 'non_action', 'dribble', 'goalkick']
    
    next_actions = actions.shift(-1, fill_value=0)

    same_team = actions["Team"] == next_actions["Team"]

    dx = actions["End_x"] - next_actions["Start_x"]
    dy = actions["End_y"] - next_actions["Start_y"]
    
    far_enough = dx**2 + dy**2 >= min_dribble_length**2
    not_too_far = dx**2 + dy**2 <= max_dribble_length**2

    dt = next_actions["Time"] - actions["Time"]
    same_phase = dt < max_dribble_duration
    same_period = actions["Period"] == next_actions["Period"]

    dribble_idx = same_team & far_enough & not_too_far & same_phase & same_period

    dribbles = pd.DataFrame()
   
    prev = actions[dribble_idx]
    nex = next_actions[dribble_idx]
   
    dribbles["Period"] = nex["Period"]
    dribbles["Type_id"] = prev["Type_id"] + 0.1
    dribbles["Time"] = (prev["Time"] + nex["Time"]) / 2
    dribbles["Team"] = nex["Team"]
    dribbles["Player"] = nex["Player"]
    dribbles["Start_x"] = prev["End_x"]
    dribbles["Start_y"] = prev["End_y"]
    dribbles["End_x"] = nex["Start_x"]
    dribbles["End_y"] = nex["Start_y"]
    dribbles["Bodypart_id"] = lista_body_part.index('foot')
    dribbles["Type_id"] = lista_type.index('dribble')
    dribbles["Result_id"] = lista_result.index('success')

    actions = pd.concat([actions, dribbles], ignore_index=True, sort=False)
    
    actions = actions.sort_values(['Period', 'Type_id']).reset_index(drop=True)
    
    actions['Type_id'] = range(len(actions))
    
    return actions

def _parse_events(caminho):
    
    lista = ["Pass","Dribble","Carry","Foul Committed","Duel","Interception","Shot","Own Goal Against","Goal Keeper","Clearance","Miscontrol"]
    lista_result = ['fail', 'success', 'offside', 'owngoal', 'yellow_card', 'red_card']
    lista_body_part = ['foot', 'head', 'other', 'head/other', 'foot_left', 'foot_right']
    lista_type = ['pass', 'cross', 'throw_in', 'freekick_crossed', 'freekick_short', 'corner_crossed', 'corner_short', 'take_on', 'foul', 'tackle',
                  'interception', 'shot', 'shot_penalty', 'shot_freekick', 'keeper_save', 'keeper_claim', 'keeper_punch', 'keeper_pick_up', 'clearance', 'bad_touch', 'non_action', 'dribble', 'goalkick']
    
    df = pd.read_csv(caminho,  sep="|") 
    df = df.where(pd.notnull(df), None)
    
    data = { "id": [],
             "Period":int,
             "Time":int,
             'Start_x': [],
             'Start_y': [],
             'End_x': [],
             'End_y': [],
             'Player': int,
             'Team': int,
             'Type_name': [],
             'BodyPart_name': [],
             'Result_name': [],
             'Type_id': int,
             'BodyPart_id': int,
             'Result_id': int
             }

    df2 = pd.DataFrame(data)
    cont = 0
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
            
            # Se quiser considerar os non_action comente
            #if action == "non_action":
            #    continue

            try:
                
                start = eval(linha["location"])
            
            except:

                start[0] = round(float(df2.iloc[-1]["End_x"]),1)
                start[1] = round(float(df2.iloc[-1]["End_y"]),1)
            
            try:

                end = eval(_find_loc(linha))

            except:

                end[0] = start[0]
                end[1] = start[1]

            #print(result,body_part,action)
            linha_temp = { "id": linha["id"],
                           "Period": linha["period"],
                           "Time": find_seconds(linha),
                           'Start_x': start[0],
                           'Start_y': start[1],
                           'End_x': end[0],
                           'End_y': end[1],
                           'Player': int(linha["player.id"]),
                           'Team': linha["team.id"],
                           'Type_name': action,
                           'BodyPart_name': body_part,
                           'Result_name': result,
                           'Type_id':  lista_type.index(action),
                           'BodyPart_id': lista_body_part.index(body_part),
                           'Result_id':  lista_result.index(result)
                           }
            # df2 = (action[df2["Type_id"] != lista_type.index('non_action')].sort_values(['Period', 'Time']).reset_index(drop=True))
            df2 = df2._append(linha_temp, ignore_index=True)
    
    _fix_loc(df2)

    # Altera direção do Jogo
    #_fix_direction(df2)
    
    #_add_dribbles(df2)

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
                print(feitos)
                pass
            
            else:
                try:
                    df = _parse_events(caminho+"/"+item)
                    #name_arq = caminho.replace("org-data", "proc-data")
                    df.to_csv(name_arq+"/"+item, sep='|', index=False)
                    feitos += 1
                    print(feitos)
                    
                except KeyboardInterrupt:
                   exit()

                except Exception as e:
                   
                   print(e)
                   print("erro",name_arq+"/"+item)
                   file = open("erross.txt", "r")
                   a = file.readlines()
                   file = open("erross.txt", "w")
                   a.append(name_arq+"/"+item+"\n")
                   file.writelines(a)
                   file.close()

def copy_erros():
    file = open("erros.txt", "r")
    file = file.readlines()
    for line in file:
        line = line.strip()
        line = line.replace("proc-data", "org-data")
        shutil.copy(line, os.path.abspath("erros"))

if __name__ == "__main__":
    
    teste(os.path.abspath('../org-data/'))

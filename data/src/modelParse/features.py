import pandas as pd
import math

############# Complex Features################


def complexFeatures(df):
    goalPosHome = [120, 40]
    goalPosAway = [0,40]
    temp = pd.DataFrame()
    for _, row in df.iterrows():
        row_temp = {
            "startLocAngAway": math.atan(
                abs(goalPosAway[0] - float(row["Start_x"]))
                / abs(goalPosAway[1] - float(row["Start_y"]) + 0.001)
            ),
            "startLocDistAway": math.sqrt(
                math.pow(goalPosAway[0] - float(row["Start_x"]), 2)
                + math.pow(goalPosAway[1] - float(row["Start_y"]), 2)
            ),
            "endLocAngAway": math.atan(
                abs(goalPosAway[0] - float(row["End_x"]))
                / abs(goalPosAway[1] - float(row["End_y"]) + 0.001)
            ),
            "endLocDistAway": math.sqrt(
                math.pow(goalPosAway[0] - float(row["End_x"]), 2)
                + math.pow(goalPosAway[1] - float(row["End_y"]), 2)
            ),
            "startLocAngHome": math.atan(
                abs(goalPosHome[0] - float(row["Start_x"]))
                / abs(goalPosHome[1] - float(row["Start_y"]) + 0.001)
            ),
            "startLocDistHome": math.sqrt(
                math.pow(goalPosHome[0] - float(row["Start_x"]), 2)
                + math.pow(goalPosHome[1] - float(row["Start_y"]), 2)
            ),
            "endLocAngHome": math.atan(
                abs(goalPosHome[0] - float(row["End_x"]))
                / abs(goalPosHome[1] - float(row["End_y"]) + 0.001)
            ),
            "endLocDistHome": math.sqrt(
                math.pow(goalPosHome[0] - float(row["End_x"]), 2)
                + math.pow(goalPosHome[1] - float(row["End_y"]), 2)
            ),
            "distCoveredX": abs(float(row["Start_x"]) - float(row["End_x"])),
            "distCoveredY": abs(float(row["Start_y"]) - float(row["End_y"])),
            "movement": math.sqrt(
                (row["Start_x"] - row["End_y"]) ** 2
                + (row["Start_y"] - row["End_y"]) ** 2
            ),
        }

        temp = temp._append(row_temp, ignore_index=True)

    return temp

    
############## Context Feature ##############

# Actions features
def goalscore(dataframe):
    team = home_team_id(dataframe)

    score_team = 0
    score_opponent = 0

    df = pd.DataFrame()

    for _, row in dataframe.iterrows():
        if row["Team"] == team:
            row_temp = {
                "goalscore_team": score_team,
                "goalscore_opponent": score_opponent,
                "goalscore_diff": score_team - score_opponent,
            }

            score = check_goal(row)

            if score != -1:
                score_team += score
            else:
                score_opponent += 1

        else:
            row_temp = {
                "goalscore_team": score_opponent,
                "goalscore_opponent": score_team,
                "goalscore_diff": score_opponent - score_team,
            }

            score = check_goal(row)

            if score != -1:
                score_opponent += score
            else:
                score_team += 1

        df = df._append(row_temp, ignore_index=True)

    return df


########## One Hot Features ##############

list_result = ["fail", "success", "offside", "owngoal", "yellow_card", "red_card"]
list_body_part = ["foot", "head", "other", "head/other", "foot_left", "foot_right"]
list_type = [
    "pass",
    "cross",
    "throw_in",
    "freekick_crossed",
    "freekick_short",
    "corner_crossed",
    "corner_short",
    "take_on",
    "foul",
    "tackle",
    "interception",
    "shot",
    "shot_penalty",
    "shot_freekick",
    "keeper_save",
    "keeper_claim",
    "keeper_punch",
    "keeper_pick_up",
    "clearance",
    "bad_touch",
    "non_action",
    "dribble",
    "goalkick",
]


# Action features
def result_onehot(df):
    result = pd.DataFrame()

    for result_name in list_result:
        col = "result_" + result_name
        result[col] = df["Result_name"] == result_name

    return result


# Action features
def bodypart_onehot(df):
    bodypart = pd.DataFrame()

    for bodypart_name in list_body_part:
        col = "bodypart_" + bodypart_name
        bodypart[col] = df["BodyPart_name"] == bodypart_name

    return bodypart


# Action features
def actiontype_onehot(df):
    actiontype = pd.DataFrame()

    for action in list_type:
        col = "action_" + action
        actiontype[col] = df["Type_name"] == action

    return actiontype


# Action features
def actiontype_result_onehot(df):
    res = result_onehot(df)
    type = actiontype_onehot(df)

    action_result = pd.DataFrame()

    for type_col in list(type.columns):
        for result_col in list(res.columns):
            action_result[type_col + "_" + result_col] = (
                type[type_col] & res[result_col]
            )

    return action_result

########### State Features ###############

def space_feature(list_dfs: list):
    a0 = list_dfs[0]

    space = pd.DataFrame()

    for i, a in enumerate(list_dfs[1:]):
        x = a["End_x"] - a0["Start_x"]

        space["dx_a0" + (str(i + 1))] = x

        y = a["End_y"] - a0["Start_y"]

        space["dy_a0" + (str(i + 1))] = y

        space["mov_a0" + (str(i + 1))] = (x**2 + y**2) ** (1 / 2)

    return space


def time_feature(list_dfs: list):
    a0 = list_dfs[0]

    dt = pd.DataFrame()

    for i, a in enumerate(list_dfs[1:]):
        dt["time_delta_" + (str(i + 1))] = a0["Time"] - a["Time"]

    return dt


def team_feature(list_dfs: list):
    a0 = list_dfs[0]
    teamdf = pd.DataFrame()

    for i, a in enumerate(list_dfs[1:]):
        teamdf["team_" + (str(i + 1))] = a["Team"] == a0["Team"]

    return teamdf


def play_left_to_right(gamestates):
    a0 = gamestates[0]
    home_id = home_team_id(gamestates[0])

    away_idx = a0["Team"] != home_id

    for actions in gamestates:
        for col in ["Start_x", "End_x"]:
            actions.loc[away_idx, col] = 120 - actions[away_idx][col].values

        for col in ["Start_y", "End_y"]:
            actions.loc[away_idx, col] = 80 - actions[away_idx][col].values

    return gamestates


def parse_gamestates(actions, num_actions=3):
    list = []
    list.append(actions)

    for i in range(1, num_actions):
        temp = actions.copy().shift(i, fill_value=0)
        temp.iloc[:i] = pd.concat([actions[:1]] * i, ignore_index=True)
        list.append(temp)

    return list


############## Auxiliar Functions ###################
def home_team_id(df):
    return df.loc[1, "Team"]


def check_goal(row):
    list_type = ["shot", "shot_penalty", "shot_freekick"]

    if row["Result_name"] == "owngoal":
        return -1
    elif row["Type_name"] in list_type and row["Result_name"] == "success":
        return 1
    else:
        return 0

import pandas as pd

def add_labels_optimized(df):
    home_id = home_team_id(df)

    add_true_optimized(df)

    scores_data = []
    concedes_data = []

    for _, linha in df.iterrows():
        if linha["label"] == False:
            scores_data.append(False)
            concedes_data.append(False)
        elif linha["label"] == True and int(linha["Team"]) == home_id:
            scores_data.append(True)
            concedes_data.append(False)
        else:
            scores_data.append(False)
            concedes_data.append(True)

    scores = pd.DataFrame({"Scores": scores_data}, dtype="object")
    concedes = pd.DataFrame({"Concedes": concedes_data}, dtype="object")

    return scores, concedes

def add_true_optimized(df):
    lista_type = ["shot", "shot_penalty", "shot_freekick"]
    df["label"] = False

    for indice, linha in df.iterrows():
        if (
            (linha["Result_name"] == "owngoal") or
            (linha["Type_name"] in lista_type and linha["Result_name"] == "success")
        ):
            df.loc[indice - 10:indice, "label"] = True

def home_team_id(df):
    return df.loc[1, "Team"]

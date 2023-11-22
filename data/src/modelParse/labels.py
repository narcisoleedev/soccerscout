import pandas as pd


def add_labels(df):
    home_id = home_team_id(df)

    add_true(df)

    data = {"Concedes": []}
    data2 = {"Scores": []}

    concedes = pd.DataFrame(data, dtype="object")
    scores = pd.DataFrame(data2, dtype="object")

    for _, linha in df.iterrows():
        if linha["label"] == False:
            linha_temp1 = {"Scores": False}
            linha_temp2 = {"Concedes": False}

        elif (linha["label"] == True) and int(linha["Team"]) == home_id:
            linha_temp1 = {"Scores": True}
            linha_temp2 = {"Concedes": False}
        else:
            linha_temp1 = {"Scores": False}
            linha_temp2 = {"Concedes": True}

        scores = scores._append(linha_temp1, ignore_index=True)
        concedes = concedes._append(linha_temp2, ignore_index=True)

    return scores, concedes


def home_team_id(df):
    return df.loc[1, "Team"]


def add_true(df):
    lista_type = ["shot", "shot_penalty", "shot_freekick"]

    df["label"] = None
    for indice, linha in df.iterrows():
        df.loc[indice, "label"] = False
        if (linha["Result_name"] == "owngoal") or (
            linha["Type_name"] in lista_type and linha["Result_name"] == "success"
        ):
            for x in range(indice, indice - 10, -1):
                df.loc[x, "label"] = True
    return df

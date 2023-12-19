import pandas as pd

df1 = pd.read_csv("csvs/jogadores.csv", sep="|")
df2 = pd.read_csv("csvs/missing_values.csv", sep="|")
contador = 0
for indice1,linha1 in df1.iterrows():
    print(contador)
    contador+=1
    for indice2,linha2 in df2.iterrows():
        
        if (linha2["id"] == linha1["id"]):
            pass
            df1.at[indice1,"nationality"] = linha2["country"]
            if linha2["age"] == "-":
                linha2["age"] = 30
            data = str(2023-int(linha2["age"]))
            df1.at[indice1,"date_nasc"] = "01/01/"+data

            df1.at[indice1,"market_value"] = linha2["value"]
            break

df1.to_csv("jogadores_tratados.csv",sep="|",index=False)
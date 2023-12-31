#Author: narcisoleedev, EdgarLiraa

from modelParse.labels import *

def labels(path):
    df = pd.read_csv(path, sep="|")
    score, concedes = add_labels_optimized(df)
    df = pd.concat([df,score,concedes],axis=1)
    return df
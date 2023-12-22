import os
import numpy as np
import pandas as pd

# Path

def listProcData(path):
    # List all items in the proc-data dir
    b = None  # Initialize 'b' to None
    prev_file = None  # Keep track of the previous file name
    for item in os.listdir(path):
        # If the item on listdir is not a csv file, it will recursively go to the next dir.
        if os.path.isdir(path+'/'+item):
            subPath = path+'/'+item
            listProcData(subPath)
        # If it is, it will insert the features
        else:
            df = pd.read_csv(path+'/'+item, sep='|')
            if b is None:
                b = df.columns
            elif not np.array_equal(df.columns, b):
                print(f"Columns are not the same between {prev_file} and {path}/{item}")
                return False
            b = df.columns
            prev_file = f"{path}/{item}"

def check_errors_trata():
    path = os.path.abspath('../') + '/proc-data'
    return listProcData(path)

def check_value(caminho):
    df = pd.read_csv(caminho, sep="|")
    for _,linha in df.iterrows():
        if "€"not in linha["market_value"]:
            return False
    
    return True
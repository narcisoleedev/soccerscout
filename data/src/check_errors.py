import os
import numpy as np
import pandas as pd

# Path
path = os.path.abspath('../') + '/feature-data'

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
                b = set(df.columns)
            elif not b == set(df.columns):
                different_columns = set(b.symmetric_difference(df.columns))
                print(f"Columns are not the same between {prev_file} and {path}/{item}")
                print(f"Different columns: {different_columns}")
            b = set(df.columns)
            prev_file = f"{path}/{item}"

listProcData(path)
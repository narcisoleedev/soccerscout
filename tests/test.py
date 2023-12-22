import pytest
import sys
import pandas as pd
from check import check_value,check_errors_trata

sys.path.append('../../soccerscout')


import data.src.add_labels as lbs
import data.src.add_features as feat


def test_columns():
    assert check_errors_trata() == None

def test_valor():
    assert check_value("csvs/jogadores.csv") == True

def test_labels():

    df1 = lbs.labels("csvs/Argentina-France-proc.csv")
    expected_labels = set()
    expected_labels.add('Scores')
    expected_labels.add('Concedes')
    
    var = False
    
    if expected_labels <= set(df1.columns):
        var = True
        
    assert var == True

def test_features():

    df = feat.features("csvs/Argentina-France-proc.csv")
    var = False
    expected_labels = {"time_delta_1","time_delta_2","dx_a01","dy_a01","mov_a01",
                       "dx_a02","dy_a02",
                       "mov_a02","team_1","team_2",
                       "startLocAngAway","startLocDistAway","endLocAngAway",
                       "endLocDistAway","startLocAngHome","startLocDistHome","endLocAngHome",
                       "endLocDistHome","distCoveredX","distCoveredY","movement","goalscore_team","goalscore_opponent",
                       "goalscore_diff"}
    
    if expected_labels <= set(df.columns):
        var = True    
    assert var == True

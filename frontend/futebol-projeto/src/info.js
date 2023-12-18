import api from "./api"
import { useState } from "react"

const liga = [
                "FA Women's Super League|England", "Premier League|England", "Champions League|Europe", "UEFA Women's Euro|Europe", "UEFA Euro|Europe", 
                "Bundesliga|Germany", "La Liga|Spain", "Liga h", "Liga i", 
                "Ligue 1|France", "Liga k", "Liga l", "Liga m", "Liga n", "Liga o", "Liga p", "Liga q", "Liga r"
            ]

            /*
1|FA Women's Super League|England
2|Premier League|England
3|Champions League|Europe
4|UEFA Women's Euro|Europe
5|UEFA Euro|Europe
6|Ligue 1|France
7|Bundesliga|Germany
8|La Liga|Spain
9|NWSL|United States of America
10|Serie A|Italy
11|Indian Super league|India
12|FIFA World Cup|International
13|Women's World Cup|International
            */
const league = [
    {
        "Label" : "ligaexemplo",
        "value" : 1
    }
]
const pais = ["França", "Brasil", "Italia", "Espanha"]

const posicao = ["Zagueiro", "Volante","Atacante"]

const idades = [16,18,21,24,27,30,32,35]


var isLogged = false

const players = [

    {"Rank": 1, "Jogador": "T. Alexander-Arnold", "Time": "Sampaio Corrêa", "País": "República Centro-Africada", "Posição": "VOL", "Idade": 45, "Assist./90min":0.053,"Gols/90 min.":0.053,"Ações/90min":80,"Val. Médio/ Ação":0.006,"Rating":0.480,"Valor":"180 M €"},
    {"Rank": 2, "Jogador": "S. Aguero", "Time": "Flamengo", "País": "Nigéria", "Posição": "ATA", "Idade": 32, "Assist./90min": 0.045, "Gols/90 min.": 0.072, "Ações/90min": 75, "Val. Médio/ Ação": 0.008, "Rating": 0.520, "Valor": "200 M €"},
    {"Rank": 3, "Jogador": "L. Modric", "Time": "Atlético Mineiro", "País": "Croácia", "Posição": "MEI", "Idade": 35, "Assist./90min": 0.068, "Gols/90 min.": 0.035, "Ações/90min": 88, "Val. Médio/ Ação": 0.007, "Rating": 0.485, "Valor": "150 M €"},    
    {"Rank": 4, "Jogador": "K. De Bruyne", "Time": "Palmeiras", "País": "Bélgica", "Posição": "MEI", "Idade": 29, "Assist./90min": 0.080, "Gols/90 min.": 0.065, "Ações/90min": 92, "Val. Médio/ Ação": 0.009, "Rating": 0.550, "Valor": "220 M €"},    
    {"Rank": 5, "Jogador": "N. Kanté", "Time": "Corinthians", "País": "França", "Posição": "VOL", "Idade": 30, "Assist./90min": 0.060, "Gols/90 min.": 0.040, "Ações/90min": 85, "Val. Médio/ Ação": 0.006, "Rating": 0.510, "Valor": "180 M €"},    
    {"Rank": 6, "Jogador": "R. Sterling", "Time": "Cruzeiro", "País": "Inglaterra", "Posição": "ATA", "Idade": 26, "Assist./90min": 0.055, "Gols/90 min.": 0.075, "Ações/90min": 78, "Val. Médio/ Ação": 0.008, "Rating": 0.525, "Valor": "190 M €"},    
    {"Rank": 7, "Jogador": "V. van Dijk", "Time": "Vasco da Gama", "País": "Holanda", "Posição": "ZAG", "Idade": 29, "Assist./90min": 0.030, "Gols/90 min.": 0.025, "Ações/90min": 89, "Val. Médio/ Ação": 0.010, "Rating": 0.540, "Valor": "210 M €"},    
    {"Rank": 8, "Jogador": "M. Salah", "Time": "Internacional", "País": "Egito", "Posição": "ATA", "Idade": 28, "Assist./90min": 0.070, "Gols/90 min.": 0.080, "Ações/90min": 82, "Val. Médio/ Ação": 0.007, "Rating": 0.560, "Valor": "230 M €"},    
    {"Rank": 9, "Jogador": "B. Fernandes", "Time": "Santos", "País": "Portugal", "Posição": "MEI", "Idade": 27, "Assist./90min": 0.075, "Gols/90 min.": 0.060, "Ações/90min": 90, "Val. Médio/ Ação": 0.008, "Rating": 0.545, "Valor": "200 M €"},    
    {"Rank": 10, "Jogador": "A. Robertson", "Time": "Grêmio", "País": "Escócia", "Posição": "LAD", "Idade": 27, "Assist./90min": 0.048, "Gols/90 min.": 0.030, "Ações/90min": 87, "Val. Médio/ Ação": 0.009, "Rating": 0.500, "Valor": "170 M €"},    
    {"Rank": 11, "Jogador": "J. Kimmich", "Time": "Botafogo", "País": "Alemanha", "Posição": "MEI", "Idade": 26, "Assist./90min": 0.065, "Gols/90 min.": 0.050, "Ações/90min": 86, "Val. Médio/ Ação": 0.007, "Rating": 0.535, "Valor": "190 M €"},    
    {"Rank": 12, "Jogador": "H. Kane", "Time": "Bahia", "País": "Inglaterra", "Posição": "ATA", "Idade": 28, "Assist./90min": 0.055, "Gols/90 min.": 0.090, "Ações/90min": 80, "Val. Médio/ Ação": 0.010, "Rating": 0.570, "Valor": "240 M €"},    
    {"Rank": 13, "Jogador": "C. Pulisic", "Time": "Fortaleza", "País": "Estados Unidos", "Posição": "ATA", "Idade": 23, "Assist./90min": 0.072, "Gols/90 min.": 0.055, "Ações/90min": 79, "Val. Médio/ Ação": 0.008, "Rating": 0.525, "Valor": "180 M €"},
    {"Rank": 14, "Jogador": "E. Haaland", "Time": "Atlético Paranaense", "País": "Noruega", "Posição": "ATA", "Idade": 21, "Assist./90min": 0.040, "Gols/90 min.": 0.100, "Ações/90min": 75, "Val. Médio/ Ação": 0.012, "Rating": 0.590, "Valor": "260 M €"},    
    {"Rank": 15, "Jogador": "A. Laporte", "Time": "Chapecoense", "País": "Espanha", "Posição": "ZAG", "Idade": 27, "Assist./90min": 0.035, "Gols/90 min.": 0.020, "Ações/90min": 88, "Val. Médio/ Ação": 0.009, "Rating": 0.515, "Valor": "160 M €"}
]
export default {
    liga,
    pais,
    posicao,
    idades,
    players,
    isLogged,
    league,
}
import info from "./info";

const {clubs} = info

const MudarDataGrafico = (data) => {
    const saida = data.map(
        (player) => {
            const { name, actions_value_avg, actions_avg, ...rest } = player;
            const x = parseFloat(actions_value_avg).toFixed(4);
            const y = parseFloat(actions_avg).toFixed(3);
            return { name, x, y };
        }
    )
    return saida
}

const ConverterCLube = (id) => {
    for(let i of clubs){
        if(i.id==id) return i.name
    }
} 

const ConverterIdade = (date) => {
    let values = date.split("/")
    return 2023-values[2]
}

const MudarDataTabela = (data) => {
    const saida = data.map(
        (player) => {
            const { name, position, id_club, date_nasc, nationality, market_value, actions_value_avg, actions_avg, assist_avg,goals_avg,...rest } = player;
            return { 
                "Jogador": name, "Posição": position, "Time": ConverterCLube(id_club), "País": nationality, "Valor": market_value,
                "Idade": ConverterIdade(date_nasc), "Assist./90min":parseFloat(assist_avg).toFixed(4), "Gols/90 min.": parseFloat(goals_avg).toFixed(2), 
                "Ações/90min": parseFloat(actions_avg).toFixed(2),  "Val. Médio/ Ação": parseFloat(actions_value_avg).toFixed(4), 
                "Rating":parseFloat(actions_value_avg*actions_avg).toFixed(2)
            };
        }
    )
    return saida
}

const OrdenarRating = (array) => {
    let saida = array.sort((a,b) => b["Rating"] - a["Rating"])
    return saida
}

const MudarDataTabelaColetiva = (data) => {
    const dataAtualizada = MudarDataTabela(data)
    const dataOrdenado = OrdenarRating(dataAtualizada)
    for(let i=0; i<dataOrdenado.length; i++){
        dataOrdenado[i]["Rank"] = (i+1)
    }
    return dataOrdenado
}

  export default {MudarDataTabela,MudarDataTabelaColetiva,MudarDataGrafico}
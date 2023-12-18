import info from "./info";

const {clubs} = info

const MudarDataGrafico = (data) => {
    const saida = data.map(
        (player) => {
            const { name, actions_value_avg, actions_avg, ...rest } = player;
            const x = actions_value_avg;
            const y = actions_avg;
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
            const { name, position, id_club, date_nasc, nationality, market_value, actions_value_avg, actions_avg, rating_avg,assist_avg,goals_avg,...rest } = player;
            const Posição = position
            const x = actions_value_avg;
            const y = actions_avg;
            return { 
                "Jogador": name, "Posição": position, "Time": ConverterCLube(id_club), "País": nationality, "Valor": market_value,
                "Idade": ConverterIdade(date_nasc), "Assist./90min":assist_avg, "Gols/90 min.": goals_avg, "Ações/90min": actions_avg, 
                "Val. Médio/ Ação": actions_value_avg, "Rating":rating_avg
            };
        }
    )
    return saida
}

const playerTeste = [{
    id: 5463,
    name: "Luka Modrić",
    position: "Right Center Midfield",
    id_club: 220,
    date_nasc: "01/01/2000",
    nationality: "None",
    market_value: "None",
    assist_avg: 0.14925373134328357,
    goals_avg: 0.13432835820895522,
    actions_avg: 131.955223880597,
    actions_value_avg: 0.0034747291143370183,
    rating_avg: 0.45850865820676984
  }];
  console.log("Assim ficou a data atualizada:",MudarDataTabela(playerTeste))

  export default {MudarDataTabela}
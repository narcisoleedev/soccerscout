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

const MudarDataTabela = (data) => {
    const saida = data.map(
        (player) => {
            const { name, position, id_club, date_nasc, nationality, market_value, actions_value_avg, actions_avg, rating_avg,...rest } = player;
            const x = actions_value_avg;
            const y = actions_avg;
            return { name, x, y };
        }
    )
    return saida
}

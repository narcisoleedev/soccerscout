import api from "./api";

const BuscarNomes = async() => {
        try{
            const { data } = await api.get('/player', { headers: { "ngrok-skip-browser-warning": "any" } })
            const dataPlayers = data.players
            let players = []
            dataPlayers.map((player) => {
                players.push(player.name)
            })
            return players
        }catch(error){
            console.error("Erro no BuscarNomes",error)
        }
}


const Buscar1v1 = async (jogador) => {
    try {
        const response = await api.get(`/player/${jogador}`,{ headers: { "ngrok-skip-browser-warning": "any" } })
        const { data } = response
        return data
    }catch(error){
        console.log(jogador)
        console.error("Erro ao obter resultados",error)
    }
}

const BuscarColetivo = async (filtros) => {
    try {
         const response = await api.post('/analyze/group',filtros
        ,{ headers: { "ngrok-skip-browser-warning": "any" } })
        const { data } = response
        console.log("response data:",data)
        return data
    }catch(error){
        console.error("Erro ao obter os resultados:", error)
    }
    
}

export default {Buscar1v1,BuscarColetivo, BuscarNomes}
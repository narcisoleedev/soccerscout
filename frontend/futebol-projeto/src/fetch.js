import api from "./api";

const Buscar1v1 = async (jogador) => {
    try {
        const response = await api.get(`/player/${jogador}`)
        if(!response.ok) {
            throw new Error("Erro na requisição")
        }
        const { data } = response
        return data
    }catch(error){
        console.error("Erro ao obter resultados",error)
    }
}

const BuscarColetivo = async (filtros) => {
    try {
        const response = await api.post('/analyze/group',{
            "league": filtros.ligas,
            "country": filtros.pais,
            "position": filtros.posicao,
            "age_min": filtros.idadeMin,
            "age_max": filtros.idadeMax
        })
        if(!response.ok) {
            throw new Error("Erro na requisição")
        }
        const { data } = response
        return data
    }catch(error){
        console.error("Erro ao obter os resultados:", error)
    }
    
}

export default {Buscar1v1,BuscarColetivo}
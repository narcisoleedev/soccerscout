import './comparacao-coletiva.css'
import { useState, useEffect } from 'react'
import Filter from '../../components/Filters/Filters'
import TabelaColetiva from '../../components/TabelaColetiva/TabelaColetiva'
import Grafico from '../../components/Graficos/grafico'
import info from '../../info.js'
import { Link } from 'react-router-dom'
import fetch from '../../fetch.js'

function ComparacaoColetiva(){
    const [filter, setFilter] = useState({})
    const [hide, setHide] = useState(true)
    const {BuscarColetivo} = fetch

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

    const FetchTabela = async (filter) => {
        try{
            const data = await BuscarColetivo(filter)
            console.log("resposta da API:",data)
            await setdataTabela(data)
            const dataGrafico = MudarDataGrafico(data)
            await setdataGraph(dataGrafico)
            return false
        }catch(error){
            console.error("Erro",error)
            return true
        }
    }

    const MostrarConteudo = async() => {
        try{
            const resposta = await FetchTabela(filter)
            setHide(true)
        }
        catch(error){
            setHide(false)
        }
    }
    const applyFilter = (filterApplied) => {
        setFilter(filterApplied);
    };

    const eraseInfo = () => {
        setFilter({})
    }

    const checkFilter = ({ligas, pais, posicao, idadeMax, idadeMin}) => {
        if(ligas.length === 0 && pais.length === 0 && posicao.length === 0 && idadeMin === 0 && idadeMax === 2000){
            setFilter({})
            return false
        }
        return true
    }
           
    useEffect(() => {       
        if(Object.keys(filter).length !== 0 && checkFilter(filter)){
            (async () => {
                    try {
                        const busca = await FetchTabela(filter)
                        setHide(busca)
                        console.log("EU ESTOU AQUI ")
                    }catch(error){
                        console.error("ERRO:",error)
                    }
                })()
            
            return
        }
         else{
            setHide(true)
            return        
        }
        console.log(filter);
      }, [filter]);
    

      const playerVazio = [{"Rank": 1, "Jogador": "", "Time": "", "País": "", "Posição": "", "Idade": 0, "Assist./90min":0,"Gols/90 min.":0,"Ações/90min":0,"Val. Médio/ Ação":0,"Rating":0,"Valor":""}]
      const [dataGraph, setdataGraph] = useState({})
      const [dataTabela, setdataTabela] = useState(playerVazio)

      useEffect(() => {
            setdataGraph(dataG)
            setdataTabela(players)
            console.log("dados carregados", dataTabela)

      },[])
    const dataG = [
        { name: "Alfredo", x: 100, y: 200 },
        { name: "Zatala", x: 170, y: 300 },
        { name: "Gulo", x: 140, y: 250 },
        { name: "Batata", x: 150, y: 400 },
        { name: "Messi", x: 110, y: 280 },
    ];

    const {players} = info

    return (
        <div className='Main'>
        <div className="side"></div>
        <div className='conteudo'>
            <section className="coletiva_exemplo">
                <h1>COMPARACAO COLETIVA</h1>
                <h2>FILTROS</h2>
                <Filter applyFilter={applyFilter} isExample ={false} eraseTable={eraseInfo}/>
                { !hide ? 
                    <div>
                        <h1>Gráfico</h1>
                        <Grafico data={dataGraph}/>
        
                        <h1>Tabela</h1>
                        <TabelaColetiva players = {dataTabela} />
                    </div>                    
                     :
                     <div>
                        <h1>
                            Insira os filtros acima para que seja apresentada a tabela
                        </h1>
                     </div>
                }
               
            </section>


            <section className='continue'>
                <h4>Continue Navegando:</h4>  
                
                <span> 
                    <Link to={"/comparacao-exemplo"}>
                        <h4>Exemplo</h4>
                    </Link> 
                </span>

                <span> 
                    <Link to={"/comparacao-1x1"}>
                        <h4>Comparação 1 X 1</h4>
                    </Link> 
                </span>
            </section>
            <div className='buraco'>&nbsp;</div>
        </div>
        <div className="side"></div>
</div>
    )
}

export default ComparacaoColetiva
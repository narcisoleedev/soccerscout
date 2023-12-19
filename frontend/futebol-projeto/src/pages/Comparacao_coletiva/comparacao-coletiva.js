import './comparacao-coletiva.css'
import { useState, useEffect } from 'react'
import Filter from '../../components/Filters/Filters'
import TabelaColetiva from '../../components/TabelaColetiva/TabelaColetiva'
import Grafico from '../../components/Graficos/grafico'
import info from '../../info.js'
import { Link } from 'react-router-dom'
import fetch from '../../fetch.js'
import tratamento from "../../TratarDados.js"

function ComparacaoColetiva(){
    const [filter, setFilter] = useState({})
    const [hide, setHide] = useState(true)
    const {BuscarColetivo} = fetch
    const {MudarDataTabelaColetiva, MudarDataGrafico} = tratamento 
    const [loading, setloading] = useState(false)

    const atualizarFiltro = (filtro) => {
        if(filtro["league"] == undefined) filtro["league"] = null 
        if(filtro["position"] == undefined) filtro["position"] = null 
        if(filtro["country"] == undefined) filtro["country"] = null 
        return filtro
    }

    const FetchTabela = async (filter) => {
        try{
            const data = await BuscarColetivo(filter)
            const {result} = data
            const dataTabela = MudarDataTabelaColetiva(result)
            await setdataTabela(dataTabela)

            const dataGrafico = MudarDataGrafico(result)
            await setdataGraph(dataGrafico)
            return false
        }catch(error){
            console.error("Erro",error)
            return true
        }
    }

    const applyFilter = (filterApplied) => {
        setFilter(filterApplied);
    };

    const eraseInfo = () => {
        setFilter({})
    }

    const checkFilter = ({league, country, position}) => {
        if(league === undefined && country === undefined && position === undefined){
            setFilter({})
            return false
        }
        return true
    }
           
    useEffect(() => {       
        if(Object.keys(filter).length !== 0 && checkFilter(filter)){
                const Buscar = async (filter) => {
                    const resposta = await FetchTabela(filter)
                    setHide(resposta)
                    setloading(false)
                }
                setloading(true)
                Buscar(filter)
        }
         else{
            setHide(true)
            return        
        }

      }, [filter]);
    

      const playerVazio = [{"Rank": 1, "Jogador": "", "Time": "", "País": "", "Posição": "", "Idade": 0, "Assist./90min":0,"Gols/90 min.":0,"Ações/90min":0,"Val. Médio/ Ação":0,"Rating":0,"Valor":""}]
      const [dataGraph, setdataGraph] = useState({})
      const [dataTabela, setdataTabela] = useState(playerVazio)

      useEffect(() => {
            setdataGraph(dataG)
            setdataTabela(players)

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
               {loading &&
                <h1>Loading...</h1>
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
import './comparacao-coletiva.css'
import { useState, useEffect } from 'react'
import Filter from '../../components/Filters/Filters'
import TabelaColetiva from '../../components/TabelaColetiva/TabelaColetiva'
import Grafico from '../../components/Graficos/grafico'
import info from '../../info.js'
import { Link } from 'react-router-dom'

function ComparacaoColetiva(){
    const [filter, setFilter] = useState({})
    const [hide, setHide] = useState(true)

    const applyFilter = (filterApplied) => {
        setFilter(filterApplied);
    };

    const eraseInfo = () => {
        setFilter({})
    }

    const checkFilter = ({ligas, pais, posicao, idadeMax, idadeMin}) => {
        if(ligas.length === 0 && pais.length === 0 && posicao.length === 0 && idadeMin === 0 && idadeMax === 2000)
            setFilter({})
    }
           
    useEffect(() => {

            
        if(Object.keys(filter).length !== 0){
            checkFilter(filter)
            setHide(false)
        }
        else
            setHide(true)
        console.log(filter);
      }, [filter]);
    

      const playerVazio = [{"Rank": 1, "Jogador": "", "Time": "", "País": "", "Posição": "", "Idade": 0, "Assist./90min":0,"Gols/90 min.":0,"Ações/90min":0,"Val. Médio/ Ação":0,"Rating":0,"Valor":""}]
      const [dataGraph, setdataGraph] = useState({})
      const [dataTabela, setdataTabela] = useState(playerVazio)

      useEffect(() => {
            setdataGraph(data)
            setdataTabela(players)
            console.log("dados carregados", dataTabela)

      },[])
    const data = [
        { name: "Alfredo", x: 100, y: 200 },
        { name: "Zatala", x: 170, y: 300 },
        { name: "Gulo", x: 140, y: 250 },
        { name: "Batata", x: 150, y: 400 },
        { name: "Messi", x: 110, y: 280 },
    ];

    const {players} = info

    const mudarTabela = () => {
        setdataTabela(playerVazio)
    }
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
import './comparacao-coletiva.css'
import { useState, useEffect } from 'react'
import Filter from '../../components/Filters/Filters'
import TabelaColetiva from '../../components/TabelaColetiva/TabelaColetiva'
import Grafico from '../../components/Graficos/grafico'
import info from '../../info.js'
import { Link } from 'react-router-dom'

function ComparacaoColetiva(){
    const [filter, setFilter] = useState({})

    const applyFilter = (filterApplied) => {
        setFilter(filterApplied);
      };


           
    useEffect(() => {
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
                <Filter applyFilter={applyFilter}/>
                
                <h1>Gráfico</h1>
                <Grafico data={dataGraph} />

                <h1>Tabela</h1>
                <TabelaColetiva players = {dataTabela} />
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
            <button onClick={mudarTabela}>MUDAR TABELA</button>
            <div className='espaco'>&nbsp;</div>
        </div>
        <div className="side"></div>
</div>
    )
}

export default ComparacaoColetiva
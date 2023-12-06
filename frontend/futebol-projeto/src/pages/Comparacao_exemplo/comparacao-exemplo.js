import './comparacao-exemplo.css'

import { useState, useEffect } from 'react'
import Filter from '../../components/Filters/Filters'
import TabelaColetiva from '../../components/TabelaColetiva/TabelaColetiva'
import Grafico from '../../components/Graficos/grafico'
import info from '../../info.js'
import Tabela1v1 from '../../components/Tabela1v1/Tabela1v1'
import { Link } from 'react-router-dom'


function ComparacaoExemplo(){
    const [filter, setFilter] = useState({})

    const {players} = info
    const player = {
        "Jogador": "Fabinho", "Time": "Al-Ittihad","País":"Brasil", "Idade":29, "Posição":"VOL","Car.Amar./90 min.":0.303,"Assist./90min":0.053,"Gols/90 min.":0.053,"Ações/90min":80,"Val. Médio/ Ação":0.006,"Rating":0.480,"Val mercado":"42 M €"
    }

    const applyFilter = (filterApplied) => {
        setFilter(filterApplied);
      };
      
    useEffect(() => {
        console.log(filter);
      }, [filter]);
    
    const data = [
        { name: "Alfredo", x: 100, y: 200 },
        { name: "Zatala", x: 170, y: 300 },
        { name: "Gulo", x: 140, y: 250 },
        { name: "Batata", x: 150, y: 400 },
        { name: "Messi", x: 110, y: 280 },
    ];
    

    return (
        <div className='Main'>
            <div className="side"></div>
            <div className='conteudo'>
                <section className="header_exemplo">
                    <h1>EXEMPLOS</h1>
                    <p> Veja abaixo exemplos de como utilizar as funcionalidades de comparação coletiva e de comparacao 1 x 1</p>
                </section>

                <section className="coletiva_exemplo">
                    <h1>EXEMPLO DE COMPARACAO COLETIVA</h1>
                    <h2>FILTROS</h2>
                    <section className="desc">
                        <p>Escolha até 10 opções de liga, país, posição. Para remover, clique no ícone de "-" ao lado da opção selecionada</p>
                        <p>Escolha as idades mínima e máxima. Clique em confirmar para gerar o gráfico e tabela </p>
                    </section>
                    <Filter applyFilter={applyFilter}/>
                    
                    <h1>Gráfico</h1>
                    <Grafico data={data} />

                    <h1>Tabela</h1>
                    <TabelaColetiva players = {players} />
                </section>

                <section className="x-exemplo">
                    <h1>EXEMPLO DE COMPARACAO 1X1</h1>
                    <section className="desc">
                        <p>Digite o nome dos dois jogadores que quer comparar. Para trocar o jogador, apenas busque novamente.</p>
                        <p>Para uma comparacao mais realista, busque jogadores de posições semelhantes </p>
                    </section>
                    <div className='tables-x'>
                        <Tabela1v1 players = {player} isMirrored = {false}/>
                        <Tabela1v1 players = {player} isMirrored = {true}/>
                    </div>
                    
                </section>

                <section className='continue'>
                    <h4>Continue Navegando:</h4>  
                    
                    <span> 
                        <Link to={"/comparacao-coletiva"}>
                            <h4>Comparação Coletiva</h4>
                        </Link> 
                    </span>

                    <span> 
                        <Link to={"/comparacao-1x1"}>
                            <h4>Comparação 1 X 1</h4>
                        </Link> 
                    </span>
                </section>

                <div className='espaco'>&nbsp;</div>
            </div>
            <div className="side"></div>
        </div>
    )
}

export default ComparacaoExemplo
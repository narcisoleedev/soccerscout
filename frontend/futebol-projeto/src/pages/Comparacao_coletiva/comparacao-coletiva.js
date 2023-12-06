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
    
    const data = [
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
                <Filter applyFilter={applyFilter}/>
                
                <h1>Gráfico</h1>
                <Grafico data={data} />

                <h1>Tabela</h1>
                <TabelaColetiva players = {players} />
            </section>


            <section className='continue'>
                <h4>Continue Navegando:</h4>  
                
                <span> 
                    <Link to={"/comparacao-coletiva"}>
                        <h4>Exemplo</h4>
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

export default ComparacaoColetiva
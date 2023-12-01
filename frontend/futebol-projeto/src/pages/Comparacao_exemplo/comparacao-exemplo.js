import './comparacao-exemplo.css'

import { useState, useEffect } from 'react'
import Filter from '../../components/Filters/Filters'
import TabelaColetiva from '../../components/TabelaColetiva/TabelaColetiva'
import Grafico from '../../components/Graficos/grafico'



function ComparacaoExemplo(){
    const [filter, setFilter] = useState({})

    const applyFilter = (filterApplied) => {
        setFilter(filterApplied);
      };
      
    useEffect(() => {
        console.log(filter);
      }, [filter]);
    
    const players = [
        {"rank": 1, "jogador": "T. Alexander-Arnold", "time": "Sampaio Corrêa", "pais": "República Centro-Africada", "posicao": "VOL", "idade": 45, "rating" : 0.999, "valor": "180 M €"},
        {"rank": 2, "jogador": "L. Messi", "time": "Paris Saint-Germain", "pais": "Argentina", "posicao": "ATA", "idade": 34, "rating": 0.998, "valor": "200 M €"},
        {"rank": 3, "jogador": "K. De Bruyne", "time": "Manchester City", "pais": "Bélgica", "posicao": "MEI", "idade": 30, "rating": 0.995, "valor": "150 M €"},
        {"rank": 4, "jogador": "Neymar Jr.", "time": "Paris Saint-Germain", "pais": "Brasil", "posicao": "ATA", "idade": 29, "rating": 0.997, "valor": "180 M €"},
        {"rank": 5, "jogador": "V. van Dijk", "time": "Liverpool", "pais": "Holanda", "posicao": "DEF", "idade": 30, "rating": 0.994, "valor": "120 M €"},
        {"rank": 6, "jogador": "R. Lewandowski", "time": "Bayern Munich", "pais": "Polônia", "posicao": "ATA", "idade": 33, "rating": 0.996, "valor": "160 M €"},
        {"rank": 7, "jogador": "K. Mbappé", "time": "Paris Saint-Germain", "pais": "França", "posicao": "ATA", "idade": 23, "rating": 0.993, "valor": "190 M €"},
        {"rank": 8, "jogador": "J. Oblak", "time": "Atletico Madrid", "pais": "Eslovênia", "posicao": "GOL", "idade": 29, "rating": 0.990, "valor": "100 M €"},
        {"rank": 9, "jogador": "S. Ramos", "time": "Paris Saint-Germain", "pais": "Espanha", "posicao": "DEF", "idade": 35, "rating": 0.992, "valor": "80 M €"},
        {"rank": 10, "jogador": "M. Salah", "time": "Liverpool", "pais": "Egito", "posicao": "ATA", "idade": 29, "rating": 0.989, "valor": "170 M €"},
        {"rank": 11, "jogador": "C. Ronaldo", "time": "Manchester United", "pais": "Portugal", "posicao": "ATA", "idade": 37, "rating": 0.988, "valor": "220 M €"},
        {"rank": 12, "jogador": "H. Kane", "time": "Tottenham Hotspur", "pais": "Inglaterra", "posicao": "ATA", "idade": 28, "rating": 0.987, "valor": "130 M €"},
        {"rank": 13, "jogador": "L. Modric", "time": "Real Madrid", "pais": "Croácia", "posicao": "MEI", "idade": 36, "rating": 0.986, "valor": "60 M €"},
        {"rank": 14, "jogador": "G. Donnarumma", "time": "Paris Saint-Germain", "pais": "Itália", "posicao": "GOL", "idade": 22, "rating": 0.985, "valor": "110 M €"},
        {"rank": 15, "jogador": "E. Haaland", "time": "Borussia Dortmund", "pais": "Noruega", "posicao": "ATA", "idade": 21, "rating": 0.984, "valor": "140 M €"},
        {"rank": 16, "jogador": "Bruno Fernandes", "time": "Manchester United", "pais": "Portugal", "posicao": "MEI", "idade": 27, "rating": 0.983, "valor": "150 M €"} 
    ]
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

                </section>

                <div className='espaco'>&nbsp;</div>
            </div>
            <div className="side"></div>
        </div>
    )
}

export default ComparacaoExemplo